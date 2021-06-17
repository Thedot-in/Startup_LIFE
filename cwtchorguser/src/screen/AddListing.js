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


const AddListing = ({navigation, userState}) => {

    const [cname, setCname] = useState('')

    const [location, setLocation] = useState('')
    const [cstory, setCstory] = useState('')
    const [chistory, setChistory] = useState('')

    const [facebook, setFacebook] = useState('')
    const [cphone, setCphone] = useState('')
    const [ceo, setCeo] = useState('')




    const [details, setDetails] = useState('')
    const [description, setDescription] = useState('')

    const [selectedValue, setSelectedValue] = useState("SaaS");

    const [tags, setTags] = useState('')
    const [link, setLink] = useState('')
    const [headquarters, setHeadquarters] = useState('')
    const [businessmodel, setBusinessmodel] = useState('')
    const [noofemp, setNoofemp] = useState('')
    const [coreteam, setCoreteam] = useState('')
    const [linked, setLinked] = useState('')






    const [image, setImage] = useState(null)

    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)




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

            setImage(url)
            setImageUploading(false)
        })
    }


    const addListing = async () => {
        try {
            if (!location || !cname || !image || !details || !tags || !noofemp ) {
                return Snackbar.show({
                    text: "Please add all field",
                    textColor: "white",
                    backgroundColor: "red"
                })
            }

            const uid = shortid.generate()

            await database().ref(`/listing/${uid}`).set({
                location,
                cname,
                picture: image,
                by: userState.name,
                ctype:selectedValue,
                coreteam,
                linked,
                facebook,
                description,
                ceo,
                history:chistory,
                phone:cphone,
                story:cstory,
                date: Date.now(),
                headquarters,
                instaId: userState.instaUserName,
                userImage: userState.image,
                userName: userState.name,
                userId: userState.uid,

                id: uid
            })
            console.log("Post Added SUCCESS")
            setCname('')
            setLocation('')
            setDetails('')
            setTags('')
            setLink('')
            setHeadquarters('')
            setNoofemp('')
            setCoreteam('')
            setLinked('')
            navigation.navigate('Home')
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
                    placeholder="Company Name"
                    value={cname}
                    style={{color: '#000'}}
                    onChangeText={(text) => setCname(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Description"
                    value={description}
                    style={{color: '#000'}}
                    onChangeText={(text) => setDescription(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Details"
                    value={details}
                    style={{color: '#000'}}
                    onChangeText={(text) => setDetails(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Location"
                    value={location}
                    style={{color: '#000'}}
                    onChangeText={(text) => setLocation(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Textarea
                    rowSpan={10}
                    placeholder="Write the whole story"
                    value={cstory}
                    style={{color: '#000'}}
                    onChangeText={(text) => setCstory(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Textarea
                    rowSpan={10}
                    placeholder="Company history"
                    value={chistory}
                    style={{color: '#000'}}
                    onChangeText={(text) => setChistory(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="CEO"
                    value={ceo}
                    style={{color: '#000'}}
                    onChangeText={(text) => setCeo(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Tags"
                    value={tags}
                    style={{color: '#000'}}
                    onChangeText={(text) => setTags(text)}
                  />
                </Item>
                <View style={styles.pickers}>
                    <Text style={{color:'#758283'}}>
                        Company Type
                    </Text>
                <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >

        <Picker.Item label="B2B" value="B2B" />
        <Picker.Item label="B2C" value="B2C" />
        <Picker.Item label="C2C" value="C2C" />

      </Picker>
      </View>
      <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Core Team"
                    value={coreteam}
                    style={{color: '#000'}}
                    onChangeText={(text) => setCoreteam(text)}
                  />
                </Item>
        
                {imageUploading ? (
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
                  <Input
                    placeholder="Company Website Link"
                    value={link}
                    style={{color: '#000'}}
                    onChangeText={(text) => setLink(text)}
                  />
                </Item>
                
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company Headquarters"
                    value={headquarters}
                    style={{color: '#000'}}
                    onChangeText={(text) => setHeadquarters(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="No of Employees"
                    value={noofemp}
                    style={{color: '#000'}}
                    onChangeText={(text) => setNoofemp(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Company LinkedIn Link"
                    value={linked}
                    style={{color: '#000'}}
                    onChangeText={(text) => setLinked(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Facebook Link"
                    value={facebook}
                    style={{color: '#000'}}
                    onChangeText={(text) => setFacebook(text)}
                  />
                </Item>
                <Item regular style={styles.formItem}>
                  <Input
                    placeholder="Facebook Link"
                    value={cphone}
                    style={{color: '#000'}}
                    onChangeText={(text) => setCphone(text)}
                  />
                </Item>
                <Button style={{backgroundColor:'#E21717'}} regular block onPress={addListing}>
                  <Text >Add Listing</Text>
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


AddListing.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(AddListing)