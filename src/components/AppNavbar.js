//import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
//import 'bootswatch/dist/vapor/bootstrap.min.css';
import "./AppNavbar.css";
import { useContext } from "react"
import { Image } from 'react-bootstrap';

import { NavLink } from "react-router-dom";
// shorthand method
import { Container, Nav, Navbar } from "react-bootstrap";

import UserContext from "../UserContext";


export default function AppNavbar() {

    // Create a user state that will be used for the conditional rendering of our nav bar
    // Use the user state

    const { user } = useContext(UserContext);
    /* 
    - "as" prop allows component to be treated as the component of the "react-router-dom" to gain access to it's properties and functionalities.
    -"to" prop is used in place of the "href" attribute for providing the URL for the page.
    */

    return (
        <div className="main-navbar">
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/" style={{ color: '#dcb209' }}><Image src="/images/pc.png" />PrettyfullCollections</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/*
		    	className is use instead of class, to specify a CSS class

		    	ml->ms (margin start)
		    	mr->me (margin end)

				If user is login, nav links visible:
					- Home
					- Courses
					- Logout
				If user is not login, nav links visible:
					- Home
					- Courses
					- Login
					- Register
			*/}
                        <Nav className="ms-auto">

                            {
                                (user.isAdmin)
                                    ?
                                    <Nav.Link as={NavLink} to="/admin" end style={{ color: '#dcb209' }}>Admin</Nav.Link>
                                    :
                                    <>
                                        <Nav.Link as={NavLink} to="/products" end style={{ color: '#dcb209' }}>Products</Nav.Link>
                                    </>
                            }
                            {
                                (user.id !== null)
                                    ?
                                    <>
                                        <Nav.Link as={NavLink} to="/orders" end style={{ color: '#dcb209' }}>Orders</Nav.Link>
                                        <Nav.Link as={NavLink} to="/logout" end style={{ color: '#dcb209' }}>Logout</Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as={NavLink} to="/login" end style={{ color: '#dcb209' }}>Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="/register" end style={{ color: '#dcb209' }}>Register</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

