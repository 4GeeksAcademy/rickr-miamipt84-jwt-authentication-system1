import useGlobalReducer from "../hooks/useGlobalReducer"

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();

    // add a useEffect to fetch private user information
    // when the user is successfully logged in
    // useEffect()

    return (
        <>
            {
                (store.isLoggedIn)
                ?
                <div className="text-center mt-5">
                    Hello from the Private page!
                </div>
                :
                <div className="text-center mt-5">
                    You are not logged in. Please log in!
                </div>
            }
        </>
        
    );
};
