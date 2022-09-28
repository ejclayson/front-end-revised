import { useState, useEffect } from "react";

import { Card, Button } from 'react-bootstrap';
/* import { Link } from "react-router-dom"; */

// destructure the "courseProp" from the prop parameter
// CourseCard(prop)
export default function OrderCard({ orderProp }) {

    // console.log(props.courseProp.name);
    // console.log(typeof props);
    // console.log(courseProp);

    // Scenario: Keep track the number of enrollees of each course.

    // Destructure the course properties into their own variables

    const { _id, totalAmount, purchasedOn, products } = orderProp;
    /*  const { productItemId, productItemName, productItemDescription, productItemPrice, productItemStocks } = productProp; */
    // Syntax:
    // const [stateName, setStateName] = useState(initialStateValue);
    // Using the state hook, it returns an array with the following elements:
    // first element contains the the current inital State value.
    // second element is a setter function that is used to change the value of the first element.

    // const [count, setCount] = useState(0);
    // console.log(useState(10));

    // Use state hook for getting the seats for this course.
    // const [seats, setSeats] = useState(30);

    // Function that keeps track of the enrollees for a course.

    /*
        We will refactor the "enroll" function using the "useEffect" hooks to disable the enroll button when the seats reach zero.
    */
    // Use the disabled state to disable the enroll button.
    // const [disabled, setDisabled] = useState(false);

    // Syntax:
    //useEffect(function, [dependencyArray])

    // function unEnroll(){
    // 	setCount(count - 1);
    // }

    // function enroll(){
    // 	// Activity solution
    // 	// if(seats > 0){
    // 	// 			// 0 + 1
    // 	// 			// setCount(1)
    // 	// 	setCount(count + 1);
    // 	// 	console.log(`Enrollees: ${count}`);
    // 	// 	setSeats(seats - 1);
    // 	// 	console.log(`Seats: ${seats}`);
    // 	// }
    // 	// else{
    // 	// 	alert("No more seats available");
    // 	// }

    // 	setCount(count + 1);
    // 	console.log(`Enrollees: ${count}`);
    // 	setSeats(seats - 1);
    // 	console.log(`Seats: ${seats}`);
    // }

    // useEffect(()=>{
    // 	if(seats <= 0){
    // 		setDisabled(true);
    // 		alert("No more seats available.");
    // 	}
    // }, [seats]);

    return (
        <Card className="my-3 text-center">
            <Card.Body>
                <Card.Subtitle>
                    Product Name:
                </Card.Subtitle>
                <Card.Text>
                    {products[0].productName}
                </Card.Text>
                <Card.Subtitle>
                    Quantity Ordered:
                </Card.Subtitle>
                <Card.Text>
                    {products[0].quantity}
                </Card.Text>
                <Card.Subtitle>
                    Total Amount:
                </Card.Subtitle>
                <Card.Title>
                    {totalAmount}
                </Card.Title>
                <Card.Subtitle>
                    Date/Time of Purchase:
                </Card.Subtitle>
                <Card.Text>
                    {purchasedOn}
                </Card.Text>

                {/*  <Card.Text>
                    {products} available
                </Card.Text> */}
                {/*  <Button as={Link} to={`${process.env.REACT_APP_API_URL}/products/${id}`} variant="primary">Details</Button> */}
                {/* <Button variant="primary">Details</Button> */}
                {/* <Button as={Link} to={`/productitems/${productItemId}`} variant="primary">Details</Button> */}
            </Card.Body>
        </Card>
    )
}
