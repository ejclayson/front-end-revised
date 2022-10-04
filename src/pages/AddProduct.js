import { useState, useEffect, useContext } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import UserContext from "../UserContext";


export default function AddProduct() {

    const { user } = useContext(UserContext);

    const Navigate = useNavigate();

    // create state hooks to store the values of the input fields
    const [pName, setPname] = useState('');
    const [pDescription, setPdescription] = useState('');
    const [pPrice, setPprice] = useState('');
    const [pStock, setPstock] = useState('');
    const [pImage, setPimage] = useState('');

    // create a state to detemine whether the submit button is enabled or not.
    const [isActive, setIsActive] = useState(false);

    /*
        Two Way Binding
            - is done so that we can assure that we can save the input into our states as we type into the input elements. This is so we dont't have to save it just before submit.

            e.target = current element where the event happened.
            e.target.value = current value of thje element where the event happened.
    */

    // Check if the values are successfully binding
    console.log(pName);
    console.log(pDescription);
    console.log(pPrice);
    console.log(pStock);
    console.log(pImage);

    useEffect(() => {

        // Enable the submit button if:
        // All the fields are populated.
        // both passwords match.

        if (pName !== '' && pDescription !== '' && pPrice !== '' && pStock !== '' && pImage !== '') {
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }

    }, [pName, pDescription, pPrice, pStock, pImage])

    // Function to simulate user registration
    function addNewProduct(e) {
        // Prevents page loading/ redirection via form submission.
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/checkproduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: pName,
                description: pDescription
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Product name already added",
                        icon: "error",
                        text: "Kindly provide another Product name to proceed adding new product."
                    })
                }
                else {

                    fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({
                            name: pName,
                            description: pDescription,
                            price: pPrice,
                            stocks: pStock,
                            image: pImage
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);

                            if (data) {
                                Swal.fire({
                                    title: "Adding Product Successful",
                                    icon: "success",
                                    text: "Welcome for your Product!"
                                });

                                // Clear input fields
                                setPname('');
                                setPdescription('');
                                setPprice('');
                                setPstock('');
                                setPimage('');

                                // Allow us to redirect the user to the login page after account registration
                                Navigate("/admin");
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
        // (user.id !== null)
        // ?
        // 	<Navigate to="/courses" />
        // :
        <>
            <div className="p-5 mt-5 mb-5">
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => addNewProduct(e)}>

                    <Form.Group className="mb-3" controlId="productItemName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={pName}
                            onChange={e => setPname(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productItemDescription">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product description"
                            value={pDescription}
                            onChange={e => setPdescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productItemPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            onChange={e => setPprice(e.target.value)}
                            value={pPrice}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productItemStocks">
                        <Form.Label>Number of stock/s</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter how many stocks of the product"
                            onChange={e => setPstock(e.target.value)}
                            value={pStock}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productItemImage">
                        <Form.Label>Image of product</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image name and location"
                            onChange={e => setPimage(e.target.value)}
                            value={pImage}
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
