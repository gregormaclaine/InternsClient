import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Toggle} from 'react-powerplug';
import axios from "axios";

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
            default:
                return '#333';
        }
    }};
    padding: 10px 16px;
    text-align: center;
`;

const Icon = styled.i`
  :hover {
    opacity: 0.6;
  }
`;

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 5px 0;
    i {
        padding: 5px;
        color: white;
    }
`;

const Check = styled.div`
    display: grid;
    padding-top: 5px;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    grid-template-areas: "text text" "yes no";
    background-color: ${({level}) => {
        switch (level) {
            case 'green':
                return '#15B358';
            case 'blue':
                return '#1B7FC2';
            case 'black':
                return '#CE3323';
            default:
                return '#333';
        }
    }};
`;

const CourseTitle = styled.h3`
    color: white;
    font-family: 'Gill Sans SB';
`;

class CourseButton extends React.Component {
  handleEdit = () => {
    this.props.editCourse(this.props.course);
  }

  refreshCourse = async course => {
      try {
          await Promise.all(course.videos.map(async (video) => {
            return;
            return await axios.delete(`http://api.intern.wellycompsci.org.uk/interns/${course._id}/${video._id}`);
          }));
          var {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${course.youtubeID}&index=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&maxResults=50&part=snippet`);
          if (data.items.length > 0) {
              await Promise.all(data.items.map(async (video) => {
                  var title = video.snippet.title;
                  var description = video.snippet.description;
                  var youtubeID = video.snippet.resourceId.videoId;
                  var $position = video.snippet.position;
                  await axios.post("https://api.intern.wellycompsci.org.uk/interns/" + course._id + '/new-video', {
                      title,
                      description,
                      youtubeID,
                      $position
                  });
              }));
          }
          this.props.refetchCourses();
      }
      catch (e) {
          console.error(e);
      }
  }

  deleteCourse = () => {
      axios.delete(`https://api.intern.wellycompsci.org.uk/${this.props.course._id}`).then(() => this.props.refetchCourses()).catch(err => console.error(err));
  }

  handlePositionUpdate = diff => {
    this.props.updateCoursePosition(this.props.course.position, this.props.course._id, this.props.courses[this.props.index + diff].position, this.props.courses[this.props.index + diff]._id, this.props.refetchCourses);
  }

  render() {
    let course = this.props.course;
    let index = this.props.index;
    let colour = this.props.colour;
    let courses = this.props.courses;
    return (
      <Course level={colour} to={'/courses/' + course.slug} index={course._id} onClick={e => {if (this.props.admin) e.preventDefault();}}>
        {
          this.props.admin && <Flex>
            <Icon className="fas fa-edit" onClick={this.handleEdit}></Icon>
            <Icon className="fas fa-sync" onClick={() => this.refreshCourse(course)}></Icon>
            <Icon className="fas fa-arrow-up" style={{visibility: index === 0 ? 'hidden' : 'visible'}}
              onClick={() => index !== 0 ? this.handlePositionUpdate(-1) : null}></Icon>
              <Icon className="fas fa-arrow-down" style={{visibility: index === courses.length - 1 ? 'hidden' : 'visible'}}
              onClick={() => index !== courses.length - 1 ? this.handlePositionUpdate(1) : null}></Icon>
            <Toggle>
            {({on, toggle}) =>
              !on ? <Icon className="fas fa-trash" onClick={toggle}></Icon> : <Check level={colour}><span style={{"gridArea":"text"}}>Are you sure?</span><Icon className="fas fa-check" style={{"gridArea":"yes"}} onClick={this.deleteCourse}></Icon><Icon className="fas fa-times" style={{"gridArea":"no"}} onClick={toggle}></Icon></Check>
            }
            </Toggle>
            <Link to={`/courses/${course.slug}`}><Icon className="fas fa-arrow-right"></Icon></Link>
          </Flex>
        }
        <i className={`${course.icon} fa-4x`}></i>
        <CourseTitle>{course.title}</CourseTitle>
        <i>{course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}</i>
      </Course>
    );
  }
}

export default CourseButton;
