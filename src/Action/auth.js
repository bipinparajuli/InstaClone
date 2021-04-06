import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import Snackbar from 'react-native-snackbar'

export const SignUp = (data) => async (dispatch) => {
console.log(data);

const {email,password,name,instaName,bio,address,image} = data

    auth().createUserWithEmailAndPassword(email,password)
    .then(data=>
        {
            console.log(data);
            database()
            .ref("/user"+data.user.uid)
            .set({
                name,
                instaName,
                address,
                bio,
                image
            })
            .then(()=>{
                Snackbar.show({
                    text:"User data set successfully",
                    textColor:"white",
                    backgroundColor:"green"
                })
            })
        }
        )
    .catch((error)=>{
        Snackbar.show({
            text:"SignUp Failed",
            textColor:"white",
            backgroundColor:"red"
        })
    })

}

export const SignIn = (data) => async (dispatch) => {

    console.log(data);
    const {emial,password} = data

    auth().signInWithEmailAndPassword({email,password})
    .then(data=> {
        Snackbar.show({
            text:"Signin successfully",
            textColor:"white",
            backgroundColor:"green"
        })
    })
    .catch(error=> {
        Snackbar.show({
            text:"Failed to signin",
            textColor:"white",
            backgroundColor:"red"
        })
    })
}

export const SignOut = (data) => async (dispatch) => {
 auth().signOut().then(()=>{
    Snackbar.show({
        text:"Signout successfully",
        textColor:"white",
        backgroundColor:"green"
    })
 })
 .catch(error=>{
    Snackbar.show({
        text:"Failed to signout",
        textColor:"white",
        backgroundColor:"red"
    })
 })   
}