import React,{useState} from 'react'
import {View,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';

import {Container,
Form,
Item,
Input,
Text,
Button,
Thumbnail,

Content} from 'native-base'


import storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress'


import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

import Snackbar from 'react-native-snackbar';

import propTypes from 'prop-types'
import {signUp} from '../action/auth'
import {connect} from 'react-redux'


const SignUp = ({navigation,signUp}) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [instaUserName,setInstaUserName] = useState('')
    const [country,setCountry] = useState('')
    const [bio,setBio] = useState('')
    const [image,setImage] = useState('https://i.ibb.co/YPMpjPQ/logo-round.png')

    const [imageUploading,setImageUploading] = useState(false)
    const [uploadStatus,setUploadStatus] = useState(null)


    const chooseImage = async () => {
      ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response)

          if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              console.log(response)
              uploadImage(response)
            }
           
             
      })
  }


  const uploadImage = async (response) => {
      setImageUploading(true)
      const reference = storage().ref(response.fileName)

      const task = reference.putFile(response.path)
      task.on('state_changed', (taskSnapshot) => {
          const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

          setUploadStatus(percentage)
      })

      task.then(async () => {
          const url = await reference.getDownloadURL()
          console.log(url.body)
          setImage(url)
          setImageUploading(false)
      })
  }

    const doSignUp = async () => {
        console.log(name,email,password,instaUserName,country,bio,image)
      if(!name|| !email|| !password|| !instaUserName|| !country|| !bio ){
        Snackbar.show({
          text: 'Add all fields',
    duration: Snackbar.LENGTH_SHORT,
    action: {
      text: '🖖',
      textColor: 'green',
      
      onPress: () => { /* Do something. */ },
    },
        })
      }
      else
      signUp({name,email,password,instaUserName,country,bio,image})
    }
    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={chooseImage}>
                  <Thumbnail large source={{uri: image}} />
                </TouchableOpacity>
              </View>
    
              {imageUploading && (
                <ProgressBar progress={uploadStatus} style={styles.progress} />
              )}
      <View style={{padding:10}}>
              <Form style={{padding:10,borderRadius:12}}>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Enter your name"
                    placeholderTextColor="#fff"
                    value={name}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    placeholderTextColor="#fff"


                    style={{color: '#eee'}}
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Enter your password"
                    value={password}
                    placeholderTextColor="#fff"


                    secureTextEntry={true}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="LinkedIn Profile Link"
                    value={instaUserName}
                    placeholderTextColor="#fff"


                    style={{color: '#eee'}}
                    onChangeText={(text) => setInstaUserName(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="About you and your position"
                    placeholderTextColor="#fff"


                    value={bio}
                    style={{color: '#eee'}}
                    onChangeText={(text) => setBio(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Your Phone"
                    value={country}
                    placeholderTextColor="#fff"


                    style={{color: '#eee'}}
                    onChangeText={(text) => setCountry(text)}
                  />
                </Item>
                <Button regular block onPress={doSignUp} style={{backgroundColor:"#fff"}}>
                  <Text style={{color:"#E21717"}}>SignUp</Text>
                </Button>
                <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={{marginTop: 10,backgroundColor:'#CA3E47'}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Already have an account, SignIn here
                </Text>
              </TouchableOpacity>
              </Form>
              </View>
            </ScrollView>
          </Content>
        </Container>
      );
    
   
}

const mapDispatchToProps = {
    signUp: (data) => signUp(data)
}

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
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
      backgroundColor:'#CA3E47',
      borderRadius:8
    },
  });
export default connect(null,mapDispatchToProps)(SignUp)