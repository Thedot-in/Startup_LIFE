import React,{useEffect,useState} from 'react'
import {View,Text,Image,SafeAreaView,ScrollView,Linking, TouchableOpacity} from 'react-native'
import database from '@react-native-firebase/database';
// import {getPostById} from '../action/post'
import EmptyContainer from '../components/EmptyContainer'
import {Right,Left,H3,  Fab,Icon,Container} from 'native-base'
import Tts from 'react-native-tts';
import { Button } from 'react-native-paper';
import { material,sanFranciscoSpacing,robotoWeights} from 'react-native-typography'
import { SocialIcon } from 'react-social-icons';
import { FacebookSocialButton } from "react-native-social-buttons";
const ReadCompany = ({route}) => {
    const [loading,setLoading] = useState('');

    const [ceo,setCeo] = useState('');
    const [cname,setCname] = useState('');
    const [cteam,setCteam] = useState('');
    const [ctype,setCtype] = useState('');

    const [date,setDate] = useState('');
    const [description,setDescription] = useState('');
    const [facebook,setFacebook] = useState('');
    const [headquartes,setHeadquartes] = useState('');
    const [history,setHistory] = useState('');
    const [id,setId] = useState('');
    const [linkedin,setLinkedin] = useState('');
    const [location,setLocation] = useState('');
    const [phone,setPhone] = useState('');
    const [picture,setPicture] = useState('');
    const [story,setStory] = useState('');
    const [userId,setUserId] = useState('');
    const [author,setAuthor] = useState('');











    useEffect(()=>{
        // getPostById(route.params.id)

        getListingById(route.params.id)

    },[]);

    const getListingById = (ID) => {
        setLoading(true)
        console.log(ID)
        database()
        .ref(`/listing/${ID}`)
        .on('value', (snapshot) => {
            console.log('USER Data: ', snapshot.val())
    

            if (snapshot.val()) {
                console.log(snapshot.val().picture)
                setLocation(snapshot.val().location)
                setDescription(snapshot.val().description)
                setCeo(snapshot.val().ceo)
                setCname(snapshot.val().cname)
                setCteam(snapshot.val().coreteam)
                setCtype(snapshot.val().ctype)

                setDate(snapshot.val().date)
                setFacebook(snapshot.val().facebook)
                setHeadquartes(snapshot.val().headquarters)
                setHistory(snapshot.val().history)
                setId(snapshot.val().id)
                setLinkedin(snapshot.val().linked)
                setPhone(snapshot.val().phone)
                setUserId(snapshot.val().userId)



                setStory(snapshot.val().story)
                setPicture(snapshot.val().picture)
                setAuthor(snapshot.val().by)
                setLoading(false)
            } else {
                console.log("Error")
        
            }
        })
    }
    if(loading){
        return <EmptyContainer/>
     }
     else{

     
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View>
                <View style={{alignItems:'center',marginTop:53 }}>
                    <Image style={{height:200,width:200,borderRadius:8}} source={{uri:picture}}/>
                </View>

                <View style={{padding:20}}>
                    <Text style={{alignSelf:'center',fontSize:36,fontWeight:'bold',textAlign: 'center'}}>
                        {cname}
                    </Text>
                </View>
                <Text style={{fontWeight:'bold',alignSelf:'center'}}>
                            {headquartes}
                        </Text>
                        <View>

                        <View style={{alignSelf:'center',marginTop:12,flexDirection:'row'}}>
                            <Button
                               transparent
                             onPress={() => {
                                Linking.openURL(facebook);
                                }}
                                
                            >
                            <Icon feather name="logo-facebook" style={{color: "black"}} onPress/>

                            </Button>
                            <Button
                               transparent
                             onPress={() => {
                                Linking.openURL(linkedin);
                                }}
                                
                            >
                            <Icon feather name="logo-linkedin" style={{color: "black"}}/>
                          
                            </Button>

                        </View>
                        <View style={{alignSelf:'center',marginTop:8}}>
                            <Text>
                            {phone}

                            </Text>
                        </View>
                    </View>
                <View style={{padding:20}}>
                    <Text style={{alignSelf:'center',color:'#242B2E',textAlign:'center',fontWeight:'600',fontSize:18}}>
                        {description}
                    </Text>
                    <View style={{padding:23}}>
                    <View style={{backgroundColor:'#E1E1E1',borderRadius:12,height:40,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:18}}>
                            {ctype}
                        </Text>
                    </View>
                    
                    </View>
                   
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    
                            <View style={{padding:10}}>
                                    <Text style={{padding:20,fontSize:18,color:'#373737',textAlign: 'justify',
    lineHeight: 30,}}>
                                            {story}
                                        </Text>    
                            </View>
                    </View>
                   
                    {/* <View style={{backgroundColor:'#fff',padding:20,alignItems:'center'}}>
                        <Text style={{color:"#373737",fontSize:15}}>
                            {cteam}
                        </Text>
                    </View> */}
                
            </View>
        </ScrollView>
    )
     }
}


export default ReadCompany;