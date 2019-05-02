import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Buttons = styled.div`
  display: flex;
  height: 20vh;
  margin-top: 5vh;
  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40%;
    height: 100%;
    border-radius: 10px;
    margin: auto;

    color: white;
    text-decoration: none;
  }
`;

const CoursesBox = styled(Link)`
  background-color: #2ecc71;
  :hover{
    background-color: #15B358;
  }
`;

const ContactBox = styled.a`
  background-color: #3498db;
  :hover{
    background-color: #1B7FC2;
  }
`;

const IndexPage = () => (
    <React.Fragment>
        <h1>Welcome to the new Intern Programme Training Portal</h1>
        <p>
            Here we will be providing our video courses to educate our interns in the new and upcoming technologies in the programming world. These progammes will allow each user to graduate from an Intern to a Junior Programmer and then to a Senior Programmer. After you have completed the respective courses, you should email <a href="mailto:WellyCompSci@wellingtoncollege.org.uk">WellyCompSci</a> to book an interview. We hope you enjoy.
        </p>
        <p><i>Will, Arjun &amp; Gregor</i></p>

        <Buttons>
          <CoursesBox to="/courses"><h1>Begin Your Internship</h1></CoursesBox>
          <ContactBox href="mailto:wellycompsci@wellingtoncollege.org.uk"><h1>Book Your Interview</h1></ContactBox>
        </Buttons>

    </React.Fragment>
);

export default IndexPage;
