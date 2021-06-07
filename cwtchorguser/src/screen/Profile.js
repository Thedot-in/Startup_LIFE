import React, { Component }  from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
  import {signOut} from '../action/auth'

  import { Chip,Button } from 'react-native-paper';
import  EpemtyContainer from '../components/EmptyContainer'
import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {
    Header,
    Body,
    Right,
    Icon,
    Title,

} from 'native-base'
const Profile = ({signOut, authState, navigation}) => {
    console.log(authState)
    const dataSource = [
        "Fintech", "Team", "Bootstraped", "Idea", "EVs"
        ]
        const dataSourceIcon = [
            "finance", "arm-flex", "bootstrap", "brain", "car-electric"
            ]

        if(authState){
    return(
        <>
<View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: authState.user.image}}/>

                <Text style={styles.name}>{authState.user.name}</Text>
                <Text style={styles.userInfo}>{authState.user.bio}</Text>
                <Text style={styles.userInfo}>{authState.user.country}</Text>
            </View>
          </View>

         
      </View>
     
      <View style={styles.body}>
          <View style={{alignItems:'center'}}>
          <Text style={{color:'#242B2E',marginTop:12}}>
                  YOUR INTERESTS
              </Text>
          </View>
      
              <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:12}}>
{
 dataSource.map((item, index) => {
   return (
    <View 
    key={index} 
    style={{
    margin: 5,
    flexWrap: 'wrap',
    }}>
       <Chip
       icon={dataSourceIcon[index]}
       key={index}
       mode="outlined" //changing display mode, default is flat.
       height={30} //give desirable height to chip
       textStyle={{ color:'black',fontSize: 15 }} //label properties
     
       >
      
      {item}
      </Chip>
  </View>
);
})}
</View>


<View
  style={{
    borderBottomColor: '#758283',
    borderBottomWidth: 0.50 ,
    marginTop:23
  }}
/>
          </View>
  
          <View style={{backgroundColor:'#fff',padding:30}}>
            <Button color="blue" style={{marginBottom:22}} dark={true} compact={true} color='#CA3E47' icon="send" mode="contained" onPress={()=>{navigation.navigate('Editor')}}>
              Editor
            </Button>
            {/* <Button color="blue" style={{marginBottom:12}} dark={false} compact={true} color='#fff' icon="logout" mode="contained" onPress={()=>{navigation.navigate('Company')}}>
              Add Company
            </Button> */}

  <Button style={{bottom:0}} color="blue" dark={true} compact={true} color='#242B2E' icon="logout" mode="contained" onPress={() => signOut()}>
  Quit
            </Button>
  </View>
        </>
    )
          }
          else{
            <EpemtyContainer />
          }
}


const styles = StyleSheet.create({
    header:{
      backgroundColor: "#fff",
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },
    name:{
      fontSize:22,
      color:"#000000",
      fontWeight:'600',
    },
    userInfo:{
      fontSize:16,
      color:"#DE4839",
      fontWeight:'600',
    },
    body:{
      backgroundColor: "#fff",
      height:500,
      flex:1,
      padding:20
   
    },
    item:{
      flexDirection : 'row',
    },
    infoContent:{
      flex:1,
      alignItems:'flex-start',
      paddingLeft:5
    },
    iconContent:{
      flex:1,
      alignItems:'flex-end',
      paddingRight:5,
    },
    icon:{
      width:30,
      height:30,
      marginTop:20,
    },
    info:{
      fontSize:18,
      marginTop:20,
      color: "#FFFFFF",
    }
  });

const mapStateToProps = (state) => ({
    authState: state.auth
})

const mapDispatchToProps = {
    signOut
}

Profile.prototypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps )(Profile);