import {SET_POST, ERROR_POST} from './../Action/action.type';

const initialState = {
    loading:true,
    posts:null,
    error:false
}

export default (state= initialState,action)=>{
switch (action.type) {
    case SET_POST:
return {
    ...state,
    posts:action.payload,
    error:false,
    loading:false
}        

case ERROR_POST:
return {
    ...state,
    error:true
}        

    default:
        return state        

}

}