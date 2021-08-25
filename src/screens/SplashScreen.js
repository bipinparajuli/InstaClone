import React from 'react';
import {TouchableOpacity,StyleSheet,View,Image, Text,StatusBar,Dimensions} from 'react-native';
import Logo from '../Assets/123.png'

const {width,height} = Dimensions.get("window")


export default function SplashScreen({navigation}) {

  console.log(width,height);

  return (
    <View style={style.container}>
<StatusBar backgroundColor="green" barStyle="light-content" />
<View style={style.splash}>
  <Image source={require("../Assets/sandeep.png")} />
</View>

<View style={style.logo}>
  <Image 
  style={{height:30,width:30}} 
  source={Logo} />
</View>

<View style={style.wrapper}>
<Text style={style.title}>
  Welcome {'\n'} to Xavier App
  </Text>

  <Text style={style.subtitle}>
  Fun with colleagues
  </Text>

<TouchableOpacity 
// onPress={()=>navigation.navigate("Signin")}
onPress={() => navigation.navigate('Signin')}

style={style.button}>
  <Text style={style.buttonText}>Get Started</Text>
</TouchableOpacity>

</View>

    </View>
  );
}

const style = StyleSheet.create({
  container:{
    backgroundColor:"#2827CC",
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    paddingBottom:"20%" 
  },

  splash:{
    backgroundColor:"#ffd5a6",
    position:"absolute",
    top:0,
    alignItems:"center",
    justifyContent:"flex-end",
    overflow:"hidden",
    height:height/1.6,
    width:height/1.5,
    borderRadius:width,
    left:width/4

  },
  logo:{
    backgroundColor:"#fff",
    height:8,
    width:8,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:80
  },
  wrapper:{
// width:"100%"
  },
  title:{
color:"#fff",
fontSize:30,
fontFamily:"Montserrat-Bold",
textAlign:"center"

  },
  subtitle:{
color:"#fff",
fontSize:20,
textAlign:"center",
fontFamily:"Montserrat-Regular",

  },
button:{
  backgroundColor:"#346763",
  padding:20,
  borderRadius:20,
  marginTop:20,
  shadowColor:"#fff",
  shadowOffset:{
    height:3,
    width: 3,
    
  },
  shadowOpacity:1,
  shadowRadius:5,
  elevation:1
},
buttonText:{
  color:"#fff",
  textAlign:"center",
  fontFamily:"Montserrat-Regular"
}

})