import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export interface NavbarPageProps {}

const NavbarPage: React.SFC<NavbarPageProps> = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Vidly</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto text-center">
          <Link to="/">
            <Button variant="outline-warning">Movies</Button>
          </Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <Link to="/tasks">
              <Button variant="outline-success"> Query Tasks</Button>
            </Link>
            <NavDropdown.Item href="#action/3.2">
              Adventure Movies
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Thriller Movies
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Best Movies Of All Times
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <Link to="/sign-in">
            <Button variant="outline-success">Sign In</Button>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPage;
