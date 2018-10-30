import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CoursesPage from './CoursesPage';
import CoursePage from './CoursePage';
import {Header, Container, Main, Footer} from "./Elements";
import AdminCoursesPage from "./AdminCoursesPage";
import AdminCoursePage from "./AdminCoursePage";

class App extends Component {
  render() {
    return (
      <Router>
          <Container>
              <Header/>
              <Main>
        <Switch>
          <Route exact path="/" component={CoursesPage}/>
            <Route path="/courses/:courseID/:videoID?" component={CoursePage}/>
            <Route path="/admin" exact component={AdminCoursesPage} />
            <Route path="/admin/:courseID/:videoID?" component={AdminCoursePage} />
        </Switch>
              </Main>
              <Footer/>
          </Container>
      </Router>
    );
  }
}

export default App;
