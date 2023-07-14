import React from "react";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider";
import { PostProvider } from "./contexts/PostProvider";
import Login from "./components/Login";
import Register from "./components/Register"
import ProfilePage from "./components/ProfilePage"
import EditPost from "./components/EditPost"
import AllPosts from "./components/AllPosts"
import './App.css';
import BootstrapNavbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<BootstrapNavbar />} >
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/posts" element={<AllPosts />} />
                <Route path="/edit/:id" element={<EditPost />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
