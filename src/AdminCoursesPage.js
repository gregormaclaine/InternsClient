import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Toggle } from 'react-powerplug';
import {Loader} from "./Elements";


const Course = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    color: #333;
    padding: 2px 16px;                          
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition-duration: 0.3s;
        &:hover{
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
`;

const NewCourse = styled.div`
    text-decoration: none;
    color: #333;
    padding: 2px 16px;                          
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition-duration: 0.3s;
        &:hover{
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        & > form > input, &  > form > textarea {
            width: 100%;
            padding: 12px 0;
            margin: 8px 0;
        }
        
`;

const CourseTitle = styled.h3`

`;

const CourseDescription = styled.p`

`;
const CoursesWrapper = styled.div`
    display: grid;
    grid-auto-columns: 200px;
`;

const Button = styled.button`
    padding: 14px 20px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border: none;
    margin: 8px 0;
    &:hover{
        background-color: green;
    }
`;

export default class AdminCoursesPage extends React.Component {
    state = {
        courses: [],
        error: null,
        loading: false,
        newCourse: {
            title: '',
            description: '',
            videos: []
        }
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses = () => {
        this.setState({...this.state, loading: true});
        axios.get("http://api.wellycompsci.org.uk/interns/").then(({data}) => {
            this.setState({...this.state, courses: data, loading: false});
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    newCourse = (e) => {
        e.preventDefault();
        this.setState({...this.state, loading: true});
        axios.post("http://api.wellycompsci.org.uk/interns/", this.state.newCourse).then(({data}) => {
            this.setState({...this.state, courses: data, loading: false});
            this.refreshCourses();
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                {this.state.loading ?
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/>
                    </div> : <CoursesWrapper>{this.state.courses.map((course) => (<Toggle>{({on, toggle}) => <Course to={'/admin/' + course._id}><CourseTitle>{course.title}</CourseTitle><CourseDescription>{course.description}</CourseDescription></Course>}</Toggle>))}</CoursesWrapper>}
                <NewCourse>
                    <h3>New Course</h3>
                    <form onSubmit={this.newCourse}>
                        <input value={this.state.newCourse.title} placeholder="Title"
                                                           onChange={(e) => this.setState({
                                                               ...this.state,
                                                               newCourse: {
                                                                   ...this.state.newCourse,
                                                                   title: e.target.value
                                                               }
                                                           })}/>
                        <textarea value={this.state.newCourse.description} onChange={(e) => this.setState({
                            ...this.state,
                            newCourse: {
                                ...this.state.newCourse,
                                description: e.target.value
                            }
                        })} placeholder="Description"/><Button type="submit">Submit</Button></form>
                </NewCourse>
            </div>
        );
    }
}