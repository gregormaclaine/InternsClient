import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CoursesPage from './CoursesPage';
import CoursePage from './CoursePage';
import IndexPage from './IndexPage';
import {Header, Container, Main, Footer} from "./Elements";
import axios from "axios";

export const CourseContext = React.createContext();

const HASH = 'HelloWorld1';

class App extends Component {
    state = {
        courses: [],
        error: null,
        loading: false,
        admin: false
    }

    refetchCourses = () => {
        this.setState({...this.state, loading: true});
        axios.get("http://api.wellycompsci.org.uk/interns/").then(({data}) => {
            this.setState({...this.state, courses: data, loading: false});
        }).catch(error => this.setState({...this.state, error, loading: false}));
    }
    componentDidMount() {
        this.refetchCourses();
    }

    render() {
        return (
            <CourseContext.Provider value={{...this.state, refetchCourses: this.refetchCourses}}>
                <Router>
                    <Container>
                        <Header admin={this.state.admin}/>
                        <Main>
                            <Switch>
                                <Route exact path="/" component={IndexPage}/>
                                <Route exact path="/courses" component={CoursesPage}/>
                                <Route path="/courses/:courseID/:videoID?" component={CoursePage}/>
                            </Switch>
                        </Main>
                        <Footer onChangeAdmin={(e) => {
                            this.setState({...this.state, admin: e.target.value === HASH})
                        }}/>
                    </Container>
                </Router>
            </CourseContext.Provider>
        );
    }
}

export default App;
