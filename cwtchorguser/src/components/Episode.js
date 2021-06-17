import React,{useEffect,useState} from 'react'
import {StyleSheet, ScrollView,FlatList, Image,View} from 'react-native';
import {getEpisode} from '../action/episode';
import {connect} from 'react-redux';

import propTypes from 'prop-types';
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
import SeeEpisodes from '../screen/SeeEpisode';



const Episode = ({getEpisode, postState, userDetails,navigation}) => {


  useEffect(() => {
    getEpisode()
},[])    

    console.log(postState)
  if(postState.loading){
    return <EmptyContainer/>
}else{
  {console.log("Here : ",postState.episode[0])}
    return(
        <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{backgroundColor:'#EEEEEE'}}>
          <Text>
Video
            </Text>
            <FlatList
    
            data={postState.episode[0]}
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


        </ScrollView>
        </Content>
    )
}
}


export default Episode