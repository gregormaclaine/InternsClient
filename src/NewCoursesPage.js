import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {CourseContext} from "./App";

const CourseLevel = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: ". . ." ". . ." ". . courses";
  grid-template-rows: 1fr 1fr 2fr;
  grid-template-columns: 1fr 1fr 3fr;
  width: 75%;
  margin: 0px auto 30px auto;
  text-decoration: none;
  background-color: ${({colour}) => {
      switch (colour) {
          case 'green':
              return '#2ecc71';
          case 'blue':
              return '#3498db';
          case 'black':
              return '#e74c3c';
          default:
              return '#333';
      }
  }};
  ::before {
    content: "${({level}) => {return level;}}";
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
    left: 10%;
    color: white;
    font-weight: 900;
    font-size: 3.5em;
  }
  ::after {
    content: "You Will Learn:";
    position: absolute;
    top: 15%;
    right: 20%;
    text-align: center;
    font-size: 1.6em;
    letter-spacing: 0.1em
    font-weight: 900;
    color: white;
  }
  i {
    margin: 10px;
    color: white;
  }
`;

const Courses = styled.div`
  display: flex;
  align-items: center;
  grid-area: courses;

  i.course-link:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

class NewCoursesPage extends React.Component {
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
                        default:
                            break;
                    }
                });
                return (
                    <div style={{width: "960px", paddingTop: "50px"}}>
                      <CourseLevel level="Intern" colour="green">
                        <Courses>
                          {(green.length !== 0) ? green.map((course, key) => (<i className={`${course.icon} fa-6x course-link`} />)) :
                          (<i className={`fas fa-question fa-6x`} />)}
                        </Courses>
                      </CourseLevel>

                      <CourseLevel level="Junior" colour="blue">
                        <Courses>
                          {(blue.length !== 0) ? blue.map((course, key) => (<i className={`${course.icon} fa-6x course-link`} />)) :
                          (<i className={`fas fa-question fa-6x`} />)}
                        </Courses>
                      </CourseLevel>

                      <CourseLevel level="Senior" colour="black">
                        <Courses>
                          {(black.length !== 0) ? black.map((course, key) => (<i className={`${course.icon} fa-6x course-link`} />)) :
                          (<i className={`fas fa-question fa-6x`} />)}
                        </Courses>
                      </CourseLevel>
                    </div>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default NewCoursesPage;
