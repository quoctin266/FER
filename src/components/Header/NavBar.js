import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  changeThemeDark,
  changeThemeLight,
} from "../../redux/action/changeTheme";
import { logout } from "../../redux/action/auth";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { postLogout } from "../../service/authService";
import { toast } from "react-toastify";
import defaultAvatar from "../../Image/default.png";

function NavBar() {
  const [isDark, setIsDark] = useState(true);
  const dispatch = useDispatch();
  const background = useSelector((state) => state.theme.headerBackground);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let role = useSelector((state) => state.auth.role);
  let img = useSelector((state) => state.auth.img);
  let name = useSelector((state) => state.auth.name);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    let res = await postLogout();
    if (res.status === 200) {
      dispatch(logout());
      navigate("/login");
    } else toast.error(res.message);
  };

  useEffect(() => {
    background === "dark" ? setIsDark(true) : setIsDark(false);
  }, [background]);

  const toogleTheme = () => {
    if (isDark) dispatch(changeThemeDark());
    else dispatch(changeThemeLight());
  };

  return (
    <>
      <Navbar bg={isDark ? "dark" : "light"} variant={isDark ? "dark" : "none"}>
        <Container className="mx-5 px-5">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/players" className="nav-link">
              Orchids
            </NavLink>
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </Nav>
          <Nav>
            <Nav.Link onClick={toogleTheme}>Toogle theme</Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link style={{ width: "40px", paddingRight: "0" }}>
                  <Image
                    src={img ? img : defaultAvatar}
                    roundedCircle
                    style={{ width: "90%" }}
                  />
                </Nav.Link>
                <NavDropdown
                  title={name}
                  id="basic-nav-dropdown"
                  drop="down-centered"
                >
                  {role === 0 && (
                    <NavDropdown.Item onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </NavDropdown.Item>
                  )}
                  {(role === 1 || role === 0) && (
                    <NavDropdown.Item onClick={() => navigate("/profile")}>
                      Profile
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <></>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
