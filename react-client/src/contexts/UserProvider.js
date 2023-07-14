import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = (props) => {

    const baseUrl = "http://localhost:3000/api/users/";

    let [isSignedIn, setIsSignedIn] = useState("");
    let [user, setUser] = useState("");
    let [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        async function fetchData(id) {
            await getUser(id);
        }
        if (isSignedIn) {
            fetchData(parseJwt(isSignedIn).userId)
        };
        async function fetchUsers() {
            await getAllUsers();
        }
        fetchUsers()
    }, [isSignedIn]);

    // Takes the JWT token from local storage and returns the user's id.  Referenced from the JWT package in npm
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
          return JSON.parse(jsonPayload);
      }

    function createUser(username, password, firstname, lastname, age, city, state) {       
        let user = { username, password, firstname, lastname, age, city, state };
        
        return axios.post(baseUrl, user)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function signInUser(username, password) {
        let user = { username, password };
        return axios.post(`${baseUrl}/login`, user)
            .then(response => {
                localStorage.setItem('myPostToken', response.data.token)
                setIsSignedIn(localStorage.getItem("myPostToken"))
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function getUser(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.get(baseUrl + id, { headers: myHeaders })
        .then(response => setUser(response.data));
        
    }

    function getAllUsers() {
        return axios.get(baseUrl).then(response => setAllUsers(response.data));
    }

    return (
        <UserContext.Provider value={{
            createUser,
            signInUser,
            getUser,
            isSignedIn,
            setIsSignedIn,
            user,
            allUsers
        }}>
            { props.children }
        </UserContext.Provider>
    )
}
