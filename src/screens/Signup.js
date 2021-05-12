import React,{useState} from 'react'
import {StyleSheet,TouchableOpacity,View,ScrollView} from "react-native"
import {
Text,
Image,
Container,
Content,
Thumbnail,
Form,
Item,
Input,
Button

} from 'native-base'

import storage from '@react-native-firebase/storage'
import Imagepicker from 'react-native-image-picker'
import ProgressBar from 'react-native-progress/Bar'

import {options} from '../Utils/options'

//redux
import {connect} from 'react-redux'
import propsTypes from 'prop-types'
import {signUp} from '../Action/auth'

const Signup = ({signUp}) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [country, setcountry] = useState("")
    const [bio, setbio] = useState("")
    const [instausername, setinstausername] = useState("")
    const [image, setimage] = useState("https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png")
    const [imageUploading, setimageUploading] = useState(false)
    const [imageloadingstatus,setUploadStatus] = useState(null)

// SignUp()
const chooseImage = async () => {
  Imagepicker.showImagePicker(options,(response)=>{
   console.log("Response",response);

   if(response.didCancel)
   {
      console.log("User Cancled");

   }
   else if(response.error)
   {
      console.log("User Cancled",response.error);

   }
   else if(response.customButton)
   {
      console.log("User Cancled",response.customButton);

   }
   else{

      uploadImage(response)
  }
  })
  
}
const uploadImage = async (response) => {

setimageUploading(true)

const reference = storage().ref(response.fileName)

console.log(response,reference);

const task = reference.putFile(response.path)
console.log("REFERENCE",task);

task.on("state_changed",(taskSnapshot)=> {
   const percentage = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes) * 1000

   setUploadStatus(percentage)
  })
  
  task.then(async ()=> {
      const url = await reference.getDownloadURL()

      setimage(url)
      setimageUploading(false)
  })
}

const doSignUp = async () => {
    signUp({name,instausername,bio,country,email,password,image})

}


return (
        <>
              <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={imageloadingstatus} style={styles.progress} />
          )}

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="name"
                value={name}
                style={{color: '#000'}}
                onChangeText={(text) => setname(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="email"
                value={email}
                style={{color: '#000'}}
                onChangeText={(text) => setemail(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={{color: '#000'}}
                onChangeText={(text) => setpassword(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Instagram user name"
                value={instausername}
                style={{color: '#000'}}
                onChangeText={(text) => setinstausername(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Your Short Bio"
                value={bio}
                style={{color: '#000'}}
                onChangeText={(text) => setbio(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={{color: '#000'}}
                onChangeText={(text) => setcountry(text)}
              />
            </Item>
            <Button regular block onPress={doSignUp}>
              <Text>SignUp</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container> 
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'flex-start',
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      marginBottom: 20,
    },
  });
  
  


const mapDispatchToProps = {
    
    signUp:(data) => signUp(data)
}


Signup.propsTypes ={
    signUp:propsTypes.func.isRequired
}


export default connect(null,mapDispatchToProps)(Signup)
