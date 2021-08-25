import React, { useCallback, useLayoutEffect,useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
//redux
import {connect} from 'react-redux'
import {getPosts} from "../Action/post"
import propTypes from "prop-types"

function Message({userDetails}){
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState();


    useEffect(() => {
        console.log(userDetails);
      setUser(userDetails)
        setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])

    const {
        _id,
        createdAt,
        text,
        user,
        } = messages[0]

        
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  
    console.log(user);

    return (
      <GiftedChat
      showAvatarForEveryMessage={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: userDetails.uid,
            name: userDetails.name,
            avatar: userDetails.image
            }}
      />
    )
}


const mapStateToProps= (state) => ({
    postState:state.post,
    userDetails:state.auth.user
})

const mapDispatchToProps = {
    getPosts
}

Message.propTypes = {
    getPosts:propTypes.func.isRequired,
    postState:propTypes.object.isRequired,
    userDetails:propTypes.object,
}



export default connect(mapStateToProps,mapDispatchToProps)(Message)