import React, {useEffect} from 'react'

import 'react-native-gesture-handler'

import auth from '@react-native-firebase/auth'

import Home from '../screen/Home'
import Read from '../screen/Read'
import CustomHeader from '../layout/CustomHeader'


import AddPost from '../screen/AddPost'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {useDispatch, connect} from 'react-redux'
import database from '@react-native-firebase/database'
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
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Read" component={Read} />
              <Stack.Screen name="AddPost" component={AddPost} />


  
  
              </>
           
          </Stack.Navigator>
     
        </>  
    )
}

export default HomePostNavigation;