import React,{useEffect} from 'react'
import {SafeAreaView,StyleSheet,FlatList} from "react-native"
import {Container,H1, Item} from "native-base"


//redux
import {connect} from 'react-redux'
import {getPosts} from "../Action/post"
import propTypes from "prop-types"

import EmptyContainer from "../components/emptyContainer"
import Post from '../components/Post'

const Home = ({getPosts,postState,userDetails}) => {

    useEffect(() => {
        getPosts()
    }, [])

    if(postState.loading)
    {
        return <EmptyContainer />
    }
    return (
<SafeAreaView style={styles.container}>
    <FlatList 
    data={postState.posts}
    keyExtractor={(item)=> item.id}
    renderItem={({item,index,separators}) => (
        <Post item={item} userDetails={userDetails} key={Item.id} />
    )}
ListEmptyComponent={()=> (
    <Container style={styles.emptyContainer}>
        <H1 style={{color:"black"}}>No post found</H1>
    </Container>
)}
    />

</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      justifyContent: 'flex-start',
      padding: 4,
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  


const mapStateToProps= (state) => ({
    postState:state.post,
    userDetails:state.auth.user
})

const mapDispatchToProps = {
    getPosts
}

Home.propTypes = {
    getPosts:propTypes.func.isRequired,
    postState:propTypes.object.isRequired,
    userDetails:propTypes.object,
}



export default connect(mapStateToProps,mapDispatchToProps)(Home)
