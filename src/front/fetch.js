// create the login function
export const login = async(email, password, dispatch) => {
    
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, options);

    // handle any non-200 error codes
    if (!response.ok) {
        const data = await response.json();
        console.log(data.msg);
        return {
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }
    }

    // if the response is type 200
    const data = await response.json();
    console.log(data.access_token)
    // add sessionStorage
    // add the dispatch to save token and update isLoginSuccessful
    return data;
}


// 1. finish login function to save the token to the store, and update isLoginSuccessful as True to the store as well
// 2. create a useEffect in /Login.jsx that will take the navigate the user to the /private Route
// 3. create a /Signup page