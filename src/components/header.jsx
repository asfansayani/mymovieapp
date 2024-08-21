import { NavLink } from "react-router-dom";
import {Container,Nav,Navbar} from 'react-bootstrap';
const Header = () => {
    return (
        <>
            <Navbar>
                <Container>
                    <NavLink to="/mymovieapp" className='text-decoration-none text-white'><b>MY MOVIE APP</b></NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <NavLink className={(e) => e.isActive ? "nav-link active" : "nav-link text-white"} to="/mymovieapp">Home</NavLink>
                            <NavLink className={(e) => e.isActive ? "nav-link active" : "nav-link text-white"} to="/mymovieapp/movies">Movies</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default Header;