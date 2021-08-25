import database from '@react-native-firebase/database'
import {SET_POST,ERROR_POST} from './action.type'

export const getPosts = () => async (dispatch) => {

    try{
database()
.ref('/posts')
.on("value",(snapshot)=>{

    console.log('USER DATA: ', snapshot.val())

    if(snapshot.val())
    {
        dispatch({
            type:SET_POST,
            payload:Object.values(snapshot.val()) 
        })
    }
    else{
        console.log("CAN'T FOUND ");
        dispatch({
            type:SET_POST,
            payload:[] 
        })
    }


})
    }
    catch{
        dispatch({
            type:ERROR_POST,
        })
    }
    
}