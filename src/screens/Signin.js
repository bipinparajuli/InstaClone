import React,{useState} from 'react'
import {TouchableOpacity,StyleSheet,ScrollView,Image} from "react-native"

import 
{
Container,
Form,
Item,
Input,
Text,
Button,
H3
}
from "native-base"

import welcome from '../Assets/welcom.png'

import {connect} from 'react-redux'
import {signIn} from "../Action/auth"
import propTypes from "prop-types"
import Snakebar from 'react-native-snackbar';


const Signin = ({navigation,signIn}) => {
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const doSignIn = () => {
   if(email == "" || password == "")
   {
    return Snakebar.show({
      text:"Please add all filed",
      textColor:"white",
      backgroundColor:"red"
    })
   }

      signIn({email,password})
    }
    
    return (
        <>
           <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H3 style={styles.heading}>YOU ARE WELCOME TO INSTAGRAM</H3>

        <Image
          source={welcome}
          style={{width: null, height: 150, marginTop: 30}}
          resizeMode="contain"
        />

        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd email"
              value={email}
              style={{color: '#000'}}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd password"
              value={password}
              secureTextEntry={true}
              style={{color: '#000'}}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
          <Button rounded block onPress={doSignIn}>
            <Text>SignIn</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{marginTop: 10}}>
            <Text style={{color: '#000', textAlign: 'center'}}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    </Container>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#000',
      marginHorizontal: 5,
      marginTop: 30,
    },
    formItem: {
      marginBottom: 20,
    },
  });

  const mapDispatchToProps = {
      signIn:(data) => signIn(data)
  }
Signin.prototype = {
    signIn: propTypes.func.isRequired
}

export default connect(null,mapDispatchToProps) (Signin)
