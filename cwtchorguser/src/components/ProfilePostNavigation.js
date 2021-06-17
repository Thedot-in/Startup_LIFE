import React, {useEffect} from 'react'

import 'react-native-gesture-handler'

import auth from '@react-native-firebase/auth'

import Home from '../screen/Home'
import Read from '../screen/Read'
import Profile from '../screen/Profile'
import Editor from '../screen/Editor'

import Company from '../screen/Company'




import CustomHeader from '../layout/CustomHeader'


import AddPost from '../screen/AddPost'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {useDispatch, connect} from 'react-redux'
import database from '@react-native-firebase/database'
import EditorPageNavigation from './EditorPageNavigation'
const Stack = createStackNavigator();


const HomePostNavigation = () => {
    return(
        <>
       
          <Stack.Navigator
           screenOptions={{
            headerShown: false
          }}
          >
           
              <>
              <Stack.Screen name="Profile" component={Profile} />

              <Stack.Screen name="Editor" component={Editor} />
              <Stack.Screen name="EditorPageNavigation" component={EditorPageNavigation} />

    



  
  
              </>
           
          </Stack.Navigator>
     
        </>  
    )
}

export default HomePostNavigation;