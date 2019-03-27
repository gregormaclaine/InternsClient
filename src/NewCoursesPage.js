import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Loader} from "./Elements";
import {CourseContext} from "./App";
import NewCourse from "./NewCourse";
import axios from "axios";
import CourseButton from "./Course"

const CoursesWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(186px, 1fr));
`;

const CourseLevel = styled(Link)`
  display: flex;
  position: relative;
  width: 75%;
  margin: 0px auto 30px auto;
  padding: 10% 0px 0px 30%;
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
  :hover{
    background-color: ${({colour}) => {
        switch (colour) {
            case 'green':
                return '#15B358';
            case 'blue':
                return '#1B7FC2';
            case 'black':
                return '#CE3323';
            default:
                return '#222';
        }
    }};
  }
  ::before{
    content: "${({level}) => {return level;}}";
    /* content: "Intern"; */
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
    left: 10%;
    color: white;
    font-weight: 900;
    font-size: 3.5em;
  }
  ::after{
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
`;

class NewCoursesPage extends React.Component {
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
                    // var title = video.snippet.title;
                    // var description = video.snippet.description;
                    // var youtubeID = video.snippet.resourceId.videoId;
                    // var $position = video.snippet.position;
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
                        default:
                            break;
                    }
                });
                return (
                    <React.Fragment>
                      <div style={{width: "960px", textAlign: "center"}}>
                        <h1>Courses</h1>
                        {console.log(green)}

                        <CourseLevel level="Intern" colour="green" to="/">
                          <div>{green.map((course, key) => (<i style={{margin: "10px", color:"white"}} className={`${course.icon} fa-6x`}></i>))}</div>
                        </CourseLevel>

                        <CourseLevel level="Junior" colour="blue" to="/">
                          <div>{blue.map((course, key) => (<i style={{margin: "10px", color:"white"}} className={`${course.icon} fa-6x`}></i>))}</div>
                        </CourseLevel>

                        <CourseLevel level="Senior" colour="black" to="/">
                          <div>{(black.length !== 0) ? black.map((course, key) => (<i style={{margin: "10px", color:"white"}} className={`${course.icon} fa-6x`}></i>)) :
                          (<i style={{margin: "10px", color:"white"}} className={`fas fa-question fa-6x`}></i>)}</div>
                        </CourseLevel>
                        </div>
                    </React.Fragment>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default NewCoursesPage;
