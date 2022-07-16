import { useContext } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { AuthContext } from "../context/AuthContext";

export const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  // Logout User
  const handleLogOutUser = () => {
    logoutUser();
  };

  return (
    <Navbar expand="lg" bg="success" variant="light" className="shadow">
      <Navbar.Brand className="fw-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnitLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        LearnIt
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-between"
      >
        <Nav className="mr-auto">
          <Nav.Link className="fw-bolder text-white " to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className="fw-bolder text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav style={{ marginRight: "16px" }}>
          <Nav.Link className="fw-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="primary"
            className="fw-bolder text-white"
            onClick={handleLogOutUser}
          >
            <img src={logoutIcon} alt="logoutIcon" width="32" height="32" />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
