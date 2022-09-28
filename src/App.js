import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UserProvider } from "./UserContext";
import AppNavbar from "./components/AppNavbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import Retrieve from "./pages/Retrieve";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";



import './App.css';


function App() {




  // Create a "User" state and an "unsetUser" function that will be used in different pages/component within the application

  // Global state hooks for the user information for validating if a user is logged in

  const [user, setUser] = useState({
    //email: localStorage.getItem("electronicMail")
    id: null,
    isAdmin: null
  });

  // Function for clearing localStorage

  // Allow us to clear the information in the localStorage

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);


  useEffect(() => {


    fetch(`${process.env.REACT_APP_API_URL}/users/viewDetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        // Set the user states value if the token already exists in the local storage
        if (data._id !== undefined) {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        }
        // set back to the initial state of the user if no token found in the local storage
        else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      })


  }, []);




  return (

    <div className="page-container">

      <div className="content-wrap">

        {/*  // we store information in the context by providing the information using the "UserProvider" component and passing the information via the "value" prop
    // All the information inside the value prop will be accessible to pages/components wrapped around with the User Provider */}
        <UserProvider value={{
          user, setUser, unsetUser
        }}>
          {/* Router component is used to wrapped around all components which will have access to the routing system */}
          <Router>
            <AppNavbar />



            {/* Routes holds all our Route components. */}
            <Routes>
              {/* 
                Route assign an endpoint and display the appropriate page component for that endpoint.

                -exact and path props to assign the endpoint and the page should be only accessed on the specific endpoint

                -"element" props assigns page components to the displayed endpoint.
               */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/admin" element={<AdminDashboard />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/products/:productId" element={<ProductView />} />
              {/* <Route exact path="/orders/:orderId" element={<Orders />} /> */}
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/addproduct" element={<AddProduct />} />
              <Route exact path="/retrieve" element={<Retrieve />} />

              {/*  <Route exact path="*" element={<Error />} /> */}

              {/* <Route exact path="/courses" element={<Courses />} /> */}
            </Routes>

          </Router>

        </UserProvider>

      </div>
      <Footer />
    </div>
  );
}

export default App;
