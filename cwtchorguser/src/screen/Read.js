import React,{useEffect,useState} from 'react'
import {View,Text,Image,SafeAreaView,ScrollView, TouchableOpacity} from 'react-native'
import database from '@react-native-firebase/database';
// import {getPostById} from '../action/post'
import EmptyContainer from '../components/EmptyContainer'
import {Right,Left,H3,  Fab,Icon,Container} from 'native-base'
import Tts from 'react-native-tts';
import { Button } from 'react-native-paper';
import { material,sanFranciscoSpacing,robotoWeights} from 'react-native-typography'
const Read = ({route}) => {
    
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')
    const [readingStatus,setReadingStatus] = useState(false)
    const [story, setStory] = useState('')
    const [uid, setUid] = useState('')
    const [numberOfHearts, setNumberOfHearts] = useState([])


    const [loading,setLoading] = useState(true)
    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)

    useEffect(() => {

  
    }, [numberOfHearts])
        const giveClaps = () => {
          console.log('Enter')
          console.log(route.params.id);
            database()
            .ref(`/posts/${route.params.id}/vote/${uid}`)
            .push({
              upvote: 1
            })
            .then(() => console.log('UPVOTED'))
        }

        const readStory = async () => {
            setReadingStatus(true)
            try{
            Tts.getInitStatus().then(() => {
                const STORY = story
                console.log(STORY)
                Tts.speak(STORY, {
                    androidParams: {
                      KEY_PARAM_PAN: 0,
                      KEY_PARAM_VOLUME: 5,
                      KEY_PARAM_STREAM: 'STREAM_MUSIC',
                    },
                  })

              }, (err) => {
                if (err.code === 'no_engine') {
                  Tts.requestInstallEngine();
                }});
              Tts.addEventListener('tts-finish', (event) =>setReadingStatus(false));
            }
            catch(err){
                console.log(err)
                setReadingStatus(false)
            }
            //   Tts.setDucking(true);
            //   Tts.voices().then(voices => console.log(voices));
           
        }

        const stopStory = () => {
            Tts.stop();

            setReadingStatus(false)
        }
        const getPostById = (ID) => {
            setLoading(true)

            database()
            .ref(`/posts/${ID}`)
            .on('value', (snapshot) => {
         
                if (snapshot.val()) {
                  var cont= 0 
                    console.log(snapshot.val().picture)
                    setLocation(snapshot.val().location)
                    setDescription(snapshot.val().description)
                    setStory(snapshot.val().story)
                    setImage(snapshot.val().picture)
                    setAuthor(snapshot.val().by)
                    setUid(snapshot.val().userId)

                    setLoading(false)
                } else {
                    console.log("Error")
            
                }
            })
        }


        useEffect(()=>{
            // getPostById(route.params.id)

            getPostById(route.params.id)

        },[]);

       
   if(loading){
      return <EmptyContainer/>
   }
   else{
   return (
    <Container>
      <ScrollView style={{backgroundColor:'#fff'}}>
        <View>
          {readingStatus ? (
      <ScrollView style={{backgroundColor:'#fff'}}>

           <View style={{padding:40}}>
              <Text style={{fontSize:18,lineHeight: 30}}>
                {story}
              </Text>
             </View>
</ScrollView>
          ) : (
            <>
            <Image
            style={{height:220}}
            source={{uri:image}}
    />
      <View style={{padding:20}}>
<View>
  <View>
    
  </View>
</View>
 <Text style={{fontFamily:'serif',textAlign: 'justify',
lineHeight: 30,fontSize:18}}>
       {story}
   </Text>
 </View>
 </>
          )

          }
       
        </View>
    {/* <View
            style={{ height: '50%', width: '100%',position: 'relative',backgroundColor:'black'}}
    
    >
    {console.log("Image",image)}

    <ImageBackground  
            source={{uri:image}}
            style={{height: '100%', width: '100%', flex: 1,opacity: 0.5}}
          />
    </View>  */}
    {/* <Image
        source={{uri:image}}
        style={{height:'30%',width:'100%'}}
    />
   */}
       {/* <Text style={{color:'#E21717', fontWeight:'bold'}}>
           {author}
       </Text> */}
       {/* <View style={{padding:15,borderRadius:12}}>

        <View style={{padding:20,backgroundColor:'#EF5354',borderRadius:12}}>
        <Text
            style={{fontSize:8,fontSize: 20,color:'white',
                letterSpacing: sanFranciscoSpacing(34)}}
        >
           {description}
       </Text>
       <View style={{alignItems:'center',padding:20}}>
       <View style={{marginTop:12,backgroundColor:'white',padding:2,borderRadius:4}}>
       <Text style={{fontWeight:'bold'}}>
            {numberOfHearts} Claps
       </Text>
       </View>
        </View>
       </View>
       
        </View> */}
{/* <View style={{alignItems:'center'}}>
    {!readingStatus ? (
            <Button onPress={()=>readStory()} icon="play" mode="contained">
            Read for me
          </Button>
    ) : (
        <Button onPress={()=>stopStory()} icon="play" mode="contained" loading>
        Stop
      </Button>

    )}

</View> */}


   
  
       </ScrollView>
    
       <Fab style={{backgroundColor:'black'}}
           position="bottomRight"
           onPress={() => giveClaps()}
       > 
       
     <Icon feather  name='paw' style={{fontSize: 30, color: 'white'}}/>
       </Fab>

       {!readingStatus ? (
          
           <Fab style={{backgroundColor:'black'}}
           position="bottomRight"
           onPress={() => readStory()}
       > 
       
     <Icon feather  name='paw' style={{fontSize: 30, color: 'white'}}/>
       </Fab>
    ) : (
       
        <Fab style={{backgroundColor:'black'}}
        position="bottomRight"
        onPress={() =>stopStory()}
    > 
    
  <Icon feather  name='mic-off' style={{fontSize: 30, color: 'white'}}/>
    </Fab>

    )}
       </Container>
      )
   }
        
    
}


export default Read