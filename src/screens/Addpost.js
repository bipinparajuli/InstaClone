import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  H3,
  Textarea,
  Icon,
} from 'native-base';

import Snakebar from 'react-native-snackbar';
import ProgressBar from "react-native-progress/Bar"

import database from '@react-native-firebase/database'

import storage from "@react-native-firebase/storage"
import Imagepicker from "react-native-image-picker"

import {options} from "../Utils/options"
import propTypes from "prop-types"
import shortId from 'shortid'

import { connect } from 'react-redux';


const Addpost = ({navigation,userState}) => {

const [location, setLocation] = useState("")
const [description, setDescription] = useState("")
const [image, setimage] = useState(null)

const [imageuploading, setimageUploading] = useState(false)
const [uploadStatus, setUploadStatus] = useState(null)

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

const addPost = async () => {

try{

  if(!location || !description || !image)
{
  return Snakebar.show({
    text:"Please add all filed",
    textColor:"white",
    backgroundColor:"red"
  })
}

  const uid = shortId.generate();

  console.log(uid);

  await database().ref(`/posts/${uid}`).set({
    location,
    description,
    picture:image,
    by:userState.name,
    date:Date.now(),
    instaId:userState.instaUsername,
    userImage:userState.image,
    id: uid
  })

  console.log("POST ADDED SUCCESS");
  navigation.navigate("Home")

}catch(error){
  console.log(error);
  Snakebar.show({
    text:"Post upload failed",
    textColor:"white",
    backgroundColor:"red"
  })
}

}


return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {image && (
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="center"
            />
          )}
          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="location"
                value={location}
                style={{color: '#eee'}}
                onChangeText={(text) => setLocation(text)}
              />
            </Item>

            {imageuploading ? (
              <ProgressBar progress={uploadStatus} style={styles.progress} />
            ) : (
              <Button
                regular
                bordered
                block
                iconLeft
                info
                style={styles.formItem}
                onPress={chooseImage}>
                <Icon
                  name="md-image-outline"
                  type="Ionicons"
                  style={styles.icon}
                />
                <Text
                  style={{
                    color: '#fdcb9e',
                  }}>
                  Choose Image
                </Text>
              </Button>
            )}

            <Item regular style={styles.formItem}>
              <Textarea
                rowSpan={5}
                placeholder="Some description..."
                value={description}
                style={{color: '#eee'}}
                onChangeText={(text) => setDescription(text)}
              />
            </Item>

            <Button regular block onPress={addPost}>
              <Text>Add Post</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );

                }
  const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  formItem: {
    marginBottom: 20,
  },
  icon: {fontSize: 20, color: '#fdcb9e'},
  image: {width: null, height: 150, marginVertical: 15},
  progress: {width: null, marginBottom: 20},
});

const mapStateToProps = (state) => ({
  userState:state.auth.user,
})


Addpost.propTypes ={
  userState:propTypes.object.isRequired
}


export default connect(mapStateToProps)(Addpost)