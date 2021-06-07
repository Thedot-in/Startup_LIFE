import React,{useState} from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Image,TouchableOpacity,Alert } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { View,Container, Header, Content, Card, CardItem, Thumbnail,Item,Input, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Snackbar from 'react-native-snackbar'


const Editor = ({navigation}) => {
    const [pass,setPass] = useState("")
    
    const requestPasscode = () => {
        console.log("pass",pass);
        if(!pass){

            Alert.alert(
                "Please enter the correct code")
        
        }
        else if(pass == "start"){
                //Have navigation
                console.log('Good');

        
                Snackbar.show({
                    text: "Congratulations you are editor now",
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor:'green',
                    action: {
                        
                        textColor: 'green',
                      
                      },
                  });
                  navigation.navigate('EditorPageNavigation')
        }
        // TODO: Need to work on post Request 
    }

    return(
        <SafeAreaView>
        <View>
                <View style={{backgroundColor:'#fff',padding:20,justifyContent:'center',marginTop:90}}> 
                <Text style={{color:'#242B2E',fontSize:23,marginTop:23,alignItems:'center',marginBottom:26}}>
                    Enter the passcode to enter Editor Dashboard
                </Text>
         
          <Item>
            <Input placeholder='Regular Textbox' value={pass} onChangeText={(text) => setPass(text)} />
          </Item>
      
        <TouchableOpacity onPress={() => requestPasscode()} style={{backgroundColor:'#242B2E',borderRadius:8,padding:10,marginTop:23,alignItems:'center'}}>
          <Text style={{color:'white'}}>
              Request
          </Text>
      </TouchableOpacity>
    
     
                </View>
            </View>
            </SafeAreaView>
    )   
}

export default Editor;