import { useEffect, useState, useContext } from "react";

import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

import Swal from "sweetalert2";


import UserContext from "../UserContext";

export default function Login() {

    /* 
    syntax
    fetch("url", {options})
    .then(res=>res.json())
    .then(data=>{})

    */


    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(false);

    /* const prefEmail = "admin@mail.com";
    const prefPass = "admin"; */

    // Allows us to gain access to methods that allows us to redirect to another page
    //const navigate  = useNavigate();

    useEffect(() => {
        // Enable the button if:
        // All the fields are populated 
        // both passwords match 

        if (email !== '' && password !== '') {
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }

    }, [email, password]);






    function loginUser(e) {
        // Prevents page loading/ redirection via form submission
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.accessToken);

                if (data.accessToken !== undefined) {
                    localStorage.setItem("token", data.accessToken);
                    retrieveUserDetails(data.accessToken);
                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to Prettyfull Collections!"

                    });
                }
                else {
                    Swal.fire({
                        title: "Authentication Failed!",
                        icon: "error",
                        text: "check your login details and try again"
                    });
                }
            })

        // "localStorage" is a property that allows JavaScript sites and application to save key-value pairs in a web browser with no expiration date.
        // SYNTAX:
        // localStorage.setItem("propertyName", value);
        /* 
        localStorage.setItem("electronicMail", electronicMail);

        setUser({
            email: localStorage.getItem("electronicMail")
        }); */

        // clear input fields
        setEmail('');
        setPassword('');

        // Notify user for registration
        /* if
            (
            electronicMail === prefEmail
            &&
            passwordTwo === prefPass
        ) {
            //alert(`Login successful!`);
            // Redirect us to home page
            //navigate("/");
        }
        else {
            //alert(`Login failed!`);
            // Redirect us to home page
            //navigate("/login");
        } */

    }


    const retrieveUserDetails = (token) => {

        fetch(`${process.env.REACT_APP_API_URL}/users/viewDetails`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // Change the global "user" state to store the "id" and "isAdmin" property
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                });

            })

    }



    return (
        // Create a conditional statement that will redirect the user to the course page when a user is already logged in
        (user.id !== null)
            ?
            <Navigate to="/products" />
            :
            <>
                <div className="mb-5 mt-5 p-5 mb-5 containement">
                    <h1 className="my-5 text-center">LOGIN</h1>

                    <Form
                        onSubmit={e => loginUser(e)}
                    >


                        <Form.Group
                            className="mb-3"
                            controlId="setEmail"
                        >
                            <Form.Label>Email address</Form.Label>

                            <Form.Control

                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required

                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group
                            className="mb-3"
                            controlId="setPassword"
                        >
                            <Form.Label>Verify Password</Form.Label>

                            <Form.Control
                                type="password"
                                placeholder="Verify Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* 
                Conditional Rendering
                submit button will be active based on the isActive state
                 */}
                        {
                            isActive
                                ?
                                <Button
                                    variant="primary"
                                    type="submit"
                                    id="submitBtn"
                                >
                                    Submit
                                </Button>
                                :
                                <Button
                                    variant="danger"
                                    type="submit"
                                    id="submitBtn"
                                    disabled
                                >
                                    Submit
                                </Button>
                        }


                    </Form>
                </div>
            </>


    )

}
