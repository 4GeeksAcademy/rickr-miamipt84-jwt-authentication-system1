export const initialStore=()=>{
  return{
    token: null,
    isLoginSuccessful: false,
    message: '',
    isSignUpSuccessful: false,
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
    default:
      throw Error('Unknown action.');
  }    
}
