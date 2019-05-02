import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CoursesPage from './CoursesPage';
import CoursePage from './CoursePage';
import IndexPage from './IndexPage';
import FAQPage from './FaqPage';
import {Header, Container, Main, Footer} from "./Elements";
import axios from "axios";

export const CourseContext = React.createContext();

class App extends Component {
    state = {
        courses: [],
        error: null,
        loading: false
    }

    refetchCourses = () => {
        this.setState({...this.state, loading: true});
        axios.get("https://api.intern.wellycompsci.org.uk/").then(({data}) => {
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
                        <Header />
                        <Main>
                            <Switch>
                                <Route exact path="/" component={IndexPage}/>
                                <Route exact path="/courses" component={CoursesPage}/>
                                <Route exact path="/faq" component={FAQPage}/>
                                <Route path="/courses/:courseID/:videoID?" component={CoursePage}/>
                            </Switch>
                        </Main>
                        <Footer />
                    </Container>
                </Router>
            </CourseContext.Provider>
        );
    }
}

export default App;
