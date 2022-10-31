import { useState, useEffect, useContext } from "react";

import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";



import Swal from "sweetalert2";

import UserContext from "../UserContext";

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || "[]");

let fromfield = [];

export default function ProductView() {



    /* ADD TO CART REQUIREMENTS */



    const [cart, setCart] = useState(cartFromLocalStorage);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const { user } = useContext(UserContext);

    // "useParams" hooks allows us to retrieve the courseId passed via the URL.

    const { productId } = useParams();

    const navigate = useNavigate();




    // Create state hooks to capture the information of a specific course and display it in our application.
    const [name, setName] = useState('');
    
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [image, setImage] = useState(0);


    const [quantity, setQuantity] = useState('');




    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setPrice(data.price);
                setStocks(data.stocks);
                setImage(data.image);
            });

    }, [productId])

    


    /* ADDCART FUNCTION START */
    const addcart = (productId) => {
        if (quantity < 1) {
            alert("Quantity can't be lower than 1!");
        }
        else if (fromfield.length === 0){
            fromfield.push({
                cartId: productId,
                cartName: name,
                cartQuantity: quantity,
                cartImage: image,
                cartPrice: price,
                cartSubtotal: quantity * price,
            });
            localStorage.setItem(`cart`, JSON.stringify([...fromfield]));
            alert(quantity + " item/s added to cart!");
            navigate("/products");
        }
        else {
            let fromfieldend = fromfield.length;
                for (let i = 0 ; i < fromfieldend ; i++){
                    if(fromfield[i].cartId === productId){
                        fromfield[i].cartId = productId;
                        fromfield[i].cartName = name;
                        fromfield[i].cartQuantity = parseInt(fromfield[i].cartQuantity) + parseInt(quantity);
                        fromfield[i].cartImage = image;
                        fromfield[i].cartSubtotal = fromfield[i].cartQuantity * price;
                        localStorage.setItem(`cart`, JSON.stringify([fromfield[i]]));
                        alert(quantity + " item/s added to cart!");
                        navigate("/products");
                    }
                    else {
                        //alert("cart full")
                        fromfield.push({
                            cartId: productId,
                            cartName: name,
                            cartQuantity: quantity,
                            cartImage: image,
                            cartPrice: price,
                            cartSubtotal: quantity * price,
                        });
                        alert(quantity + " item/s added to cart!");
                        localStorage.setItem(`cart`, JSON.stringify([...fromfield]));
                        navigate("/products");
                    }
                }
            } 
    }



    /* ADDCART FUNCTION END */

    const checkout = (productId) => {


        if(quantity<1){
            alert("Quantity can't be lower than 1!");
        }
        else{
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
    }


 
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
                                                    min="0"
                                                    max={stocks}
                                                    value={quantity}
                                                    onChange={e => setQuantity(e.target.value)}
                                                    required
                                                />
                                            </Form>
                                        </Card.Text>
                                        
                                        <Card.Text>
                                        {/*  <Button className="btn btn-dark ms-2" variant="primary" onClick={quantityfiertwo}>-</Button> */}
                                        <Button variant="primary" size="lg" onClick={() => checkout(productId)}>Checkout</Button>
                                        </Card.Text>

                                        <Card.Text>
                                        {/* <Button onClick={() => handleClick(productId)}>Add to Cart</Button> */}
                                            {/* <Button variant="primary" size="lg" onClick={() => addItem(productId)}>Add to Cart</Button>
                                        </Card.Text> */}
                                            <Button variant="primary" size="lg" onClick={() => addcart(productId)}>Add to Cart</Button>
                                        </Card.Text>
                                    </>
                                    :
                                    <Button as={Link} to="/login" variant="success" size="lg">Login to Checkout Item</Button>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

