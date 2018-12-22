import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Loader} from "./Elements";
import {CourseContext} from "./App";
import NewCourse from "./NewCourse";


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
    padding: 2px 16px;
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

class CoursesPage extends React.Component {
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
                            <CoursesWrapper>{context.courses.map((course) => (
                                <Course level='green'
                                        to={'/courses/' + course.slug}>
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
                            <CoursesWrapper>{blue.map((course) => (
                                <Course level='blue'
                                        to={'/courses/' + course.slug}>
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
                            <CoursesWrapper>{black.map((course) => (
                                <Course level='black'
                                        to={'/courses/' + course.slug}>
                                    <i className={`${course.icon} fa-4x`}></i>
                                    <CourseTitle>{course.title}</CourseTitle>
                                    <i>{course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}</i>
                                </Course>))}</CoursesWrapper>}
                        {!context.loading && context.admin && <NewCourse onSubmit={context.refetchCourses}/>}
                    </React.Fragment>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursesPage;