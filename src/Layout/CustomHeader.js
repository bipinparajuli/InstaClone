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
import propTypes from 'prop-types'
import {signOut} from "../Action/auth"

const CustomHeader = ({navigation,signOut,authState}) => {
// console.log(signOut)
    return (
        <>
            <Header
            style={{backgroundColor:"#8D3DAF"}}
            >
<Body>
<Title>INSTAGRAM</Title>    
</Body>
<Right>

    {authState.isAuthenticated &&(
        <>
<Button
transparent
iconLeft
onPress={()=>navigation.navigate("Addpost")}

>
<Text style={{color:"#EDBF69"}}>Add Post</Text>
</Button>

<Button
transparent
iconLeft
onPress={()=>navigation.navigate("Message")}

>
<Text style={{color:"#EDBF69"}}>Chat</Text>
</Button>

<Button
onPress={()=> console.log("Signout"),signOut()}
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

CustomHeader.prototypes = {
    signOut:propTypes.func.isRequired,
authState: propTypes.object.isRequired

}


export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader)
