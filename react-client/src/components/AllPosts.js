import React, { useContext } from "react";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import "../styles/PostList.css";

const AllPosts = () => {
    let { deletePost } = useContext(PostContext);
    let { user, isSignedIn } = useContext(UserContext);
  
    function handleDeletePost(id) {
      deletePost(id);
    }
  
    return (
      <PostContext.Consumer>
        {({ post }) => {
          return (
            <div className="posts-wrapper">
              {post.map((post) => {
                return (
                  <div key={post._id} className="post-list-individual-post">
                    <p>{post.message}</p>
                    <Link to={`profile/${post.userId}`}>{post.username}</Link>
                    {post.date}
                    {(isSignedIn && user._id === post.userId) &&
                      <div className="edit-delete-wrapper">
                      <Link to={`edit/${post._id}`}>
                      <Edit />
                    </Link>
                    <Delete onClick={handleDeletePost.bind(this, post._id)} />
                    </div>
                    }
                  </div>
                );
              })}
            </div>
          );
        }}
      </PostContext.Consumer>
    );
  };
  
  export default AllPosts;
  