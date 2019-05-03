import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {CourseContext} from "./App";

const CourseLevel = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: ". . ." "desc desc ." "desc desc courses";
  grid-template-rows: 5fr 3fr 9fr;
  grid-template-columns: 1fr 1fr 3fr;
  width: 75%;
  margin: 0px auto 30px auto;
  text-decoration: none;
  box-shadow: 0 8px 6px -6px black;
  :hover {
    box-shadow: 0 12px 9px -9px black;
  }
  border-radius: 5px;
  overflow: hidden;
  background-color: ${({colour}) => {
    let colours = {"green": "#2ecc71", "blue" : "#3498db", "black" : "#e74c3c"};
    return (colour in colours) ? colours[colour] : "#333";
    }};
  ::before {
    content: "${({level}) => {return level;}}";
    position: absolute;
    top: 23%;
    transform: translate(0px, -50%);
    left: 10%;
    color: white;
    font-weight: 900;
    font-size: 3.5em;
    cursor: text;
  }
  ::after {
    content: "You Will Learn:";
    position: absolute;
    top: 15%;
    right: 33%;
    transform: translate(50%, 0px);
    text-align: center;
    font-size: 1.6em;
    letter-spacing: 0.1em
    font-weight: 900;
    color: white;
    cursor: text;
  }
  i {
    margin: 10px;
    color: white;
  }
  p.desc {
    grid-area: desc;
    padding: 10px;
    color: white;
    border-radius: 5px;
    font-weight: 200;
    text-align: center;
    margin: auto 8%;
  }
`;

const Courses = styled.div`
  display: flex;
  align-items: center;
  grid-area: courses;
`;

const CourseLink = styled(Link)`
  :hover {
    ::after {
      display: block;
    }
    i {
      opacity: 0.8;
    }
  }
  ::after {
    content: "${({name}) => {return name;}}";
    display: none;
    position: absolute;
    top: 35%;
    right: 33%;
    transform: translate(50%, 0px);
    text-align: center;
    font-size: 1em;
    letter-spacing: 0.1em;
    font-weight: 600;
    color: white;
  }
`;

class CoursesPage extends React.Component {
    render() {
        return (<CourseContext.Consumer>
            {context => {
                let courses = {"intern" : [], "junior" : [], "senior" : []};
                context.courses.forEach(course => {
                    if (course.level in courses) {
                      courses[course.level].push(course);
                    }
                });
                return (
                    <div style={{width: "960px", paddingTop: "50px"}}>
                      <CourseLevel level="Intern" colour="green">
                        <p className="desc">Please follow these courses if you would like to join WellyCompSci as a Junior Programmer.</p>
                        <Courses>
                          {(courses["intern"].length !== 0) ? courses["intern"].map((course, key) => (<CourseLink name={course.title} to={'/courses/' + course.slug}><i className={`${course.icon} fa-6x`} /></CourseLink>)) :
                          (<i className={`fas fa-question fa-6x`} />)}
                        </Courses>
                      </CourseLevel>

                      <CourseLevel level="Junior" colour="blue">
                        <p className="desc">Feel free to follow these courses at your own pace, if you would like to delve deeper into our world of programming and become a Senior Programmer.</p>
                        <Courses>
                          {(courses["junior"].length !== 0) ? courses["junior"].map((course, key) => (<CourseLink name={course.title} to={'/courses/' + course.slug}><i className={`${course.icon} fa-6x`} /></CourseLink>)) :
                          (<i className={`fas fa-question fa-6x`} />)}
                        </Courses>
                      </CourseLevel>

                      <CourseLevel level="Senior" colour="black">
                        <p className="desc">If you feel that you are brave enough, please try delve into these courses to put yourselves ahead of the groups.</p>
                        <Courses>
                          {(courses["senior"].length !== 0) ? courses["senior"].map((course, key) => (<CourseLink name={course.title} to={'/courses/' + course.slug}><i className={`${course.icon} fa-6x`} /></CourseLink>)) :
                          (<i className={`fas fa-question fa-6x`} />)}
                        </Courses>
                      </CourseLevel>
                    </div>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursesPage;
