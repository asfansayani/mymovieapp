import { NavLink } from "react-router-dom";
import {Container,Nav,Navbar} from 'react-bootstrap';
const Header = () => {
    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home"><b>MY MOVIE APP</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <NavLink className={(e) => e.isActive ? "nav-link active" : "nav-link text-white"} to="/">Home</NavLink>
                            <NavLink className={(e) => e.isActive ? "nav-link active" : "nav-link text-white"} to="/blog">Blog</NavLink>
                            <NavLink className={(e) => e.isActive ? "nav-link active" : "nav-link text-white"} to="/movies">Movies</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default Header;