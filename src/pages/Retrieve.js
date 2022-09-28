import { useContext, useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/* import axios from 'axios';

import BootstrapTable from "react-bootstrap-table2-paginator"

import paginationFactory from "react-bootstrap-table2-paginator"; */



//import RetrieveCard from "../components/RetrieveCard";
import UserContext from "../UserContext";



//addnewproduct
//const Navigate = useNavigate();

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


export default function Retrieve() {
    const [allOrders, setAllOrders] = useState([]);

    //const [allProducts, setAllProducts] = useState([]);

    const { user } = useContext(UserContext);

    // couses state that will be used to store the products retrieve in the database.

    const [Orders, setOrders] = useState([]);

    //fetchData() function to get all the active/inactive courses.
    const fetchData = () => {
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


    // To fetch all courses in the first render of the page
    useEffect(() => {
        fetchData();
    }, [])


    /*   useEffect(() => {
          fetchOrders();
      }, []) */



    return (

        (UserContext)
            ?
            <>
                {/* Header for the admin dashboard and functionality for create course and show enrollments */}
                <div className="mt-5 mb-5 p-5 text-center">
                    <h1>All Orders</h1>

                    {/* Adding a new course onClick={() => addproduct()
                    }*/}
                    {/*  <Button variant="success" className="mx-2" onClick={() => addnewproduct()}>
                        Add Product
                    </Button> */}

                    {/* To view all the user enrollments */}
                    {/*   <Button variant="secondary" className="mx-2" onClick={() => retrieveorders()}>
                        Retrieve All
                    </Button> */}





                    {/* For view all the courses in the database */}
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
                </div>
            </>
            :
            <navigate to="/home" />

    )

}