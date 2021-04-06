import {SET_POST, ERROR_POST} from './../Action/action.type';

const initialState = {
    loading:true,
    post:null,
    error:false
}

export default (state= initialState,action)=>{
switch (action) {
    case SET_POST:
return {...state,
    post:action.payload,
    error:false,
    loading:false

}        

case ERROR_POST:
return {...state,error:action.payload,err:false}        

    default:
        return state        

}

}