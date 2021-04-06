import React from 'react'
import {StyleSheet} from 'react-native'
import {
    Text,
    Header,
    Image,
    Icon,
    Title
} from "native-base"
import {connect} from "react-redux";
import propsTypes from 'prop-types'
import {SignOut} from "../Action/auth"

const CustomHeader = ({navigation,signOut,authState}) => {
    return (
        <>
            <Text>
                HELLO
            </Text>
        </>
    )
}
const mapStateToProps = (state) => {
authState:state.auth
}
const mapDispatchToProps = () => {
    signOut
}

CustomHeader.prototype = {
signOut= propsTypes.func.isRequired,
authState= propsTypes.func.isRequired

}


export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader)
