import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import {NavLink} from 'react-router-dom';
import {Loader} from "./Elements";

const VideoLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    cursor: pointer;
`;

const Video = styled.div`
    margin: 10px;
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
const FlexContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: stretch;
`;

export default class CoursePage extends React.Component{
    state = {
        course: {},
        error: null,
        video: {},
        loading: false
    }
    reFetch(){
        this.setState({...this.state, loading: true});
        axios.get("http://api.wellycompsci.org.uk/interns/" + this.props.match.params.courseID).then(({data}) => {
                this.setState({...this.state, course: data, loading: false, video: this.props.match.params.videoID ? data.videos.filter(e => e._id === this.props.match.params.videoID)[0] : {}});
            }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    componentDidMount(){
        this.reFetch();
    }
    componentWillReceiveProps(){
        this.reFetch();
    }
    render(){
        return (
            <div>
                {this.state.loading ? <Loader/> : <div>
                    <h1>{this.state.course.title}</h1>
                    <p>{this.state.course.description}</p>
                    <FlexContainer>
                    {this.props.match.params.videoID && <Video><YouTube videoId={this.state.video.youtubeID} /><h3>{this.state.video.title}</h3><p>{this.state.video.description}</p></Video>}
                    <List>
                        {this.state.course.videos ? this.state.course.videos.map((video) => <li><VideoLink activeStyle={{fontWeight: "bold"}} to={`/courses/${this.props.match.params.courseID}/${video._id}`}>{video.title}</VideoLink></li>) : null}
                    </List>
                    </FlexContainer>
                    </div>
                }
            </div>
        );
    }
}