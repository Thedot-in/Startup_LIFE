import React from 'react'
import {View,StyleSheet} from 'react-native';
import {Container, Spinner} from 'native-base';


const EmptyContainer = () => {
    return(
        <Container>
                <Spinner/>
        </Container>
    )
}


const styles = StyleSheet.create({
    emptyContainer:{
        flex: 1,
        backgroundColor:"#1b262c",
        justifyContent:'center',
        alignItems: 'center'
    }
})


export default EmptyContainer