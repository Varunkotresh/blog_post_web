import React from 'react';
import {Nav, Navbar, Container, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Blogging</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/home" >Home
            </NavLink>
            <NavLink href="/create">AddBlog</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;
