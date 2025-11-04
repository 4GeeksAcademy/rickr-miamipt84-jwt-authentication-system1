export const initialStore=()=>{
  return{
    token: null,
    isLoginSuccessful: false,
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
    default:
      throw Error('Unknown action.');
  }    
}
