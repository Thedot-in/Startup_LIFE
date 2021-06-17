import React from 'react';
import {View,Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddPost from "../screen/AddPost";
import Addepisode from "../screen/Addepisode"
import AddListing from "../screen/AddListing"


const Tab = createMaterialTopTabNavigator();    

const EditorPageNavigation = () => {
    return(
<>
<Tab.Navigator>
      <Tab.Screen name="Add Post" component={AddPost} />
      <Tab.Screen name="Add Episode" component={Addepisode} />
      <Tab.Screen name="Add Listing" component={AddListing} />

    </Tab.Navigator>

</>
    )
}

export default EditorPageNavigation;