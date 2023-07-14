import axios from "axios";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {

    const [ post, setPosts ] = useState([]);
    const baseUrl = "http://localhost:3000/api/posts/";

    useEffect(() => {
    async function fetchData() {
        await getAllPosts();
    }
    fetchData();
}, []);

    function getAllPosts() {
        return axios.get(baseUrl).then(response => setPosts(response.data));
    }

    function getPost(id) {
        return post.find((post) => post._id === id);
    }

    function addPost(post) {        
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };
    
        return axios.post(baseUrl, post, { headers: myHeaders })
            .then(response => {
                getAllPosts();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editPost(post) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.put(baseUrl + post._id, post, { headers: myHeaders })
            .then(response => {
                getAllPosts();
                return new Promise(resolve => resolve(response.data));
            });
    }

    function deletePost(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders }).then(response => {
            getAllPosts();
            return new Promise(resolve => resolve(response.data));
        });
    }

    return (
        <PostContext.Provider value={{
            post,
            getPost,
            addPost,
            editPost,
            deletePost
        }}>
            { props.children }
        </PostContext.Provider>
    )
};