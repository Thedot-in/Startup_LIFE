import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView,View, TouchableOpacity} from 'react-native';
import {Container, H1, Text} from 'native-base';
// redux
import {
    Header,
    Body,
    Right,
    Button,
    Icon,
    Left,
    Title,
    Segment, Content,

 
} from 'native-base'
import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
// to render empty container
import EmptyContainer from '../components/EmptyContainer';
import Post from '../components/Post';

import MainTabScreen from "../components/MainTabScreen"


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Home = ({getPosts, postState, userDetails,navigation}) => {
   
    useEffect(() => {
        getPosts()
    },[])    

    if(postState.loading){
        return <EmptyContainer/>
    }
    const Tab = createMaterialBottomTabNavigator();

    
    return(
        <>
            
     <SafeAreaView style={styles.container}>
        <View style={{marginBottom:0}}> 
        <Container>

        
          {/* <Body >
            <Segment style={{backgroundColor:'#fff',padding:20,borderRadius:8}}>
              <Button first style={{backgroundColor:'#E21717'}}><Text style={{color:"#fff"}}>My Feeds</Text></Button>
              <Button last active ><Text>Preferences</Text></Button>
            </Segment>
          </Body> */}
         

   
      </Container>
        </View>
         <FlatList
    
            data={postState.posts}
            keyExtractor = {(item) => item.id}
            renderItem={({item,index,separators})=>(
                <Post item={item} userDetails={userDetails} key={item.id} navigation={navigation}/>
            )}
            ListEmptyComponent={() => (
                <Container style={styles.emptyContainer}>
                  <H1>No post found</H1>
                </Container>
              )}
             >


         </FlatList>
         {/* <TouchableOpacity onPress={()=>navigation.jumpTo('AddPost')}>
           <Text>
             OI
           </Text>
         </TouchableOpacity> */}
     </SafeAreaView>
     </>
    )
}

Home.propTypes = {
    getPosts: propTypes.func.isRequired,
    postState: propTypes.object.isRequired,
    userDetails: propTypes.object

}

const mapStateToProps = (state) => ({
    postState: state.post,
    userDetails: state.auth.user
})

const mapDispatchToProps = {
    getPosts
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      padding: 4,
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: '#1b262c',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default connect(mapStateToProps,mapDispatchToProps)(Home)