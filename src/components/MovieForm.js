import React from 'react';
import './MovieForm.css'

export default class MovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:
            {
                title: '',
                poster: '',
                comment: ''
            }

        }
    }

    handleChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            response: ''
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(this.state.data)
        };
        const apiUrl = 'https://post-a-form.herokuapp.com/api/movies';
        fetch(apiUrl, config)
            .then(result => result.json())
            .then(res => res.error ? this.setState({ success: false, response: res.error }) : this.setState({ success: true, response: `Movie #${res} has been successfully added!` }))
    }

    render() {
        const { title, poster, comment } = this.state.data;
        return (
            <div className="movieForm">
                <h1>Add a movie form</h1>

                { this.state.response && (!this.state.success ? <div className="error response"> {this.state.response} </div> : <div className="success response">{this.state.response}</div>)}
                <form className="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} />
                    <label htmlFor="poster">Poster</label>
                    <input type="text" name="poster" value={poster} onChange={this.handleChange} />
                    <label htmlFor="comment">Comment</label>
                    <textarea type="text" rows="5" name="comment" value={comment} onChange={this.handleChange} />
                    <button type="submit">Send a movie</button>
                </form>
            </div>
        )
    }
}