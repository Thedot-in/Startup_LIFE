import React from 'react';
import {View,Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Video from "../screen/Video";
import {createStackNavigator} from '@react-navigation/stack'
import ReadEpisodes from '../screen/ReadEpisodes';


const Stack = createStackNavigator();
 

const EpisodePageNavigation = () => {
    return(

<>
       
          <Stack.Navigator
           screenOptions={{
            headerShown: false
          }}
          >
           
              <>
              <Stack.Screen name="Video" component={Video} />
              <Stack.Screen name="ReadEpisodes" component={ReadEpisodes} />
              </>
           
          </Stack.Navigator>
     
        </>  
    )
}

export default EpisodePageNavigation;