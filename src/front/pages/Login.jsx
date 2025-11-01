// This page will accept a user's email and password
// Create a function which will make a POST request with users info in the request body
// SUCCESS means:
// 1. The user is already registered and in the database
// 2. Response will include a token from the backend that will be placed in the store and SessionStorage
// 3. Redirect user to /private page

// FAILURE means:
// 1. Response will return a msg of "Bad username or password"
// 2. msg will be displayed on /login page telling the user that the email/password combo does not match

// TODOS:
// DONE - import necessary hooks
// DONE - create our states, navigation, store and dispatch
// DONE - need to create out login jsx template
// DONE - create logic to fetch user credentials to get a token
//   DONE - create a fetch.js file
//      DONE - will have a login function
// create the logic for storeReducer to update the token and isSuccessfulLogin keys
// complete the useEffect to allow the user to the private page

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../fetch";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    const handleLoginClick = () => {
        login(email, password, dispatch)
    }

    // create useEffect to send the user to the /private route when
    // login is successful and a token is received
    // useEffect()

    return (
        <>
            <div className="login-page text-center mt-5">
                {
                    // create a ternary for the following:
                    // check the store for a valid token
                    // if there is a token, welcome the user
                    // otherwise, direct the user to the /login
                    (store.token && store.token !== undefined && store.token !== "")
                        ?
                        <>
                            <h1>Hello! You are logged in.</h1>
                            <div>{store.token}</div>
                        </>
                        :
                        <>
                            <h1>Login</h1>
                            <div>
                                <input 
                                    type="text"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    onClick={handleLoginClick}
                                >Login
                                </button>
                            </div>
                        </>
                }
            </div>
        </>
    );
}
