import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const FAQ = styled.div`
  a {
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  h2 {
    // color: #363636;
    font-weight: 300;
  }
`;

const FAQPage = () => (
    <FAQ>
        <h1>Frequently Asked Questions</h1>
        <h2>What you need to do to become an intern</h2>
        <ol>
          <li>Complete all of the <Link to="/courses">Intern Level Courses</Link> (You may complete the other courses, but these are the basic requirements)</li>
          <li>Use these skills to build your own project, using a combination of HTML, CSS, and Javascript</li>
          <li><a href="mailto:wellycompsci@wellingtoncollege.org.uk?subject=Interview">Email us</a> to arrange an interview to become a junior programmer</li>
        </ol>
        <h2>How long have I got to complete the courses?</h2>
        <p>You can take as long as you like to complete these courses, and you can develop your own personal project as you go or at the end. Once you feel confident that you understand the components contained in the courses, <b>then</b> you can arrange your interview.</p>
        <h2>What is the interview?</h2>
        <p>The interview is a semi-formal setting where you will have a discussion based interview – we would like to see something you’ve created and can showcase to us. We will then be able to ask you some questions about the code. We do not expect you to be an expert at this stage!! We are just looking for basic understanding and enthusiasm to learn more.</p>
        <h2>I am having trouble with one of the videos or the course content</h2>
        <p>Any feedback to do with the learning platform or lessons themselves should go to <a href="mailto:wellycompsci@wellingtoncollege.org.uk">WellyCompSci@wellingtoncollege.org.uk</a> we will be able to look into the matter from there. If it is technical understanding please do try and look elsewhere on the internet to consolidate learning, as programmers we spend a lot of time sharing and learning new skills from others online.</p>
        <h2>I have a question which is not listed here</h2>
        <p>Any and all questions are welcome, please just <a href="mailto:wellycompsci@wellingtoncollege.org.uk">email and the team</a> will reply as soon as possible, hopefully answering your question.</p>
    </FAQ>
);

export default FAQPage;
