import React,{useEffect,useState} from 'react'
import {StyleSheet, ScrollView,FlatList, Image,View} from 'react-native';
import {getEpisode} from '../action/episode';
import {connect} from 'react-redux';
import Episode from '../components/Episode'


import propTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  H1,
  Button,
  H3,
  Textarea,
  Icon,
} from 'native-base';


import AdaptiveCard from 'react-native-adaptivecards';
import EmptyContainer from '../components/EmptyContainer';
import SeeEpisodes from './SeeEpisode';



const Video = ({getEpisode, postState, userDetails,navigation}) => {


  useEffect(() => {
    getEpisode()
},[])    

    console.log(postState)
  if(postState.loading){
    return <EmptyContainer/>
}else{
    console.log(postState.episode);
    return(
        <Content padder style={{backgroundColor:'#ECECEC'}}>
     
        <View>
            <FlatList
            data={postState.episode}
            keyExtractor = {(item) => item.id}
            renderItem={({item,index,separators})=>(
                <SeeEpisodes item={item} userDetails={userDetails} key={item.id} navigation={navigation}/>
            )}
            ListEmptyComponent={() => (
                <Container style={styles.emptyContainer}>
                  <H1>No post found</H1>
                </Container>
              )}
             >


         </FlatList>
        </View>


       
        </Content>
    )
}
}


const styles = StyleSheet.create({

})

const mapStateToProps = (state) => ({
  postState: state.episode,
  userDetails: state.auth.user
})

const mapDispatchToProps = {
  getEpisode
}

export default connect(mapStateToProps,mapDispatchToProps)(Video)