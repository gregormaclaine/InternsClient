import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Loader} from "./Elements";


const Course = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    color: #333;
    padding: 2px 16px;
    margin: 5px;                          
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition-duration: 0.3s;
        &:hover{
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
`;

const CoursesWrapper = styled.div`
    display: grid;
        grid-auto-columns: 200px;
        grid-auto-flow: column;
`;

const CourseTitle = styled.h3`

`;

const CourseDescription = styled.p`

`;

export default class CoursesPage extends React.Component{
    state = {
        courses: [],
        error: null,
        loading: false
    }
    componentDidMount(){
        this.setState({...this.state, loading: true});
        axios.get("http://api.wellycompsci.org.uk/interns/").then(({data}) => {
            this.setState({...this.state, courses: data, loading: false});
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    render(){
        return (
            <div>
                <h1>Welcome to the new Intern Programme Training Portal</h1>
                <p>We hope you'll have an amazing experience learning, through our videos created just for you. We have written a bespoke programme, with the right skills for our programmers here at WellyCompSci. Go ahead and click the link of the courses below.</p>
                <p><i>Will &amp; Arjun</i></p>
                {this.state.loading ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader/></div> : <CoursesWrapper>{this.state.courses.map((course) => <Course to={'/courses/' + course._id}><CourseTitle>{course.title}</CourseTitle><CourseDescription>{course.description}</CourseDescription></Course>)}</CoursesWrapper>}
            </div>
        );
    }
}