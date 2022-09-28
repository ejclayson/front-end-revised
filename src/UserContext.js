//We will use React's Context API to give the login user object to have "global" scope within our application

import React from "react";

// Create a Context Object
// A context object with object data type that can be used to store information that can be share to other components within the app
const UserContext = React.createContext();

// The "Provider" component allows other components to consume/use the context object and supply the necessary information needed in the context object
export const UserProvider = UserContext.Provider;



export default UserContext;
