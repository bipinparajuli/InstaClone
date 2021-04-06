import React from 'react'
import {Text,StyleSheet} from "react-native"
import {Container,Spinner} from 'native-base'

const Addpost = () => {
    return (
        <>
<Container style={style.emptyContainer}>
    <Spinner />
</Container>
        </>
    )
}

export default Addpost

const style = StyleSheet.create({
    emptyContainer:{
        flex:1,
        backgroundColor:"#207398",
        justifyContent:'center',
        alignItems:'center'
    }
})