function checkLocalStorage() {
    if((localStorage.getItem("logged") === null) || (localStorage.getItem("logged") === "")){
        return false;
    } else {
        return true;
    }
}

function grabAcc(){
    var user;
    if(checkLocalStorage()){
        user = localStorage.getItem("logged");
        console.log(user);

    } else {
        localStorage.setItem("logged",'none');
    }
    return user;
}

//currently id passed to save login is email stripped of info
function saveLogged(id){
    localStorage.setItem("logged",id);
}

const initialState = {
    userId: grabAcc(),
    testField: 'empty'
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("logged",action.val); 
            return {
                userId: action.val};

        case 'LOGOUT':
            saveLogged('none');
            return {
                userId: 'none'
            }
        default:
            break;    

    }
        if(action.type === 'login'){
            return {
                userId: action.userId
            }
        }
        else{
            //return as default
            return initialState
        }
}

export default reducer;
