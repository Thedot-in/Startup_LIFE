import React, {useEffect} from 'react'

import 'react-native-gesture-handler'

import auth from '@react-native-firebase/auth'

import Listing from '../screen/Listing'
import ReadCompany from '../screen/ReadCompany'
import CustomHeader from '../layout/CustomHeader'


import AddPost from '../screen/AddPost'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {useDispatch, connect} from 'react-redux'
import database from '@react-native-firebase/database'
const Stack = createStackNavigator();


const ListPostNavigation = () => {
    return(
        <>
       
          <Stack.Navigator
           screenOptions={{
            headerShown: false
          }}
          >
           
              <>
              <Stack.Screen name="Listing" component={Listing} />
              <Stack.Screen name="ReadCompany" component={ReadCompany} />
              {/* <Stack.Screen name="AddPost" component={AddPost} /> */}


  
  
              </>
           
          </Stack.Navigator>
     
        </>  
    )
}

export default ListPostNavigation;