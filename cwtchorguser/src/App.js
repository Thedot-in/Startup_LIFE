import React, {useEffect} from 'react'

import 'react-native-gesture-handler'

import auth from '@react-native-firebase/auth'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {useDispatch, connect} from 'react-redux'

import AddPost from './screen/AddPost'
import SignIn from './screen/Signin'
import SignUp from './screen/Signup'
import Home from './screen/Home'
import Profile from './screen/Profile'
import Video from './screen/Video'
import Read from './screen/Read'
import CustomHeader from './layout/CustomHeader'
import Post from './components/Post'

import {SET_USER, IS_AUTHTHENTICATED} from './action/action.types'

import database from '@react-native-firebase/database'
import EmptyContainer from './components/EmptyContainer'
import {requestPermission} from './utils/AskPermission'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// LOGOS https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/MaterialCommunityIcons.json
const Stack = createStackNavigator();
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreenNavigation from './components/HomeScreenNavigation'

const Tab = createMaterialBottomTabNavigator();

const App =({authState}) => {

  const dispatch = useDispatch();


  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })

      console.log(user._user.uid)

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAILS', snapshot.val())
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          })
        })


    } else {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false
      })
    }
  }

  useEffect(() => {
    requestPermission()
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    return susbcriber;
  }, [])

  if (authState.loading) {
      return <EmptyContainer/>
  }

    return(
        
      <>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
        }}
        >
          {authState.isAuthenticated ? (
            <>
            <Stack.Screen name="Home" component={HomeScreenNavigation} />
            <Stack.Screen name="Read" component={Read} />
            <Stack.Screen name="Post" component={Post}/>


            </>
          ) : (
            <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </>  
        
    )
}





const mapStateToProps = (state) => ({
  authState: state.auth
})

export default connect(mapStateToProps)(App)