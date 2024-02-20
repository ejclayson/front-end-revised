import { useState, useEffect, useContext } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import UserContext from "../UserContext";


export default function Register() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    // create state hooks to store the values of the input fields
    const [uName, setUName] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    // create a state to detemine whether the submit button is enabled or not.
    const [isActive, setIsActive] = useState(false);

    /*
        Two Way Binding
            - is done so that we can assure that we can save the input into our states as we type into the input elements. This is so we dont't have to save it just before submit.

            e.target = current element where the event happened.
            e.target.value = current value of thje element where the event happened.
    */

    // Check if the values are successfully binding
    console.log(uName);
    console.log(fName);
    console.log(lName);
    console.log(email);
    console.log(mobileNo);
    console.log(password1);
    console.log(password2);

    useEffect(() => {

        // Enable the submit button if:
        // All the fields are populated.
        // both passwords match.

        if ((uName !== "" && fName !== '' && lName !== '' && email !== '' && mobileNo !== '' && password1 !== '' && password2 !== '') && (password1 === password2)) {
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }

    }, [uName, fName, lName, email, mobileNo, password1, password2])

    // Function to simulate user registration


 

                    


                



//register only 202402191319
    // function registerUser(e) {
    //     // Prevents page loading/ redirection via form submission.
    //     e.preventDefault();

    //     fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify({
    //                         username: uName,
    //                         firstname: fName,
    //                         lastname: lName,
    //                         email: email,
    //                         mobile: mobileNo,
    //                         password: password1
                            
    //                     })
    //                 })
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         console.log(data);

    //                         if (data) {
    //                             Swal.fire({
    //                                 title: "Registration Successful",
    //                                 icon: "success",
    //                                 text: "Prettyfull Collections!"
    //                             });

    //                             // Clear input fields
    //                             setUName('');
    //                             setFName('');
    //                             setLName('');
    //                             setEmail('');
    //                             setMobileNo('');
    //                             setPassword1('');
    //                             setPassword2('');

    //                             // Allow us to redirect the user to the login page after account registration
    //                             navigate("/login");
    //                         }
    //                         else {

    //                             Swal.fire({
    //                                 title: "Something went wrong",
    //                                 icon: "error",
    //                                 text: "Please try again."
    //                             });

    //                         }

    //         })



    //     // Notify user for registration
    //     // alert("Thank you for registering!");

    // }




     function registerUser(e) {
        // Prevents page loading/ redirection via form submission.
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/user/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: uName,
                email: email,
                mobile: mobileNo
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Duplicate username, email, or mobile found",
                        icon: "error",
                        text: "Kindly provide another username, email, or mobile to complete the registration."
                    })
                }
                else {

                    fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: uName,
                            firstname: fName,
                            lastname: lName,
                            email: email,
                            mobile: mobileNo,
                            password: password1
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);

                            if (data) {
                                Swal.fire({
                                    title: "Registration Successful",
                                    icon: "success",
                                    text: "Prettyfull Collections!"
                                });

                                // Clear input fields
                                setUName('');
                                setFName('');
                                setLName('');
                                setEmail('');
                                setMobileNo('');
                                setPassword1('');
                                setPassword2('');

                                // Allow us to redirect the user to the login page after account registration
                                navigate("/login");
                            }
                            else {

                                Swal.fire({
                                    title: "Something went wrong",
                                    icon: "error",
                                    text: "Please try again."
                                });

                            }
                        })


                }
            })



        // Notify user for registration
        // alert("Thank you for registering!");

    }
    




    return (
     
        <>
            <div className="p-5">

                <h1 className="my-5 text-center">Register</h1>

                <Form onSubmit={e => registerUser(e)}>




 <Form.Group className="mb-3" controlId="username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter user name"
                            value={uName}
                            onChange={e => setUName(e.target.value)}
                            required
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={fName}
                            onChange={e => setFName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={lName}
                            onChange={e => setLName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mobile">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="09xxxxxxxxx"
                            value={mobileNo}
                            onChange={e => setMobileNo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password1}
                            onChange={e => setPassword1(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password2">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Verify Password"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {/*Conditional rendering - submit button will be active based on the isActive state*/}
                    {
                        isActive
                            ?
                            <Button variant="primary" type="submit" id="submitBtn">
                                Submit
                            </Button>
                            :
                            <Button variant="danger" type="submit" id="submitBtn" disabled>
                                Submit
                            </Button>
                    }
                </Form>
            </div>
        </>
    )
}

