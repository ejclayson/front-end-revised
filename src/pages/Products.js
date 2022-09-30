import { useEffect, useState, useContext } from "react";

import { Navigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import UserContext from "../UserContext";

export default function Products() {

    const { user } = useContext(UserContext);

    // couses state that will be used to store the products retrieve in the database.

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        // Will retrieve all the active products
        fetch(`${process.env.REACT_APP_API_URL}/products/active`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data.map(product => {
                    return (
                        <ProductCard key={product._id} productProp={product} />
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
                    <h1 className="text-center">Products</h1>
                    <div className="d-flex flex-row">
                    {Products}
                    </div>
                </div>
            </>
    )
}
