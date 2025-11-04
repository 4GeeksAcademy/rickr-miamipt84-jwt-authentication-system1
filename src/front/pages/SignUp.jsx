import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { signUp } from "../fetch";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleLoginClick = () => {
        signUp(email, password, dispatch);
    }

    // create useEffect to send the new user to the /login page when
    // signup is successful
    useEffect(() => {
        if (store.isSignUpSuccessful) {
            navigate('/login');
        }
    }, [store.isSignUpSuccessful])

    return (
        <>
            <div className="signup-page text-center mt-5">
                {
                    <>
                        <h1>SignUp</h1>
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
                            >Sign Up
                            </button>
                        </div>
                    </>
                }
            </div>
        </>
    );
}
