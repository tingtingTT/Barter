
const initialState = {
    userId: 'none',
    testField: 'empty'
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOGIN':
            console.log("setting userId to:", action.val);
            return {
                userId: action.val};
            break;

        case 'LOGOUT':
            return {
                userId: 'none'
            }
            break;

    }
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