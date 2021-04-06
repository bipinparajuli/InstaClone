import {IS_AUTHENTICATED, IS_USER} from './../Action/action.type';

const initialState = {
    loading:true,
    user:null,
    authenticated:false
}

export default (state= initialState,action)=>{
switch (action) {
    case IS_USER:
return {...state,user:action.payload,loading:false}        

case IS_AUTHENTICATED:
return {...state,authenticated:action.payload}        

    default:
        return state        

}

}