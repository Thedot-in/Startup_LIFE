import React, { useState } from 'react';
import {Picker,StyleSheet, ScrollView, Image,View} from 'react-native';
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

import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'

import database from '@react-native-firebase/database'

import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'

const Addepisode = ({navigation, userState}) => {


    const [title,setTitle] = useState('');
    const [context,setContext] = useState('');

    const [link,setLink] = useState('');
    const [happening,setHappening] = useState('');


    const addEpisode = async () => {
        try {
            if (!link || !happening || !title || !context  ) {
                return Snackbar.show({
                    text: "Please add all field",
                    textColor: "white",
                    backgroundColor: "red"
                })
            }

            const uid = shortid.generate()

            await database().ref(`/episode/${uid}`).set({
                title,
                context,
                ylink: link,
                happening,
                by: userState.name,
                date: Date.now(),
                userImage: userState.image,
                userName: userState.name,
                userId: userState.uid,

                id: uid
            })
            console.log("Post Added SUCCESS")
            setTitle('')
            setContext('')
            setLink('')
            setHappening('')
         Snackbar.show({
                text: "Sucessfully Posted Episode",
                textColor: "white",
                backgroundColor: "green"
            })
            navigation.navigate('Video')
        } catch (error) {
            console.log(error)
            Snackbar.show({
                text: "Listing upload failed",
                textColor: "white",
                backgroundColor: "red"
            });



        }
    }


    return (




<Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
    
              <Form>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Vide Title"
                    value={title}
                    style={{color: '#000'}}
                    onChangeText={(text) => setTitle(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Video Context"
                    value={context}
                    style={{color: '#000'}}
                    onChangeText={(text) => setContext(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Link"
                    value={link}
                    style={{color: '#000'}}
                    onChangeText={(text) => setLink(text)}
                  />
                </Item>
               <Item regular style={styles.formItem}>
                  
                  <Textarea
                    rowSpan={10}
                    placeholder="Company history"
                    value={happening}
                    style={{color: '#000'}}
                    onChangeText={(text) => setHappening(text)}
                  />
                </Item> 
                
        
                <Button style={{backgroundColor:'#E21717'}} regular block onPress={addEpisode}>
                  <Text >Add Episode</Text>
                </Button>
              </Form>
            </ScrollView>
          </Content>
        </Container>
    )

}


const styles = StyleSheet.create({
    pickers:{
            alignSelf:'center',
            marginBottom:12
    },
    formItem: {
        marginBottom: 20,
        backgroundColor:"#fff"
      },
})


const mapStateToProps = (state) => ({
    userState: state.auth.user,
})


Addepisode.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(Addepisode)
