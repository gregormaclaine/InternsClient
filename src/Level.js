import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Toggle} from 'react-powerplug';

const CourseLevel = styled.div`
  position: relative;
  display: grid;
  grid-template-areas: ". . ." ". . ." ". . courses";
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
`;

const Courses = styled.div`
  display: flex;
  align-items: center;
  grid-area: courses;
  i {
    margin: 10px;
    color: white;
  }
`;

const CourseLink = styled(Link)`
  text-decoration: none;
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

const YouWillLearn = styled.p`
  position: absolute;
  top: 15%;
  right: 33%;
  margin: 0px;
  transform: translate(50%, 0px);
  text-align: center;
  font-size: 1.6em;
  letter-spacing: 0.1em
  font-weight: 900;
  color: white;
`;

const BlockTitle = styled.h1`
  position: absolute;
  margin: 0px;
  top: 45%;
  transform: translate(0px, -50%);
  left: 10%;
  color: white;
  font-weight: 900;
  font-size: 3.5em;
`;

const Description = styled.h2`
  color: white;
  border-radius: 5px;
  font-weight: 300;
  text-align: center;
  margin: 0px 20%;
`;

const Overlay = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  opacity: 0.92;
`;

const Help = styled.i`
  position: absolute;
  top: 0px;
  left: 0px;
  color: white;
  cursor: pointer;
  :hover::before {
    opacity: 0.7;
  }
  padding: 5px;
`;

class Level extends React.Component {
  render() {
    return (
      <Toggle>
        {({on, toggle}) =>
          <React.Fragment>
            <CourseLevel colour={this.props.colour} background={on}>
              <Help className={`far fa-question-circle fa-2x`} onClick={toggle}/>
              <BlockTitle>{this.props.level}</BlockTitle>
              <YouWillLearn>You Will Learn:</YouWillLearn>
              <Courses>
                {(this.props.courses.length !== 0) ? this.props.courses.map((course, key) => (<CourseLink name={course.title} to={'/courses/' + course.slug}><i className={`${course.icon} fa-6x`} /></CourseLink>)) :
                (<i className={`fas fa-question fa-6x`} />)}
              </Courses>
              {on && (<Overlay onClick={toggle}><Description>{this.props.desc}</Description></Overlay>)}
            </CourseLevel>
          </React.Fragment>
        }
      </Toggle>
    );
  }
}

export default Level;
