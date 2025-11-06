export const initialStore=()=>{
  return{
    token: null,
    isLoginSuccessful: false,
    message: '',
    isSignUpSuccessful: false,
    isLoggedIn: false,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'fetchedToken':
    {
      const { token, isLoginSuccessful } = action.payload;
      return {
        ...store,
        token: token,
        isLoginSuccessful: isLoginSuccessful,
        isLoggedIn: true,
      }
    }
    case 'successfulSignUp':
    {
      const { message, isSignUpSuccessful } = action.payload;
      return {
        ...store,
        message: message,
        isSignUpSuccessful: isSignUpSuccessful,
      }
    }
    case 'loggedOut':
    {
      const { token, isLoginSuccessful, message, isLoggedIn } = action.payload;
      return {
        ...store,
        token: token,
        isLoginSuccessful: isLoginSuccessful,
        message: message,
        isLoggedIn: isLoggedIn,
      }
    }
    default:
      throw Error('Unknown action.');
  }    
}
