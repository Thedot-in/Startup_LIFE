import React, {useState, useEffect} from 'react';
import {Image, Linking,TouchableOpacity,View} from 'react-native';
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

import moment from 'moment';

const Post = ({item, userDetails, navigation}) => {

    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)

    useEffect(() => {
      

      if (item.vote) {
        let upVote = 0
        let downVote = 0

        Object.values(item.vote).map((val) => {
          if (val.upvote) {
            upVote += 1
          }

          if (val.downvote) {
            downVote += 1
          }
        })

        setUpvote(upVote)
        setDownvote(downVote)
      }


    }, [item])

    const upVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .push({
          upvote: 1 
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .push({
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    const readArticle = (id) => {
      //
      navigation.navigate('Read',{id:id})
    }

    return (
      <View style={{padding:12}}>
      <Card
        style={{
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          elevation: 5,
          borderRadius:12,
        }}>
        {/* <CardItem
          style={{
            backgroundColor: 'transparent',
          }}>
          <Left>
            <Thumbnail source={{uri: item.userImage}} small />
            <Body>
              <Text
                style={{
                  color: '#fdcb9e',
                }}>
                {item.by}
              </Text>
  
              <Text note>{item.location}</Text>
            </Body>
          </Left>
        </CardItem> */}
        <CardItem cardBody>
          <Image
            source={{uri: item.picture}}
            style={{height: 200, width: null, flex: 1,borderTopRightRadius:12,borderTopLeftRadius:12}}
          />
          
        </CardItem>
        <CardItem
          cardBody
          style={{
            backgroundColor: 'transparent',padding:7,marginTop:8
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: '#000',
              marginLeft:8,
              fontSize:15
            }}>
             
            {item.description}
          </Text>
          {/* <Text styel={{color:'black'}}>
               By - {item.userName}
          </Text> */}
        </CardItem>
  
        <CardItem
          style={{
            backgroundColor: '#fff',
            borderRadius:12
          }}>
            <Left>
              <Text style={{color:'#E21717',fontWeight:'bold',fontSize:13}}>
              {moment(item.date).fromNow()}
        
              </Text>
            </Left>
          {/* <Left>
            <Button transparent onPress={upVotePost}>
              <Icon
                name="thumbs-up"
                type="Entypo"
                style={{fontSize: 20, color: '#fdcb9e'}}
              />
              <Text
                style={{
                  color: '#fdcb9e',
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
                  color: '#fdcb9e',
                }}>
                 {downvote}
              </Text>
            </Button>
          </Left> */}
          <Right>
            <Button
              transparent
              iconLeft
              onPress={() => {
              //  Linking.openURL(`instagram://user?username=${item.instaId}`);
              }}>
              
              
              {/* <Text
                style={{
                  color: '#000',
                }}>
                Read Article
                {item.id}
              </Text> */}
              <TouchableOpacity style={{backgroundColor:'#EB4D4B',padding:7,borderRadius:6}}
                onPress={()=>readArticle(item.id)}
              >
                <Text style={{color:'white'}}>
                  Read Article
                </Text>
              </TouchableOpacity>


              {/* <Icon
                name="instagram"
                type="Feather"
                style={{fontSize: 20, color: '#fdcb9e'}}
              /> */}
            </Button>
          </Right>
        </CardItem>
      </Card>
      </View>
    );
  
}

export default Post