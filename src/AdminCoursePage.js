import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import {NavLink} from 'react-router-dom';
import {Loader} from "./Elements";
import {Toggle} from 'react-powerplug';

const VideoLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    cursor: pointer;
`;

const Video = styled.div`
    margin: 10px;
`;

const NewVideos = styled.div`

    text-decoration: none;
    cursor: pointer;
    color: #333;
    padding: 2px 16px;                          
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition-duration: 0.3s;
        &:hover{
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        form {
            width: 100%;
            input {
                width: 88%;
                padding: 12px;
            }
            button {
                width: 8%;
            }
        }
`;
const List = styled.ol`
    li {
        padding: 12px;
        text-decoration: none;
        font-size: 18px;
            border-bottom: 1px solid #ddd;
                &:hover{
        background-color: #E7E7E7;
    }    
    }
`;
const Button = styled.button`
    padding: 14px 20px;
    background-color: #${({red}) => red ? 'F44336' : '4CAF50'};
    color: white;
    text-decoration: none;
    border: none;
    margin: 8px 0;
    &:hover{
        background-color: green;
    }
`;
const FlexContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: stretch;
`;

export default class AdminCoursePage extends React.Component{
    state = {
        course: {},
        error: null,
        video: {},
        loading: false,
        newVideo: '',
        newPlaylist: '',
        newCourse: {
            title: '',
            description: ''
        }
    }

    componentDidMount() {
        this.reFetch();
    }

    reFetch = () => {
        this.setState({...this.state, loading: true});
        axios.get("http://api.wellycompsci.org.uk/interns/" + this.props.match.params.courseID).then(({data}) => {
            this.setState({
                ...this.state,
                course: data,
                newCourse: {
                    ...this.state.newCourse,
                    title: data.title,
                    description: data.description
                },
                loading: false,
                video: this.props.match.params.videoID ? data.videos.filter(e => e._id === this.props.match.params.videoID)[0] : {}
            });
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    newVideo = e => {
        e.preventDefault();
        this.setState({...this.state, loading: true});
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${this.state.newVideo}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&part=snippet`).then(({data}) => {
            if(data.items.length > 0) {
                var title = data.items[0].snippet.title;
                var description = data.items[0].snippet.description;
                var youtubeID = data.items[0].id;
                axios.post("http://api.wellycompsci.org.uk/interns/" + this.props.match.params.courseID + '/new-video', {
                    title,
                    description,
                    youtubeID
                }).then(({data}) => {
                    this.reFetch();
                }).catch(error => this.setState({...this.state, error, loading: false}));
            }
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    componentWillReceiveProps(){
        this.reFetch();
    }

    newPlaylist = e => {
        e.preventDefault();
        this.setState({...this.state, loading: true});
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.state.newPlaylist}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&maxResults=50&part=snippet`).then(async ({data}) => {
            if(data.items.length > 0) {
                await Promise.all(data.items.map(async (video) => {
                    var title = video.snippet.title;
                    var description = video.snippet.description;
                    var youtubeID = video.snippet.resourceId.videoId;
                    var $position = video.snippet.position;
                    try {
                        await axios.post("http://api.wellycompsci.org.uk/interns/" + this.props.match.params.courseID + '/new-video', {
                            title,
                            description,
                            youtubeID,
                            $position
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }));
                this.reFetch();
            }
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    updateVideo = (video) => {
        this.setState({...this.state, loading: true});
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${video.youtubeID}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&part=snippet`).then(({data}) => {
            var title = data.items[0].snippet.title;
            var description = data.items[0].snippet.description;
            var youtubeID = data.items[0].id;
            axios.post("http://api.wellycompsci.org.uk/interns/" + this.props.match.params.courseID + '/' + video._id, {
                title,
                description,
                youtubeID
            }).then(({data}) => {
                this.reFetch();
            }).catch(error => this.setState({...this.state, error, loading: false}));
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    deleteVideo = (video) => {
        this.setState({...this.state, loading: true});
        axios.delete("http://api.wellycompsci.org.uk/interns/" + this.props.match.params.courseID + '/' + video._id).then(({data}) => {
            this.reFetch();
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }

    updateCourse = () => {
        this.setState({...this.state, loading: true});
        axios.post("http://api.wellycompsci.org.uk/interns/" + this.state.course._id, this.state.newCourse).then(({data}) => {
            this.reFetch();
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }

    render() {
        return (
            <div>
                {this.props.loading ? <Loader/> : <div>
                    <Toggle>{({on, toggle}) => !on ? <React.Fragment><h1>{this.state.course.title}</h1>
                        <p>{this.state.course.description}</p><Button onClick={toggle}><i className="fas fa-edit"></i></Button></React.Fragment> : <form onSubmit={e => {e.preventDefault(); toggle(); this.updateCourse()}}>
                        <input onChange={e => this.setState({...this.state, newCourse: {...this.state.newCourse, title: e.target.value}})} placeholder="Title" value={this.state.newCourse.title}/>
                        <textarea onChange={e => this.setState({...this.state, newCourse: {...this.state.newCourse, description: e.target.value}})} placeholder="Description" value={this.state.newCourse.description}/>
                        <Button type="submit">Submit</Button>
                    </form>}</Toggle>
                    <FlexContainer>
                    {(this.props.match.params.videoID && this.state.video) &&
                    <Video><YouTube videoId={this.state.video.youtubeID}/>
                        <h3>{this.state.video.title}</h3>
                        <div dangerouslySetInnerHTML={{__html: this.state.video.description}}/>
                    </Video>}
                    <List>
                        {this.state.course.videos ? this.state.course.videos.map((video) => <li><VideoLink activeStyle={{fontWeight: 'bold'}}
                            to={`/admin/${this.props.match.params.courseID}/${video._id}`}>{video.title}</VideoLink><Button
                            onClick={() => this.updateVideo(video)}><i
                            className="fas fa-sync"></i></Button><Toggle>{({on, toggle}) => on ?
                            <React.Fragment><Button onClick={() => this.deleteVideo(video)} red><i className="fas fa-trash-alt"></i></Button><Button
                                onClick={toggle}><i
                                className="fas fa-times"></i></Button></React.Fragment> :
                            <Button onClick={toggle} red><i className="fas fa-trash-alt"></i></Button>}</Toggle> </li>) : null}
                            </List>
                    </FlexContainer>
                    <NewVideos>
                    <form onSubmit={this.newVideo}>
                        <input placeholder="YouTube Video ID" onChange={(e) => this.setState({
                            ...this.state,
                            newVideo: e.target.value
                        })} value={this.state.newVideo}/>
                        <Button type="submit">Submit</Button>
                    </form>
                    <form onSubmit={this.newPlaylist}>
                        <input placeholder="YouTube Playlist ID" onChange={(e) => this.setState({
                            ...this.state,
                            newPlaylist: e.target.value
                        })} value={this.state.newPlaylist}/>
                        <Button type="submit">Submit</Button>
                    </form>
                    </NewVideos>
                            </div>
                        }
                        </div>
                            );
                            }
                            }