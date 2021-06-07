import React,{useState,useEffect} from 'react';
import {View,SafeAreaView,ScrollView,StyleSheet,Image,FlatList} from 'react-native'
import { Searchbar,H1 } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {getListing} from '../action/listing';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import List from '../components/List';
import EmptyContainer from '../components/EmptyContainer';




const Listing = ({getListing, postState,navigation,userDetails}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  useEffect(() => {
    getListing()
  }, [])
    

    if(postState.loading){
      return <EmptyContainer/>
  }
    return(
 
        <SafeAreaView>
          {postState.listing == null ? (

            <Text>
              Sorry no Listing available
            </Text>
          ) : (
            <ScrollView>
<View style={styles.searchBar}>
                    <Text style={styles.cmpTxt}>
                        Company Listing
                    </Text>
                    <Text style={{color:'white',fontSize:12,alignSelf:'center'}}>
                        A List Of Compaines Curated by Startup LIFE Media
                    </Text>
                    <View style={styles.searchView}>
                    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
                    </View>
            </View>
            

         <FlatList
            style={{marginBottom:23}}
            data={postState.listing}
            keyExtractor = {(item) => item.id}
            renderItem={({item,index,separators})=>(
                
               <List item={item} userDetails={userDetails} key={item.id} navigation={navigation}/>
            )}
            ListEmptyComponent={() => (
                <Container style={styles.emptyContainer}>
                  <H1>No post found</H1>
                </Container>
              )}
             >


         </FlatList>
         
         
         </ScrollView>

          )

          }
          
          
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBar:{
        backgroundColor:'#242B2E'
    },
    cmpTxt: {
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        alignSelf:'center',
        marginTop:33,
        marginBottom:12
    },
    searchView:{
        padding:20,
        marginBottom:23
    }
})


Listing.propTypes = {
  getListing: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object

}

const mapStateToProps = (state) => ({
  postState: state.listing,
  userDetails: state.auth.user
})

const mapDispatchToProps = {
  getListing
}


export default connect(mapStateToProps,mapDispatchToProps)(Listing)