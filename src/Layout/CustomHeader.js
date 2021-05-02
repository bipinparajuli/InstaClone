import React from 'react'
import {StyleSheet} from 'react-native'
import {
    Text,
    Header,
    Image,
    Icon,
    Title,
    Body,
    Right,
    Button
} from "native-base"
import {connect} from "react-redux";
import propsTypes from 'prop-types'
import {signOut} from "../Action/auth"

const CustomHeader = ({navigation,signOut,authState}) => {
// console.log(signOut)
    return (
        <>
            <Header
            style={{backgroundColor:"#03203C"}}
            >
<Body>
<Title>Social App</Title>    
</Body>
<Right>
    {authState.isAuthenticated &&(
        <>
<Button
transparent
iconLeft
onPress={()=>navigation.navigate("AddPost")}

>
<Text style={{color:"#EDBF69"}}>Add Post</Text>
</Button>

<Button
onPress={()=> signOut()}
transparent 

>
    <Icon name="log-out-outline" style={{color:"red"}}/>
</Button>
        </>
    )}
</Right>
            </Header>
        </>
    )
}
const mapStateToProps = (state) => ({
    authState:state.auth
})
const mapDispatchToProps = () => ({
    signOut 
})

CustomHeader.propsTypes = {
    signOut= propsTypes.func.isRequired,
authState= propsTypes.func.isRequired

}


export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader)
