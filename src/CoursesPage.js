import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Loader} from "./Elements";
import {CourseContext} from "./App";
import NewCourse from "./NewCourse";
import axios from "axios";
import {Toggle} from 'react-powerplug';
import CourseButton from "./Course"

const CoursesWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
`;

class CoursesPage extends React.Component {
    state = {
        editCourse: {}
    }

    refreshCourse = async (course, refetchCourses) => {
        try {
            await Promise.all(course.videos.map(async (video) => {
              return;
              // return await axios.delete(`http://api.intern.wellycompsci.org.uk/interns/${course._id}/${video._id}`);
            }));
            var {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${course.youtubeID}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&maxResults=50&part=snippet`);
            if (data.items.length > 0) {
                await Promise.all(data.items.map(async (video) => {
                    var title = video.snippet.title;
                    var description = video.snippet.description;
                    var youtubeID = video.snippet.resourceId.videoId;
                    var $position = video.snippet.position;
                    // await axios.post("https://api.intern.wellycompsci.org.uk/interns/" + course._id + '/new-video', {
                    //     title,
                    //     description,
                    //     youtubeID,
                    //     $position
                    // });
                }));
            }
            refetchCourses();
        }
        catch (e) {
            console.error(e);
        }
    }

    deleteCourse = (courseID, refetchCourses) => {
        axios.delete(`https://api.intern.wellycompsci.org.uk/${courseID}`).then(() => refetchCourses()).catch(err => console.error(err));
    }

    updateCoursePosition = async (position1, course1, position2, course2, refetchCourses) => {
        try{
            await axios.post(`https://api.intern.wellycompsci.org.uk/${course1}`, {position: position2});
            await axios.post(`https://api.intern.wellycompsci.org.uk/${course2}`, {position: position1});
            refetchCourses();
        } catch(err){
            console.error(err);
        }
    }

    editCourse = c => this.setState({...this.state, editCourse: c});

    render() {
        return (<CourseContext.Consumer>
            {context => {
                let green = [], blue = [], black = [];
                context.courses.forEach(course => {
                    switch (course.level) {
                        case 'intern':
                            green.push(course);
                            break;
                        case 'junior':
                            blue.push(course);
                            break;
                        case 'senior':
                            black.push(course);
                            break;
                    }
                });
                return (
                    <React.Fragment>
                        <h1>Courses</h1>

                        <h2>Interns</h2>
                        <p>Interns, please follow these courses if you would like to join WellyCompSci as a Junior Programmer.</p>

                        {
                          context.loading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/></div> :
                            <CoursesWrapper>
                              {green.map((course, key) => (
                                <CourseButton course={course} courses={green} index={key} admin={context.admin} colour="green" editCourse={this.editCourse} refetchCourses={context.refetchCourses} updateCoursePosition={this.updateCoursePosition}/>
                              ))}
                            </CoursesWrapper>
                        }

                        <h2>Junior Programmers</h2>
                        <p>Employees, feel free to follow these courses at your own pace, if you would like to delve deeper into our world of programming and become a Senior Programmer.</p>

                        {
                          context.loading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/></div> :
                            <CoursesWrapper>
                              {blue.map((course, key) => (
                                <CourseButton course={course} courses={blue} index={key} admin={context.admin} colour="blue" editCourse={this.editCourse} refetchCourses={context.refetchCourses} updateCoursePosition={this.updateCoursePosition}/>
                              ))}
                            </CoursesWrapper>
                        }

                        <h2>Senior Programmers</h2>
                        <p>If you feel that you are brave enough, please try delve into these courses to put yourselvesahead of the groups.</p>

                        {
                          context.loading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/></div> :
                            <CoursesWrapper>
                              {black.map((course, key) => (
                                <CourseButton course={course} courses={black} index={key} admin={context.admin} colour="black" editCourse={this.editCourse} refetchCourses={context.refetchCourses} updateCoursePosition={this.updateCoursePosition}/>
                              ))}
                            </CoursesWrapper>
                        }

                        {!context.loading && context.admin && <NewCourse onSubmit={context.refetchCourses} length={context.courses.length} editCourse={Object.keys(this.state.editCourse).length > 0 ? this.state.editCourse : null}/>}
                    </React.Fragment>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursesPage;
