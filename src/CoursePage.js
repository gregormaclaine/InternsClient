import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import {NavLink, Link} from 'react-router-dom';
import {CourseContext} from './App';
import {Loader} from "./Elements";
import {Toggle} from 'react-powerplug';
import axios from "axios";

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    background-color: #eee;
    padding: 5px;
`;

const Icon = styled.i`
    padding: 10px;
    background-color: ${({edit}) => edit ? '#4cd137' : '#e84118'};
    color: white;
    height: 100%;
    &:hover{
        background-color: ${({edit}) => edit ? '#44bd32' : '#c23616'}
    }
    ${({disabled}) => disabled ? 'pointer-events: none; background-color: gray;' : ''}
`;

const VideoLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    cursor: pointer;
`;

const Video = styled.div`
    margin: 10px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const VideoItem = styled.li`
    position: relative;
`;

const VideoOptions = styled.div`
    display: inline-flex;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    alignItems: center;
    justifyContent: center;
`;

const List = styled.ol`
    flex-grow: 1;
    li {
        padding: 12px;
        text-decoration: none;
        font-size: 18px;
        margin: 5px;
        border-bottom: 1px solid #ddd;
        &:hover{
            background-color: #E7E7E7;
        }
    }
`;
const FlexContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: stretch;
    flex-direction: row;
    flex-wrap: wrap;
`;


const Input = styled.input`
      vertical-align: middle;
      margin: 5px 10px 5px 0;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #ddd;
`;

const Form = styled.form`
    color: white;
    padding: 16px 20px;
    margin: 8px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
    @media (max-width: 768px){
        flex-direction: column;
        align-items: stretch;
    }
`;

const Button = styled.button`
    background-color: #2eec71;
    border: none;
    text-decoration: none;
    cursor: pointer;
    padding: 16px 32px;
    margin: 4px 2px;
`;

class CoursePage extends React.Component {
    addVideo = (e, refetchCourses, courseID) => {
        e.preventDefault();
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${this.newVideo.value}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&part=snippet`).then(({data}) => {
            if (data.items.length > 0) {
                let title = data.items[0].snippet.title;
                let description = data.items[0].snippet.description;
                let youtubeID = data.items[0].id;
                axios.post("https://api.intern.wellycompsci.org.uk/" + courseID + '/new-video', {
                    title,
                    description,
                    youtubeID
                }).then(({data}) => {
                    refetchCourses();
                }).catch(error => console.error(error));
            }
        }).catch(error => console.error(error));
    }
    refreshVideo = (youtubeID, videoID, courseID, refetchCourses) => {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeID}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&part=snippet`).then(({data}) => {
            if (data.items.length > 0) {
                let title = data.items[0].snippet.title;
                let description = data.items[0].snippet.description;
                let youtubeID = data.items[0].id;
                axios.post("https://api.intern.wellycompsci.org.uk/" + courseID + '/' + videoID, {
                    title,
                    description,
                    youtubeID
                }).then(({data}) => {
                    refetchCourses();
                }).catch(error => console.error(error));
            }
        }).catch(error => console.error(error));
    }
    deleteVideo = (videoID, courseID, refetchCourses) => {
        axios.delete("https://api.intern.wellycompsci.org.uk/" + courseID + '/' + videoID).then(({data}) => {
            refetchCourses();
        }).catch(error => console.error(error));
    }
    render() {
        return (<CourseContext.Consumer>
            {context => {
                if (context.loading) return <Loader/>;
                try {
                    var course = context.courses.filter((elem) => elem.slug === this.props.match.params.courseID)[0];
                    var video = this.props.match.params.videoID ? course.videos.filter((elem) => elem.slug === this.props.match.params.videoID)[0] : false;
                    return (
                        <div style={{"width": "960px"}}>
                            <h1>{course.title}</h1>
                            <p>{course.description}</p>
                            <FlexContainer>
                                {video && <Video><YouTube videoId={video.youtubeID}/><h3>{video.title}</h3>
                                    <p>{video.description}</p></Video>}
                                <List>
                                    {course.videos && course.videos.map((video, key) => <VideoLink
                                            key={video._id}
                                            activeStyle={{fontWeight: "bold"}}
                                            to={`/courses/${this.props.match.params.courseID}/${video.slug}`}
                                            onClick={e => {
                                                if (context.admin) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <VideoItem>
                                                {video.title}
                                                {context.admin && <VideoOptions>
                                                    <Icon className="fas fa-sync" edit
                                                          onClick={() => this.refreshVideo(video.youtubeID, video._id, course._id, context.refetchCourses)}></Icon>
                                                    <Toggle>
                                                        {({on, toggle}) => !on ?
                                                            <Icon className="fas fa-trash" delete onClick={toggle}></Icon> :
                                                            <Flex styled={{display: "inline-flex"}}>Are you sure?<Icon className="fas fa-check"
                                                                                      onClick={() => this.deleteVideo(video._id, course._id, context.refetchCourses)}></Icon><Icon
                                                                onClick={toggle} className="fas fa-times"></Icon></Flex>}
                                                    </Toggle>
                                                    <Link to={`/courses/${this.props.match.params.courseID}/${video.slug}`}><Icon
                                                        edit className="fas fa-arrow-right"></Icon></Link>
                                                </VideoOptions>}
                                            </VideoItem>
                                        </VideoLink>
                                    )}
                                </List>
                                {context.admin &&
                                <Form onSubmit={e => this.addVideo(e, context.refetchCourses, course._id)}>
                                    <i className="fas fa-plus"></i>
                                    <Input placeholder="Video ID" ref={ref => this.newVideo = ref}/>
                                    <Button type="submit">Add</Button>
                                </Form>}
                            </FlexContainer>
                        </div>
                    );
                } catch (e) {
                    return (<h1>Course Not Found</h1>);
                }
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursePage;
