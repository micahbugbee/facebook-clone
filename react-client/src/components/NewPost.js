import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext'
import UserContext from '../contexts/UserContext';
import '../styles/NewPost.css'

const NewPost = () => {
    let [ newPost, setNewPost ] = useState({
        message: "",
        username: "",
        userId: "",
        date: ""
    });

    let { addPost } = useContext(PostContext);
    let { user } = useContext(UserContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value,
                username: user.username,
                userId: user._id,
                date: (new Date()).toLocaleString() }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        addPost(newPost).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });
    }

    return (
        <div className='new-post-container'>
        <form onSubmit={handleSubmit}>
            <h1>What's on your mind, {user.username}?</h1>
            <span className='hidden-span'>Write Here</span>
            <textarea className='post-input' placeholder="Write here..." name="message" value={newPost.message} onChange={handleChange} autoComplete="off"></textarea>
            <br></br><br></br>
            <button>Post</button>
        </form>
        </div>
    )
};

export default NewPost;