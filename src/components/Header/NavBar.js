import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  changeThemeDark,
  changeThemeLight,
} from "../../redux/action/changeTheme";

function NavBar() {
  const [isDark, setIsDark] = useState(true);
  const dispatch = useDispatch();
  const background = useSelector((state) => state.theme.background);

  useEffect(() => {
    background === "dark" ? setIsDark(true) : setIsDark(false);
  }, [background]);

  const toogleTheme = () => {
    if (isDark) dispatch(changeThemeLight());
    else dispatch(changeThemeDark());
  };

  return (
    <>
      <Navbar bg={isDark ? "dark" : "light"} variant={isDark ? "dark" : "none"}>
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/players" className="nav-link">
              Players
            </NavLink>
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </Nav>
          <Nav>
            <Nav.Link onClick={toogleTheme}>Toogle theme</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
