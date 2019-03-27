import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const CoursesBox = styled.div`
  margin: 0px auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2ecc71;
  padding: 50px 10px;
  color: white;
`;

const CourseLink = styled(Link)`
  background-color: #3498db;
  margin-top: 20px;
  width: 30%;
  height: 20%;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  :hover{
    background-color: #1B7FC2;
  }
`;

const ContactBox = styled.a`
  margin: 0px auto;
  margin-top: 50px;
  width: 75%;
  padding: 60px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  background-color: #e74c3c;
  :hover{
    background-color: #CE3323;
  }
`;

const IndexPage = () => (
    <React.Fragment>
        <h1>Welcome to the new Intern Programme Training Portal</h1>
        <p>
            Here we will be providing our video courses to educate our interns in the new and upcoming technologies in the programming world. These progammes will allow each user to graduate from an Intern to a Junior Programmer and then to a Senior Programmer. After you have completed the respective courses, you should email <a href="mailto:WellyCompSci@wellingtoncollege.org.uk">WellyCompSci</a> to book an interview. We hope you enjoy.
        </p>
        <p><i>Will, Arjun &amp; Gregor</i></p>

        <CoursesBox><h1>Begin Your Internship</h1><CourseLink to="/courses"><h2>Courses</h2></CourseLink></CoursesBox>
        <ContactBox href="mailto:wellycompsci@wellingtoncollege.org.uk"><h1>Book Your Interview</h1></ContactBox>
    </React.Fragment>
);

export default IndexPage;
