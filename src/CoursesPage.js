 import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Loader} from "./Elements";
import {CourseContext} from "./App";
import NewCourse from "./NewCourse";
 import axios from "axios";
 import {Toggle} from 'react-powerplug';


const Course = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    color: white;
    background-color: ${({level}) => {
        switch (level) {
            case 'green':
                return '#2ecc71';
            case 'blue':
                return '#3498db';
            case 'black':
                return '#e74c3c';
        }
    }};
    padding: 10px 16px;
    text-align: center;
`;

const CoursesWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
`;

const CourseTitle = styled.h3`
    color: white;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    margin: 5px 0;
    i{
        padding: 5px;
        color: white;
    }
`;

class CoursesPage extends React.Component {
    state = {
        editCourse: {}
    }
    refreshCourse = async (course, refetchCourses) => {
        try {
            await Promise.all(course.videos.map(async (video) => {
                return await axios.delete(`http://api.wellycompsci.org.uk/interns/${course._id}/${video._id}`);
            }));
            var {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${course.youtubeID}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&maxResults=50&part=snippet`);
            if (data.items.length > 0) {
                await Promise.all(data.items.map(async (video) => {
                    var title = video.snippet.title;
                    var description = video.snippet.description;
                    var youtubeID = video.snippet.resourceId.videoId;
                    var $position = video.snippet.position;
                    await axios.post("http://api.wellycompsci.org.uk/interns/" + course._id + '/new-video', {
                        title,
                        description,
                        youtubeID,
                        $position
                    });
                }));
            }
            refetchCourses();
        }
        catch (e) {
            console.error(e);
        }
    }
    deleteCourse = (courseID, refetchCourses) => {
        axios.delete(`http://api.wellycompsci.org.uk/interns/${courseID}`).then(() => refetchCourses()).catch(err => console.error(err));
    }
    updateCoursePosition = async (position1, course1, position2, course2, refetchCourses) => {
        try{
            await axios.post(`http://api.wellycompsci.org.uk/interns/${course1}`, {position: position2});
            await axios.post(`http://api.wellycompsci.org.uk/interns/${course2}`, {position: position1});
            refetchCourses();
        } catch(err){
            console.error(err);
        }
    }
    render() {
        return (<CourseContext.Consumer>
            {context => {
                var green = [], blue = [], black = [];
                context.courses.forEach((course) => {
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
                        <p>Interns, please follow these courses if you would like to join WellyCompSci as a Junior
                            Programmer.</p>
                        {context.loading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/>
                            </div> :
                            <CoursesWrapper>{context.courses.map((course, key) => (
                                <Course level='green'
                                        to={'/courses/' + course.slug}
                                        key={course._id}
                                        onClick={e => {
                                            if(context.admin){
                                                e.preventDefault();
                                            }
                                        }}
                                >
                                    {context.admin && <Flex>
                                        <i className="fas fa-edit" onClick={() => this.setState({...this.state, editCourse: course})}></i>
                                        <i className="fas fa-sync" onClick={() => this.refreshCourse(course, context.refetchCourses)}></i>
                                        <i className="fas fa-arrow-up" style={{visibility: key === 0 ? 'hidden' : 'visible'}}
                                           onClick={() => key !== 0 ? this.updateCoursePosition(course.position, course._id, green[key - 1].position, green[key - 1]._id, context.refetchCourses) : null}></i>
                                        <i className="fas fa-arrow-down" style={{visibility: key === green.length - 1 ? 'hidden' : 'visible'}}
                                           onClick={() => key !== green.length - 1 ? this.updateCoursePosition(course.position, course._id, green[key + 1].position, green[key + 1]._id, context.refetchCourses) : null}></i>
                                        <Toggle>
                                            {({on, toggle}) =>
                                                !on ? <i className="fas fa-trash" onClick={toggle}></i> : <Flex>Are you sure? <i className="fas fa-check" onClick={() => this.deleteCourse(course._id, context.refetchCourses)}></i><i className="fas fa-times" onClick={toggle}></i></Flex>
                                            }
                                        </Toggle>
                                        <Link to={`/courses/${course.slug}`}><i className="fas fa-arrow-right"></i></Link>
                                    </Flex>}
                                    <i className={`${course.icon} fa-4x`}></i>
                                    <CourseTitle>{course.title}</CourseTitle>
                                    <i>{course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}</i>
                                </Course>))}</CoursesWrapper>}
                        <h2>Junior Programmers</h2>
                        <p>Employees, feel free to follow these courses at your own pace, if you would like to delve
                            deeper into our world of programming and become a Senior Programmer.</p>
                        {context.loading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/>
                            </div> :
                            <CoursesWrapper>{blue.map((course, key) => (
                                <Course level='blue'
                                        to={'/courses/' + course.slug}
                                        key={course._id}
                                        onClick={e => {
                                            if(context.admin){
                                                e.preventDefault();
                                            }

                                        }}>
                                    {context.admin && <Flex>
                                        <i className="fas fa-edit" onClick={() => this.setState({...this.state, editCourse: course})}></i>
                                        <i className="fas fa-sync" onClick={() => this.refreshCourse(course, context.refetchCourses)}></i>
                                        <i className="fas fa-arrow-up" style={{visibility: key === 0 ? 'hidden' : 'visible'}}
                                           onClick={() => key !== 0 ? this.updateCoursePosition(course.position, course._id, blue[key - 1].position, blue[key - 1]._id, context.refetchCourses) : null}></i>
                                        <i className="fas fa-arrow-down" style={{visibility: key === blue.length - 1 ? 'hidden' : 'visible'}}
                                           onClick={() => key !== blue.length - 1 ? this.updateCoursePosition(course.position, course._id, blue[key + 1].position, blue[key + 1]._id, context.refetchCourses) : null}></i>
                                        <Toggle>
                                            {({on, toggle}) =>
                                                !on ? <i className="fas fa-trash" onClick={toggle}></i> : <Flex>Are you sure? <i className="fas fa-check" onClick={() => this.deleteCourse(course._id, context.refetchCourses)}></i><i className="fas fa-times" onClick={toggle}></i></Flex>
                                            }
                                        </Toggle>
                                        <Link to={`/courses/${course.slug}`}><i className="fas fa-arrow-right"></i></Link>
                                    </Flex>}
                                    <i className={`${course.icon} fa-4x`}></i>
                                    <CourseTitle>{course.title}</CourseTitle>
                                    <i>{course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}</i>
                                </Course>))}</CoursesWrapper>}
                        <h2>Senior Programmers</h2>
                        <p>If you feel that you are brave enough, please try delve into these courses to put yourselves
                            ahead of the groups.</p>
                        {context.loading ?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/>
                            </div> :
                            <CoursesWrapper>{black.map((course, key) => (
                                <Course level='black'
                                        to={'/courses/' + course.slug}
                                        key={course._id}
                                        onClick={e => {
                                            if(context.admin){
                                                e.preventDefault();
                                            }
                                        }}>
                                    {context.admin && <Flex>
                                        <i className="fas fa-edit" onClick={() => this.setState({...this.state, editCourse: course})}></i>
                                        <i className="fas fa-sync" onClick={() => this.refreshCourse(course, context.refetchCourses)}></i>
                                        <i className="fas fa-arrow-up" style={{visibility: key === 0 ? 'hidden' : 'visible'}}
                                           onClick={() => key !== 0 ? this.updateCoursePosition(course.position, course._id, black[key - 1].position, black[key - 1]._id, context.refetchCourses) : null}></i>
                                        <i className="fas fa-arrow-down" style={{visibility: key === black.length - 1 ? 'hidden' : 'visible'}}
                                           onClick={() => key !== black.length - 1 ? this.updateCoursePosition(course.position, course._id, black[key + 1].position, black[key + 1]._id, context.refetchCourses) : null}></i>
                                        <Toggle>
                                            {({on, toggle}) =>
                                                !on ? <i className="fas fa-trash" onClick={toggle}></i> : <Flex>Are you sure? <i className="fas fa-check" onClick={() => this.deleteCourse(course._id, context.refetchCourses)}></i><i className="fas fa-times" onClick={toggle}></i></Flex>
                                            }
                                        </Toggle>
                                        <Link to={`/courses/${course.slug}`}><i className="fas fa-arrow-right"></i></Link>
                                    </Flex>}
                                    <i className={`${course.icon} fa-4x`}></i>
                                    <CourseTitle>{course.title}</CourseTitle>
                                    <i>{course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}</i>
                                </Course>))}</CoursesWrapper>}
                        {!context.loading && context.admin && <NewCourse onSubmit={context.refetchCourses} length={context.courses.length} editCourse={Object.keys(this.state.editCourse).length > 0 ? this.state.editCourse : null}/>}
                    </React.Fragment>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursesPage;