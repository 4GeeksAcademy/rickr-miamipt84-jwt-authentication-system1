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
    sessionStorage.setItem('token', data.access_token);
    dispatch({
        type: 'fetchedToken',
        payload: {
            token: data.access_token,
            isLoginSuccessful: true,
        }
    })
    return data;
}


export const signUp = async(email, password, dispatch) => {

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

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, options);

    // handle any non-200 error codes
    if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        return {
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }
    }

    // if the response is type 200
    const data = await response.json();
    console.log(data.message)
    dispatch({
        type: 'successfulSignUp',
        payload: {
            'message': data.message,
            'isSignUpSuccessful': true,
        }
    })
    return data;

}

export const logout = (dispatch) => {
    // DONE - remove the token from sessionStorage
    // DONE - remove the token from the store
    sessionStorage.removeItem('token');
    dispatch({
        type: 'loggedOut',
        payload: {
            token: null,
            isLoginSuccessful: false,
            message: '',
            isLoggedIn: false,
        }
    });
}

// DONE - create a logout button that clears the token from the store and the sessionStorage
// DONE - logout needs to dispatch to the store to remove the token and also handle clearing the sessionstorage item