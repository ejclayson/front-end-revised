import { useContext, useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
/* 
import axios from 'axios';

import BootstrapTable from "react-bootstrap-table2-paginator"

import paginationFactory from "react-bootstrap-table2-paginator"; */



//import "../App.css";

import UserContext from "../UserContext";




export default function AdminDashboard() {



    const { user } = useContext(UserContext);

    //addnewproduct
    const Navigate = useNavigate();

    function addnewproduct() {


        Navigate("/addproduct");
    }
    //addnewproduct


    //retrieveorders
    //const Navigate = useNavigate();

    function retrieveorders() {


        Navigate("/retrieve");
    }
    //retrieveorders



    // To control the retrieve all modal pop out
    // We have passed a parameter from the edit button so we can retrieve a specific course and bind it with our input fields.

    // For further observation / I believe this has alreacy been declared / I belive there is only one needed of this one that can be used all through out this page
    // State to determine whether submit button in the modal is enabled or not
    // const [isActive, setIsActive] = useState(false);

    //this is for addproduct modal only and we don't need modal for add product
    // State for Add Modal
    //  const [showAdd, setShowAdd] = useState(false);


    // Create allProducts state to contain all the courses from the response of our fetc hData
    //Confirmed important
    const [allOrders, setAllOrders] = useState([]);



    // State for retrieve all orders made by users Modal
    const [showRetrieveOrders, setShowRetrieveOrders] = useState(false);

    // To control the edit course modal pop out
    // We have passed a parameter from the edit button so we can retrieve a specific course and bind it with our input fields.
    const openRetrieveOrders = () => {
        //setProductId(id);

        // Getting a specific product to pass on the edit modal
        /*   fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
              .then(res => res.json())
              .then(data => {
  
                  console.log(data);
  
                  // updating the course states for editing
                  setName(data.name);
                  setDescription(data.description);
                  setPrice(data.price);
                  setStocks(data.stocks);
              }); */

        setShowRetrieveOrders(true)
    };

    const closeRetrieveOrders = () => {

        /* 
        // Clear input fields upon closing the modal
        setName('');
        setDescription('');
        setPrice(0);
        setStocks(0); */

        setShowRetrieveOrders(false);
    };



    // To control the retrieve all modal pop out



    // TO SHOW ALL ORDERS IN THE MODAL
    const fetchOrders = () => {
        // get all the courses from the database
        fetch(`${process.env.REACT_APP_API_URL}/orders/allOrders`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllOrders(data.map(orders => {
                    return (
                        <tr key={orders._id}>
                            <td>

                                {orders._id}

                            </td>
                            <td>
                                {orders.userId}
                            </td>
                            <td>
                                {orders.purchasedOn}
                            </td>
                            <td>
                                {orders.totalAmount}
                            </td>
                            {orders.products.map((details) => (
                                <>
                                    <td>
                                        {details.productName}
                                    </td>
                                    <td>
                                        {details.quantity}
                                    </td>

                                </>

                            ))}



                        </tr>
                    )
                }));
            });
    }
    // TO SHOW ALL ORDERS IN THE MODAL


    // edit product
    // State hooks to store the values of the input fields for our modal.
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);

    // State to determine whether submit button in the modal is enabled or not
    const [isActive, setIsActive] = useState(false);

    // State for Add/Edit Modal (the first line is for only adding product intended for modal which is not needed)
    //const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    // To control the add course modal pop out
    //const openAdd = () => setShowAdd(true); //Will show the modal
    //const closeAdd = () => setShowAdd(false); //Will hide the modal


    // To control the retrieve all modal pop out
    // We have passed a parameter from the edit button so we can retrieve a specific course and bind it with our input fields.



    // To control the retrieve all modal pop out



    // To control the edit course modal pop out
    // We have passed a parameter from the edit button so we can retrieve a specific course and bind it with our input fields.
    const openEdit = (id) => {
        setProductId(id);

        // Getting a specific course to pass on the edit modal
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
            .then(res => res.json())
            .then(data => {

                console.log(data);

                // updating the course states for editing
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setStocks(data.stocks);
            });

        setShowEdit(true)
    };

    const closeEdit = () => {

        // Clear input fields upon closing the modal
        setName('');
        setDescription('');
        setPrice(0);
        setStocks(0);

        setShowEdit(false);
    };

    // edit product



    // Create allProducts state to contain all the courses from the response of our fetc hData
    const [allProducts, setAllProducts] = useState([]);

    // [SECTION] Setting the course to Active/Inactive
    // Making the course inactive
    const archive = (productId, name) => {
        console.log(productId);
        console.log(name);

        // Using the fetch method to set the isActive property of the course document to false
        fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                isActive: false
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data) {
                    Swal.fire({
                        title: "Archive Successful",
                        icon: "success",
                        text: `${name} is now inactive.`
                    });
                    // To show the update with the specific operation intiated.
                    fetchData();
                }
                else {
                    Swal.fire({
                        title: "Archive unsuccessful",
                        icon: "error",
                        text: "Something went wrong. Please try again later!"
                    });
                }
            })
    }
    //edit product



    // Making the course active
    const unarchive = (productId, name) => {
        console.log(productId);
        console.log(name);

        // Using the fetch method to set the isActive property of the course document to false
        fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                isActive: true
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data) {
                    Swal.fire({
                        title: "Unarchive Successful",
                        icon: "success",
                        text: `${name} is now active.`
                    });
                    // To show the update with the specific operation intiated.
                    fetchData();
                }
                else {
                    Swal.fire({
                        title: "Unarchive Unsuccessful",
                        icon: "error",
                        text: "Something went wrong. Please try again later!"
                    });
                }
            })
    }


    //fetchData() function to get all the active/inactive courses.
    const fetchData = () => {
        // get all the courses from the database
        fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllProducts(data.map(product => {
                    return (
                        <tr key={product._id}>
                            <td>
                                {product._id}
                            </td>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.description}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                {product.stocks}
                            </td>
                            <td>
                                {product.isActive ? "Active" : "Inactive"}
                            </td>
                            <td>

                                {
                                    //conditional rendering on what button should be visible base on the status of the course
                                    (product.isActive)
                                        ?
                                        <Button variant="danger" size="small" onClick={() =>
                                            archive(product._id, product.name)
                                        }>
                                            Archive
                                        </Button>
                                        :
                                        <>
                                            <Button variant="success" size="small" className="mx-1" onClick={() =>
                                                unarchive(product._id, product.name)
                                            }>
                                                Unarchive
                                            </Button>


                                            <Button variant="secondary" size="sm" className="mx-1" onClick={() =>
                                                openEdit(product._id)
                                            }>
                                                Edit
                                            </Button>
                                        </>
                                }
                            </td>




                        </tr>
                    )
                }));
            });
    }


    // To fetch all courses in the first render of the page
    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        fetchOrders();
    }, [])


    // EDIT SPECIFIC PRODUCT

    // Updating a specific course in our database
    // edit a specific course
    const modifyProduct = (e) => {
        // Prevents page redirection via form submission
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stocks: stocks
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Product succesfully Updated",
                        icon: "success",
                        text: `${name} is now updated`
                    });

                    // To automatically add the update in the page
                    fetchData();
                    // Automatically closed the form
                    closeEdit();

                }
                else {
                    Swal.fire({
                        title: "Error!",
                        icon: "error",
                        text: `Something went wrong. Please try again later!`
                    });

                    closeEdit();
                }

            })

        // Clear input fields
        setName('');
        setDescription('');
        setPrice(0);
        setStocks(0);
    }

    // submit button for edit course
    useEffect(() => {

        // Validation to enable submit button when all fields are populated and set a price and slot greater than zero.
        if (name != "" && description != "" && price > 0 && stocks > 0) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, price, stocks]);
    // EDIT SPECIFIC



    //Rettrieve all orders

    //Rettrieve all orders

    return (


        (UserContext)
            ?
            <>
                {/* Header for the admin dashboard and functionality for create course and show enrollments */}
                <div className="mt-5 mb-5 p-5 text-center">
                    <h1>Admin Dashboard</h1>

                    {/* Adding a new course onClick={() => addproduct()
                    }*/}
                    <Button variant="success" className="mx-2" onClick={() => addnewproduct()}>
                        Add Product
                    </Button>

                    {/* To view all the user enrollments */}
                    <Button variant="secondary" className="mx-2" onClick={() => retrieveorders()}>
                        Retrieve Orders
                    </Button>





                    {/* For view all the courses in the database */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stocks</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts}
                        </tbody>
                    </Table>
                </div>


                {/*Modal for Editing a course*/}
                <div className="p-5 mt-5">
                    <Modal show={showEdit} fullscreen={true} onHide={closeEdit}>
                        <Form onSubmit={e => modifyProduct(e)}>

                            <Modal.Header closeButton>
                                <Modal.Title>Edit Product</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label>Enter New Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the new product name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="description" className="mb-3">
                                    <Form.Label>Enter New Product Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter the new product description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="price" className="mb-3">
                                    <Form.Label>Enter New Product Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter the new product price"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="stocks" className="mb-3">
                                    <Form.Label>Enter New Product Stocks</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter the new product stocks"
                                        value={stocks}
                                        onChange={e => setStocks(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Modal.Body>

                            <Modal.Footer>
                                {isActive
                                    ?
                                    <Button variant="primary" type="submit" id="submitBtn">
                                        Save
                                    </Button>
                                    :
                                    <Button variant="danger" type="submit" id="submitBtn" disabled>
                                        Save
                                    </Button>
                                }
                                <Button variant="secondary" onClick={closeEdit}>
                                    Close
                                </Button>
                            </Modal.Footer>

                        </Form>
                    </Modal>
                </div>
                {/*End of modal for editing a course*/}




                {/*Start of modal for RETRIEVE ALL PRODUCTS*/}
                <Modal show={showRetrieveOrders} fullscreen={true} onHide={closeRetrieveOrders}>
                    <Form onSubmit={e => modifyProduct(e)}>

                        <Modal.Header closeButton>
                            <Modal.Title>Retrieve All Orders</Modal.Title>
                        </Modal.Header>

                        {/*    <Modal.Body>

                        </Modal.Body> */}

                        {/* To view all the orders made by customers in the database */}
                        <span className="mt-5 mb-3 text-center">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Order/Transaction ID</th>
                                        <th>Customer's ID</th>
                                        <th>Date/Time</th>
                                        <th>Price</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders}
                                </tbody>
                            </Table>
                        </span>

                        <Modal.Footer>

                            <Button variant="secondary" onClick={closeRetrieveOrders}>
                                Close
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal>
                {/*End of of modal for RETRIEVE ALL PRODUCTS*/}
            </>
            :
            <navigate to="/home" />
    )


}