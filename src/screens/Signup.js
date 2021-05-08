import React,{useState} from 'react'
import {StyleSheet} from "react-native"
import {
Text,
Image,
Container,
Content,
Thumbnail,


} from 'native-base'

import storage from '@react-native-firebase/storage'
import Imagepicker from 'react-native-image-picker'
import ProgressBar from 'react-native-progress/Bar'

import {options} from '../Utils/options'

//redux
import {connect} from 'react-redux'
import propsTypes from 'prop-types'
import {SignUp} from '../Action/auth'

const Signup = ({SignUp}) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [country, setcountry] = useState("")
    const [bio, setbio] = useState("")
    const [instausername, setinstausername] = useState("")
    const [image, setimage] = useState("https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png")
    const [imageUploading, setimageUploading] = useState(false)
    const [imageloadingstatus, setimageloadingstatus] = useState(null)

// SignUp()

return (
        <>
           <Text>Hello Signup</Text> 
        </>
    )
}






export default  (Signup)
