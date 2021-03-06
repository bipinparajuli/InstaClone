import React, {useState, useEffect} from 'react';
import {Image, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';



const Post = ({item,userDetails}) => {

  console.log(item)
    
    const [upvote,setupvote] = useState(0)
    const [downvote,setdownvote] = useState(0)

    const upVotePost  =() => {
database()
.ref(`/posts/${item.id}/vote/${userDetails.uid}`)
.set({
    upvote: 1,
})
.then(() => console.log("UPVOTED"))
    }
    
    const downVotePost  =() => {
      database()
      .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
      .set({
          downvote: 1,
      })
      .then(() => console.log("DOWNVOTE"))
    }

    useEffect(()=> {
console.log(item);

if(item.vote)
{
    let upVote = 0;
    let downVote= 0;

    Object.values(item.vote).map((val)=> {
        if(val.upvote)
        {
upVote += 1;
        }
        if(val.downvote)
        {
downVote += 1;
        }
    })

    setdownvote(downVote)
    setupvote(upVote)
}
    },[item])
    
    return (
        <Card
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#0f4c75',
      }}>
      <CardItem
        style={{
          backgroundColor: 'transparent',
        }}>
        <Left>
          <Thumbnail source={{uri: item.userImage}} small />
          <Body>
            <Text
              style={{
                color: '#000',
              }}>
              {item.by}
            </Text>

            <Text note>{item.location}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{uri: item.picture}}
          style={{height: 200, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem
        cardBody
        style={{
          backgroundColor: 'transparent',
        }}>
        <Text
          numberOfLines={2}
          style={{
            color: '#000',
          }}>
          {item.description}
        </Text>
      </CardItem>

      <CardItem
        style={{
          backgroundColor: '#fff',
        }}>
        <Left>
          <Button transparent onPress={upVotePost}>
            <Icon
              name="thumbs-up"
              type="Entypo"
              style={{fontSize: 20, color: '#fdcb9e'}}
            />
            <Text
              style={{
                color: '#000',
              }}>
              {upvote}
            </Text>
          </Button>
          <Button transparent onPress={downVotePost}>
            <Icon
              name="thumbs-down"
              type="Entypo"
              style={{fontSize: 20, color: '#fdcb9e'}}
            />
            <Text
              style={{
                color: '#000',
              }}>
              {downvote}
            </Text>
          </Button>
        </Left>
        <Right>
          <Button
            transparent
            iconLeft
            onPress={() => {
              Linking.openURL(`instagram://user?username=${item.instaId}`);
            }}>
            <Text
              style={{
                color: '#000',
              }}>
              Open in
            </Text>
            <Icon
              name="instagram"
              type="Feather"
              style={{fontSize: 20, color: '#fdcb9e'}}
            />
          </Button>
        </Right>
      </CardItem>
    </Card>
    )
}

export default Post
