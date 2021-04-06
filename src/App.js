import React,{useEffect} from 'react'
import {Text} from 'react-native'
import AddPost from './screens/Addpost'
import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import CustomHeader from  './Layout/CustomHeader'
import {IS_USER,IS_AUTHENTICATED,SET_USER} from './Action/action.type'
import {requestPermission} from './Utils/askpermission'
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import {connect,useDispatch} from 'react-redux'
import dababase from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'


const App = ({authState}) => {
  const dispatch = useDispatch()

  const Stack = createStackNavigator()

  const onAuthStateChange =(user)=>{

    if(user)
    {
      dispatch({
        type:IS_AUTHENTICATED,
        payload:true
      })
      console.log(user._user.id)
    dababase()
    .ref(`/user/${user._user.id}`)
    .on("value",snapshot=>{
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
const subscriber =auth().onAuthStateChanged(onAuthStateChange)
return subscriber

},[])

  
  return (
    <>
<NavigationContainer>
  <Stack.Navigator
  screenOptions={

    {header:(props)=><CustomHeader {...props} />}
  }
  >
{authState.authenticated ? (
  <>
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="Addpost" component={AddPost} />
</>

):(
<>
<Stack.Screen name="Signin" component={Signin} />
<Stack.Screen name="Signup" component={Signup} />
</>

)}
  </Stack.Navigator>
</NavigationContainer>
    </>
  )
}

const mapStateToProps = (state) => {
  authState:state.auth
}

export default connect(mapStateToProps)( App)
