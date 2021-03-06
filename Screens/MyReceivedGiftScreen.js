import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'

export default class MyReceivedGiftScreen  extends React.Component{
  constructor(){
    super()
    this.state={
      userId  : firebase.auth().currentUser.email,
      receivedGiftsList:[]
    }
    this.requestRef= null
  }
  getReceivedGiftsList =()=>{
    this.requestRef = db.collection("requested_gifts")
    .where('user_id','==',this.state.userId)
    .where("gift_status", '==','received')
    .onSnapshot((snapshot)=>{
      var receivedGiftsList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedGiftsList : receivedGiftsList
      });
    })
  }

  componentDidMount(){
    // this.getReceivedGiftsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.gift_name}
        subtitle={item.gift_status}
        /*  leftElement={
        <Image
            style={styles.LiImage}
            source={{
              uri: item.image_link,
            }}
            /> 
          }*/
        titleStyle={styles.titlestyle}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received Gifts" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedGiftsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Gifts</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedGiftsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  },
  LiImage:{
    height:RFValue(50),
    width:RFValue(50)
  },
  titlestyle:
  {
  color: 'black',
  fontWeight: 'bold'
},

})
  