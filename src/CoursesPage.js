import React from 'react';
import {CourseContext} from "./App";
import Level from "./Level";

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
                    <div style={{width: "960px", paddingTop: "50px", textAlign: "center"}}>

                      <Level level="Intern" colour="green" courses={courses["intern"]}
                             desc="Please follow these courses if you would like to join WellyCompSci as a Junior Programmer." />

                      <Level level="Junior" colour="blue" courses={courses["junior"]}
                             desc="Feel free to follow these courses at your own pace, if you would like to delve deeper into our world of programming and become a Senior Programmer." />

                      <Level level="Senior" colour="black" courses={courses["senior"]}
                             desc="If you feel that you are brave enough, please try delve into these courses to put yourselves ahead of the groups." />

                    </div>
                );
            }}
        </CourseContext.Consumer>);
    }
}

export default CoursesPage;
