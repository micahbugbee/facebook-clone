import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { Edit, Delete } from "@mui/icons-material";
import '../styles/ProfilePage.css'

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState("");
  const { deletePost } = useContext(PostContext);
  const { user, isSignedIn, allUsers } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    setCurrentUser(allUsers.filter((user) => user._id === params.id)[0]);
  }, [allUsers, params.id]);

  function handleDeletePost(id) {
    deletePost(id);
  }

  return (
    <div>
      <div className="profile-container">
        <h2>
          <b>User:</b> {currentUser.username}
        </h2>
        <p>
          <b>Name:</b> {currentUser.firstname} {currentUser.lastname}
        </p>
        <p>
          <b>Age:</b> {currentUser.age}
        </p>
        <p>
          <b>Location:</b> {currentUser.city}, {currentUser.state}
        </p>
      </div>
      <PostContext.Consumer>
        {({ post }) => {
          return (
            <div className="posts-wrapper">
              {post.filter((post) => post.userId === params.id).map((post) => {
                return (
                  <div key={post._id} className="post-list-individual-post">
                    <p>{post.message}</p>
                    {post.date}
                    {isSignedIn && user._id === post.userId && (
                      <div className="edit-delete-wrapper">
                        <Link to={`edit/${post._id}`}>
                          <Edit />
                        </Link>
                        <Delete
                          onClick={handleDeletePost.bind(this, post._id)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      </PostContext.Consumer>
    </div>
  );
};

export default ProfilePage;
