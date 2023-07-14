import { Container, Nav, Navbar } from "react-bootstrap";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function BootstrapNavbar() {
  const { user, setIsSignedIn } = useContext(UserContext);

  function handleLogout() {
    localStorage.clear(user);
    setIsSignedIn("");
    alert("Logout successful");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">PosterBook</Navbar.Brand>
          <Nav>
            { user ?
              <>
                <Nav.Link href="/">Hi, {user.username}</Nav.Link>
                <Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link href="/posts">View Posts</Nav.Link>
              </>
             :
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/posts">View Posts</Nav.Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default BootstrapNavbar;
