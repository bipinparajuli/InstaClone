import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import Snackbar from 'react-native-snackbar'

export const signUp = (data) => async (dispatch) => {
console.log(data);

const {email,password,name,instaUserName,bio,image,country} = data

    auth().createUserWithEmailAndPassword(email,password)
    .then((data)=>
        {
            console.log(data);
            database()
            .ref("/users/"+data.user.uid)
            .set({
                name,
                instaUserName,
                country,
                bio,
                image,
                uid:data.user.uid
            })
            .then(()=>console.log("Data saved successfully"))
                Snackbar.show({
                    text:"User data set successfully",
                    textColor:"white",
                    backgroundColor:"green"
                })
            })
        
        
    .catch((error)=>{
        Snackbar.show({
            text:"SignUp Failed",
            textColor:"white",
            backgroundColor:"red"
        })
    })

}

export const signIn = (data) => async (dispatch) => {

    const {email,password} = data
    console.log(typeof(email));

    auth().signInWithEmailAndPassword(email,password)
    .then((data)=> {
        console.log(data);
        Snackbar.show({
            text:"Signin successfully",
            textColor:"white",
            backgroundColor:"green"
        })
    })
    .catch(error=> {
        console.log(error)
        Snackbar.show({
            text:"Failed to signin",
            textColor:"white",
            backgroundColor:"red"
        })
    })
}

export const signOut = () => async (dispatch) => {
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