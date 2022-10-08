import { useState, useEffect, useContext } from "react";

import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from "../UserContext";

export default function ProductView() {

    const { user } = useContext(UserContext);

    // "useParams" hooks allows us to retrieve the courseId passed via the URL.

    const { productId } = useParams();

    const navigate = useNavigate();



    // Create state hooks to capture the information of a specific course and display it in our application.
    const [name, setName] = useState('');
    /* const [description, setDescription] = useState(''); */
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [image, setImage] = useState(0);


    const [quantity, setQuantity] = useState('');


    // const [seats, setSeats] = useState(30)
    //const [count, setCount] = useState(0);
    //const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        //console.log(productId);

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {


                setName(data.name);
                /*  setDescription(data.description); */
                setPrice(data.price);
                setStocks(data.stocks);
                setImage(data.image);

            });

    }, [productId])

    /* console.log(productId);
    console.log(productId); */
    const checkout = (productId) => {

        fetch(`${process.env.REACT_APP_API_URL}/orders/checkout/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                totalAmount: price * quantity,
                products:
                    [
                        {
                            productId: productId,
                            productName: name,
                            quantity: quantity,
                            productImage: image
                        }
                    ]
            })
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Successfully Checkout Item",
                        icon: "success",
                        text: "You have successfully checkout this item."
                    });

                    navigate("/products");
                }
                else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Please try again."
                    });
                }

            });

    }


    /* 
        function quantityfier() {
             if(stocks<=0)
            {
                 alert("No more stocks!"); 
            }
            else
            {
                setQuantity(quantity+1);
            }
            
    
        }
    
    
    
        function quantityfiertwo() {
            if ( quantity <= 0) {
                alert("Quantity can't be lower than 1!");
            }
            else {
                setQuantity(parseInt(quantity)  + 1);
            }
    
        }  */

    /*   useEffect(() => {
         
  
          if (quantity <= 0) {
              //setDisabled(true);
              alert("Quantity can't be lower than 1.");
          }
          else if(quantity >= stocks)
          {
              alert("No more stocks.");
          }
      }, [quantity]) */


    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Img variant="top" src={image} className="imageholder" />
                            <Card.Title>{name}</Card.Title>
                            {/* <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text> */}
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price * quantity}</Card.Text>
                            <Card.Subtitle>Stocks left:</Card.Subtitle>
                            <Card.Text>{(stocks - quantity)}</Card.Text>
                            {
                                (user.id !== null)
                                    ?
                                    <>
                                        <Card.Subtitle>Quantity:</Card.Subtitle>

                                        {/* <Button className="btn btn-dark ms-2" variant="primary" onClick={quantityfier}>+</Button> */}

                                        <Card.Text>
                                            <Form>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Supply quantity here"
                                                    min="1"
                                                    max={stocks}
                                                    value={quantity}
                                                    onChange={e => setQuantity(e.target.value)}
                                                    required
                                                />
                                            </Form>
                                        </Card.Text>
                                        {/*  <Button className="btn btn-dark ms-2" variant="primary" onClick={quantityfiertwo}>-</Button> */}
                                        <Button variant="primary" size="lg" onClick={() => checkout(productId)}>Checkout</Button>

                                    </>
                                    :
                                    <Button as={Link} to="/login" variant="success" size="lg">Login to Checkout Item</Button>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

