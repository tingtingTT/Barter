const redux = require('redux'); // redux from 'redux';
const createStore = redux.createStore;

//set a default value for the store
const initialState = {
    counter: 0,
    userid: 'Not Logged in'
}

const rootReducer = (state = initialState, action) =>{
    if(action.type === 'LOGIN'){
        return {
            ...state,
            userid: action.value,
        }
    }
    return state;
}

const store = createStore(rootReducer);
console.log(store.getState().userid);

// Store
store.subscribe(()=>{
    console.log('[Subscription]', store.getState());
})

//Dispatch
store.dispatch({
    type: 'LOGIN',
    value: 'USER1'
});

console.log(store.getState().userid);

// Subscription automatically receive updates
