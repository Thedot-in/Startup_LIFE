import React,{useState,useEffect,useCallback, useRef} from 'react';
import {View,Image, TouchableOpacity} from 'react-native'
import moment from 'moment';
import YouTube from 'react-native-youtube';
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

  import YoutubePlayer from "react-native-youtube-iframe";

const SeeEpisodes = ({item,navigation}) => {
    console.log(item.ylink)



    const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  const episodeShow = (id) => {
    navigation.navigate('ReadEpisodes',{id:id})
  }


return (
<View style={{marginBottom:8,backgroundColor:'#fff'}}>
    <View>
        
           
    <YoutubePlayer
        height={200}
        play={playing}
        videoId={item.ylink}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
 <View style={{paddingRight:18,paddingLeft:18,paddingBottom:18}}>

        
        <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
                <Image source={{uri:item.userImage}} style={{width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    }}/>
            </View>
            <View style={{marginLeft:12}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>
                {item.title}
                </Text>
                <Text style={{fontSize:14,fontWeight:'200',color:'#758283'}}>
                {item.context}
                </Text>
            </View>
            <View style={{justifyContent:'center',marginLeft:23,flex:1}}>
                <Icon name="share-social-outline" style={{fontSize:18,alignSelf:'flex-end',position:'absolute'}}/>
            </View>
        </View>
        <View style={{flexDirection:'row'}}>

<Text style={{marginLeft:8,marginTop:6,fontSize:14,color:'#758283'}}>
{moment(item.date).format("MMM Do YY")}      |  

</Text>

<Text style={{marginLeft:8,marginTop:6,fontSize:14,color:'#758283'}}>
      {moment(item.date).fromNow()}

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
       
        <Text style={{fontSize:15,color:'#000',marginTop:6}} numberOfLines={4}>
                {item.happening}
                </Text>
     
            <TouchableOpacity style={{alignItems:'center',marginTop:18}} onPress={() => episodeShow(item.id)}>
                <Text style={{fontWeight:'bold',color:'#E21717'}}>
                    See What happened ✌️
                </Text>
            </TouchableOpacity>
       
        </View>
    </View>
</View>
    )

}


export default SeeEpisodes;