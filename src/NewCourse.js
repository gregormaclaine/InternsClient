import React from 'react';
import styled from 'styled-components';
import axios from "axios";

const Form = styled.form`
    color: white;
    background-color: ${({level}) => {
    switch (level) {
        case 'intern':
            return '#2ecc71';
            break;
        case 'junior':
            return '#3498db';
            break;
        case 'senior':
            return '#e74c3c';
            break;
        default:
            return '#333';
    }
}};
    padding: 16px 20px;
    margin: 8px;
`;

const Input = styled.input`
    padding: 12px 20px;
    border: none;
    margin: 8px 0;
    width: 100%;
`;

const Select = styled.select`
    padding: 12px 20px;
    border: none;
    margin: 8px 0;
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    border: none;
    resize: none;
`;

const Button = styled.button`
    background-color: #2eec71;
    border: none;
    text-decoration: none;
    cursor: pointer;
    padding: 16px 32px;
    margin: 4px 2px;
`;

export default class NewCourse extends React.Component {
    state = {
        level: 'intern'
    }

    newCourse = async (e) => {
        e.preventDefault();
        try {
            var _id;
            if(this.props.editCourse){
                _id = this.props.editCourse._id;
                await axios.post("https://api.intern.wellycompsci.org.uk/" + _id, {
                    title: this.title.value,
                    icon: this.icon.value,
                    level: this.level.value,
                    description: this.description.value,
                    youtubeID: this.playlistID.value,
                    position: this.props.editCourse.position,
                });
            } else {
                var {data: idData} = await axios.post("https://api.intern.wellycompsci.org.uk/", {
                    title: this.title.value,
                    icon: this.icon.value,
                    level: this.level.value,
                    description: this.description.value,
                    youtubeID: this.playlistID.value,
                    position: this.props.length
                });
                _id = idData._id;
            }
                if (this.props.editCourse) {
                    await Promise.all(this.props.editCourse.videos.map(async (video) => {
                        return await axios.delete(`https://api.intern.wellycompsci.org.uk/${_id}/${video._id}`);
                    }));
                }
                var {data} = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${this.playlistID.value}&key=AIzaSyAoBVRLwkm3DV9pNEArUh_hXMstpDCl2CE&maxResults=50&part=snippet`);
                if (data.items.length > 0) {
                    await Promise.all(data.items.map(async (video) => {
                        var title = video.snippet.title;
                        var description = video.snippet.description;
                        var youtubeID = video.snippet.resourceId.videoId;
                        var $position = video.snippet.position;
                        await axios.post("https://api.intern.wellycompsci.org.uk/" + _id + '/new-video', {
                            title,
                            description,
                            youtubeID,
                            $position
                        });
                    }));
                }
            this.props.onSubmit();
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <Form onSubmit={this.newCourse} level={this.state.level}>
              <h3 onClick={()=>console.log(this.state.level)}>{this.props.editCourse ? 'Edit Course' : 'New Course'}</h3>
              <Select placeholder="Level" ref={ref => this.level = ref}
                defaultValue={this.props.editCourse ? this.props.editCourse.level : ''} onChange={e => this.setState({level: e.target.value})}>
                <option value="intern">Intern</option>
                <option value="junior">Junior Programmer</option>
                <option value="senior">Senior Programmer</option>
              </Select>
              <Input defaultValue={this.props.editCourse ? this.props.editCourse.icon : ''} ref={ref => this.icon = ref} placeholder="Icon"/>
              <Input defaultValue={this.props.editCourse ? this.props.editCourse.title : ''} ref={ref => this.title = ref} placeholder="Title"/>
              <TextArea defaultValue={this.props.editCourse ? this.props.editCourse.description : ''} placeholder="Description" ref={ref => this.description = ref}/>              <Input defaultValue={this.props.editCourse ? this.props.editCourse.youtubeID : ''} ref={ref => this.playlistID = ref} placeholder="Playlist ID"/>
              <Button type="submit">Submit</Button>
            </Form>
        );
    }
}
