import React,{useEffect,useState,useCallback} from 'react';
import {View,Text,Image,SafeAreaView,ScrollView, TouchableOpacity} from 'react-native'
import {Right,Left,H3,  Fab,Icon,Container,Button} from 'native-base'

import EmptyContainer from '../components/EmptyContainer';
import database from '@react-native-firebase/database';
import { material ,human } from 'react-native-typography'
import YoutubePlayer from "react-native-youtube-iframe";

import moment from 'moment';



const ReadEpisodes = ({route}) => {
    const [playing, setPlaying] = useState(false);
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
        }
      }, []);
    
      const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);
    
    

    const [video,setVideo] = useState('');
    const [title,setTitle] = useState('');
    const [data,setDate] = useState('');
    const [userImg,setUserImg] = useState('');
    const [context,setContext] = useState('');

    

    const [happening,setHappening] = useState('');
    const [loading,setLoading] = useState('');
    const [videoBtn,setVideoBtn] = useState(false);



    const getEpisode = (ID) => {
        setLoading(true)

        database()
        .ref(`/episode/${ID}`)
        .on('value', (snapshot) => {
            console.log('USER Data: ', snapshot.val().vote)
            if (snapshot.val()) {
                console.log(snapshot.val().picture)
                setVideo(snapshot.val().ylink)
                setHappening(snapshot.val().happening)
                setTitle(snapshot.val().title)
                setContext(snapshot.val().context)

                setDate(snapshot.val().date)
                setUserImg(snapshot.val().userImage)

                setLoading(false)
            } else {
                console.log("Error")
        
            }
        })
    }
   
    useEffect(() => {
        getEpisode(route.params.id)
    }, [])


    const changeShowVideo = () => {
        const sta = !videoBtn;
        setVideoBtn(sta)
    }


    const showVideo = () => {
        return(
            <View>
        
           
            <YoutubePlayer
                height={200}
                play={playing}
                videoId={video}
                onChangeState={onStateChange}
              />
              <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        
        
        
        
                
                <View style={{paddingRight:18,paddingLeft:18}}>
        
                
                <View style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center'}}>
                        <Image source={{uri:userImg}} style={{width: 40,
            height: 40,
            borderRadius: 150 / 2,
            overflow: "hidden",
            borderWidth: 3,
            }}/>
                    </View>
                    <View style={{marginLeft:12}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>
                        {title}
                        </Text>
                        <Text style={{fontSize:14,fontWeight:'200',color:'#758283'}}>
                        {context}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',marginLeft:23,flex:1}}>
                        <Icon name="share-social-outline" style={{fontSize:18,alignSelf:'flex-end',position:'absolute'}}/>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
        
        <Text style={{marginLeft:8,marginTop:6,fontSize:14,color:'#758283'}}>
        {moment(data).format("MMM Do YY")}      |  
        
        </Text>
        
        <Text style={{marginLeft:8,marginTop:6,fontSize:14,color:'#758283'}}>
              {moment(data).fromNow()}
        
        </Text>
        
                </View>
                <View style={{marginTop:12}}>
                <View
          style={{
            borderBottomColor: '#758283',
            borderBottomWidth: 0.50 ,
          }}
        />
                </View>
               
  
            
               
                </View>
            </View>

        )
    }
    if(loading){
        return <EmptyContainer />
    }
    else{
    return(
        <Container>
      <ScrollView style={{backgroundColor:'#fff'}}>
       
        <View>
        {videoBtn ? (
            showVideo()
        ): (
            null
        )}
<View style={{marginTop:22,marginLeft:25}}>         
{/* <Text style={{color:'#737373',fontSize:32,fontWeight:'bold',textDecorationLine: 'underline',textDecorationColor:'#FF0000',fontFamily:'sans-serif-medium',marginBottom:12}}>
    {title}
</Text> */}
</View>
<View style={{alignItems:'flex-end',marginRight:20}}>
            <TouchableOpacity onPress={() => changeShowVideo()} style={{backgroundColor:'#CA3E47',padding:8,borderRadius:8,marginLeft:12,marginTop:3}}>
                <Text style={{color:'#fff'}}>
                    Show Video
                </Text>
            </TouchableOpacity>
        </View>
            <View style={{alignItems:'center',padding:30}}>
       <Text style={{fontFamily:'serif',fontSize:18,textAlign: 'justify',
    lineHeight: 30,}}>
                {happening}
            </Text>




            </View>
            
        </View>
        </ScrollView>
        </Container>

    )
    }
}

export default ReadEpisodes;