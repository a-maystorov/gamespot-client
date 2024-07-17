import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";

import AuthService from "../services/AuthService";

function NavBar() {
  const user: any = AuthService.getUser();

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-5">
      <Container>
        <NavLink to="/" className="navbar-brand">
          GameSpot
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to={user ? "/customers" : "/login"}>
              Customers
            </NavLink>
            <NavLink className="nav-link" to="/games">
              Games
            </NavLink>
            <NavLink className="nav-link" to={user ? "/rentals" : "/login"}>
              Rentals
            </NavLink>
            <NavLink className="nav-link" to="/genres">
              Genres
            </NavLink>
          </Nav>
          <Nav>
            {!user && (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink className="nav-link d-none d-lg-block" to="/">
                  Current user: {user.name}
                </NavLink>

                <Button
                  variant="outline-secondary"
                  className="rounded-pill btn-logout"
                  onClick={() => AuthService.logout()}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
