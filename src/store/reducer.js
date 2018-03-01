
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
        //todolist = getCookie();
        user = localStorage.getItem("logged");
        console.log(user);

    } else {
      localStorage.setItem("logged",'none');
    }
    console.log("grab acc");
    console.log(user);
    return user;
}

//currently id passed to save login is email stripped of info
//THIS MAY BE THE WRONG USERID!!!
function saveLogged(id){
  console.log('id');
  console.log(id);
  localStorage.setItem("logged",id);
}


const initialState = {
    userId: grabAcc(),
    testField: 'empty'
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOGIN':
            console.log("setting userId to:", action.val);
            localStorage.setItem("logged",action.val); //currently email stripped
            //localStorage.setItem("logged",action);
            return {
                userId: action.val};
            break;

        case 'LOGOUT':
            saveLogged('none');
            return {
                userId: 'none'
            }
            break;

    }
        if(action.type === 'login'){
            console.log('Login action detected');
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
