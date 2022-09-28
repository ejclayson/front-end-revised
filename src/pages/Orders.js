import { useEffect, useState, useContext } from "react";

import { Navigate } from "react-router-dom";

import OrderCard from "../components/OrderCard";
import UserContext from "../UserContext";

export default function Orders() {

    const { user } = useContext(UserContext);

    // couses state that will be used to store the products retrieve in the database.

    const [Orders, setOrders] = useState([]);

    useEffect(() => {
        // Will retrieve all the active products
        fetch(`${process.env.REACT_APP_API_URL}/orders/myOrders`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrders(data.map(order => {
                    return (
                        <OrderCard key={order._id} orderProp={order} />
                    );
                }));
            })
    }, []);



    return (
        (user.isAdmin)
            ?
            <Navigate to="/admin" />
            :
            <>
                <div className="p-5 mt-5 mb-5">
                    <h1 className="text-center">Order History</h1>
                    {Orders}
                </div>
            </>
    )
}
