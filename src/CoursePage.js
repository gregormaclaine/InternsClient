import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import {NavLink} from 'react-router-dom';
import {CourseContext} from './App';
import {Loader} from "./Elements";

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

class CoursePage extends React.Component {
    render() {
        return (<CourseContext.Consumer>
            {context => {
                if (context.loading) return <Loader/>;

                let courses = context.courses.filter((elem) => elem.slug === this.props.match.params.courseID);
                if (courses.length === 0) return (<h1>Course Not Found</h1>);
                let course = courses[0];
                let video = this.props.match.params.videoID ? course.videos.filter((elem) => elem.slug === this.props.match.params.videoID)[0] : false;

                return (
                    <div style={{"width": "960px"}}>
                        <h1>{course.title}</h1>
                        <p>{course.description}</p>
                        <FlexContainer>
                            {video && <Video>
                                        <YouTube videoId={video.youtubeID} />
                                        <h3>{video.title}</h3>
                                        <p>{video.description}</p>
                                      </Video>}

                            <List>
                              {course.videos && course.videos.map((video, key) =>
                                <VideoLink key={video._id} activeStyle={{fontWeight: "bold"}}
                                           to={`/courses/${this.props.match.params.courseID}/${video.slug}`}>
                                  <VideoItem>{video.title}</VideoItem>
                                </VideoLink>
                              )}
                            </List>
                        </FlexContainer>
                    </div>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursePage;
