import React from 'react'
import AddPost from '../screen/AddPost'
import SignIn from '../screen/Signin'
import SignUp from '../screen/Signup'
import Home from '../screen/Home'
import Profile from '../screen/Profile'
import Video from '../screen/Video'
import Listing from '../screen/Listing'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomePostNavigation from '../components/HomePostNavigation'
import ProfilePostNavigation from '../components/ProfilePostNavigation'



import {useDispatch, connect} from 'react-redux'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Read from '../screen/Read'
import ListPostNavigation from './ListPostNavigation'
import EpisodePageNavigation from './EpisodePageNavigation'



const Tab = createMaterialBottomTabNavigator();


const HomeScreenNavigation = () => {
    return(

        <>  
        <Tab.Navigator
          backBehavior='initialRoute'
          screenOptions={{
            header: (props) => <CustomHeader {...props} />
          }}
          tabBarOptions={{
            activeTintColor: '#CA3E47',
          }}
          activeColor="#fff"
        barStyle={{ backgroundColor: '#CA3E47' }}
          >
               <Tab.Screen name="Home" component={HomePostNavigation} 
               options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),}}
               
               />
                <Tab.Screen name="EpisodePageNavigation" component={EpisodePageNavigation} 
                options={{
                  tabBarLabel: 'Podcast',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="video" color={color} size={26} />
                  ),}}
               />
               <Tab.Screen name="Listing" component={ListPostNavigation} 
                options={{
                  tabBarLabel: 'Listing',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="post" color={color} size={26} />
                  ),}}
               />
                <Tab.Screen name="Profile" component={ProfilePostNavigation} 
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                  ),}}
               />
           
          
              </Tab.Navigator>
              
              </>
    )
}

export default HomeScreenNavigation;