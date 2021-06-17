import React from 'react';
import {View,Text,Button} from 'react-native'
import SignIn from '../screen/Signin'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import AddPost from "../screen/AddPost"
const Stack = createStackNavigator();


const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const MainTabScreen = () => {

  function AddPost({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to profile"
          onPress={() => navigation.jumpTo('AddPost')}
        />
      </View>
    );
  }
  
    return(

    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#E21717"
    barStyle={{ backgroundColor: '#E21717' }}
  >
    <Tab.Screen
      name="AddPost"
      component={AddPost}
      
      options={{
        tabBarLabel: 'AddPost',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="SignIn"
      component={SignIn}
      
      options={{
        tabBarLabel: 'SignIn',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
    />
      <Tab.Screen
      name="SignUp"
      component={SignIn}
      options={{
        tabBarLabel: 'SignIn',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="user" color={color} size={26} />
        ),
      }}
    />
       <Tab.Screen
      name="Profile"
      component={SignIn}
      options={{
        tabBarLabel: 'SignIn',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="profile" color={color} size={26} />
        ),
      }}
    />
    
  </Tab.Navigator>
  )
    }

export default MainTabScreen;


