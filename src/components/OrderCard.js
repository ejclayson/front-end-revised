import { useState, useEffect } from "react";

import { Card, Button } from 'react-bootstrap';
/* import "./OrderCard.css"; */
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
    const [isActive, setIsActive] = useState(false);
    
    const dateToTime = date => date.toLocaleString('tl-PH', {
        hour: 'numeric',
        minute: 'numeric'
    });

    const dateString = purchasedOn;
    const userOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(dateString);
    const utcDate = new Date(localDate.getTime() + userOffset);



    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();



    const d = new Date();
    const localTime = d.getTime();


    const localOffset = d.getTimezoneOffset() * 60000;

    
    
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
<>
            
            
            <div className="accordion">   
                <div className="accordion-item">
                    
                    <div className="accordion-title bg-secondary text-white"
                        onClick={() => setIsActive(!isActive)}
                    >
                        <div> Order # :  {products[0]._id}</div>
                        <div>{isActive ? '-' : '+'}</div>
                    </div>
                    
            
                    
                       
                    
                    
                    {isActive &&  <div className="accordion-content">
                        <div className="text-center"><img src={products[0].productImage} className="w-25"></img></div>
                                Product Name:
                                <ul>
                                <li>
                                        {products[0].productName}
                                </li>
                                    
                                </ul>
                                Quantity Ordered:
                                <ul>
                                    <li>
                                        {products[0].quantity}
                                    </li>

                                </ul>
                                Total Amount:
                                <ul>
                                    <li>
                                        {totalAmount}
                                    </li>

                                </ul>

                                Date & Time Purchased:
                                <ul>
                                    <li>
                               {/*  {`${dateToTime(utcDate)} (${dateToTime(localDate)})`} */}
                                {purchasedOn.toString()}
                                    </li>

                                </ul>
                        </div>
                        }
                    </div>
                    
                </div>   
            
      
            
        </>
    )
}
