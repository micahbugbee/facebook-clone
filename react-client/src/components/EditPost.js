import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext'
import '../styles/EditPost.css'

function EditPost() {
    const params = useParams();
    const { getPost, editPost } = useContext(PostContext);
    const [currentPost, setCurrentPost] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetch() {
            let foundPost = await getPost(params.id)
            setCurrentPost(foundPost)
          }
          fetch()
    }, [getPost, params.id])

    function handleChange(event) {
        setCurrentPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
        setCurrentPost((prevValue) => {
            return { ...prevValue, date: (new Date()).toLocaleString() }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        editPost(currentPost).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            navigate('/login');
        });
    }
  return (
    <form onSubmit={handleSubmit}>
            <div className='edit-post-form'>
                <h3>Edit Post</h3>
                <textarea className='textarea' placeholder="Edit your post here" name="message" value={currentPost.message} onChange={handleChange}></textarea>
                <button>Update</button>
            </div>
        </form>
  )
}

export default EditPost