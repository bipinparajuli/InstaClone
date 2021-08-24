
import "react-native-gesture-handler"
import React,{useEffect} from 'react'
import AddPost from './screens/Addpost'
import Main from './screens/LandingPage'
import Landing from './screens/SplashScreen'

import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import CustomHeader from  './Layout/CustomHeader'
import {IS_AUTHENTICATED,SET_USER} from './Action/action.type'
import {requestPermission} from './Utils/askpermission'
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import {connect,useDispatch} from 'react-redux'

import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

import EmptyContainer from '../src/components/emptyContainer'


const Stack = createStackNavigator()


const App = ({authState}) => {
  
  const dispatch = useDispatch()


  const onAuthStateChanged =(user)=>{
console.log(user);
    if(user)
    {
      dispatch({
        type:IS_AUTHENTICATED,
        payload:true
      })
      console.log(user._user.uid)
    database()
    .ref(`/users/${user._user.uid}`)
    .on("value",(snapshot)=>{
      console.log("USER_DETAILS",snapshot.val())
    dispatch({
          type:SET_USER,
          payload:snapshot.val()
  })
})      
}
 else{
  dispatch({
    type:IS_AUTHENTICATED,
    payload:false
})
 }
  }
  
  useEffect(()=>{

    requestPermission()

const subscriber =auth().onAuthStateChanged(onAuthStateChanged)
return subscriber

},[])

if(authState.loading)
{
  return <EmptyContainer />
}
  
  return (
    <>
<NavigationContainer>
  <Stack.Navigator
  screenOptions={
    {
      header:(props)=><CustomHeader {...props} />
    }
  }
  >
{authState.isAuthenticated ? (
  <>
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="Addpost" component={AddPost} />
</>

):(
<>
<Stack.Screen name="Landing" component={Landing} />
<Stack.Screen name="Signin" component={Signin} />
<Stack.Screen name="Signup" component={Signup} />
</>

)}
  </Stack.Navigator>
</NavigationContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  authState:state.auth
})

export default connect(mapStateToProps)( App)
