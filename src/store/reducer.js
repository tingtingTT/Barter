
const initialState = {
    userId: 'not logged in'
}

const reducer = (state = initialState, action) =>{
    if(action.type === 'login'){
        console.log('Login action detected')
       return {

           userId: action.userId
       }
    }else{
        //return as default
        return initialState
    }
}

export default reducer;