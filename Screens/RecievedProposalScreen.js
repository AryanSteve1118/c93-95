import React from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import {Input} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize'

export default class RecievedProposalScreen  extends React.Component{
  constructor(){
    super()
    this.state={
      description:"",
    }
  }
  render(){
    return (
        <View style={styles.container}>
          <Input
            style={styles.textInput}
            containerStyle={{ marginTop: RFValue(30) }}
            multiline={true}
            numberOfLines={8}
            label="Description"
            placeholder="Description"
            value={this.state.description}
          />
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.abutton} >
          <Text >ACCEPT</Text>
          </TouchableOpacity>
         <TouchableOpacity style={styles.dbutton}>
          <Text >DECLINE</Text>
          </TouchableOpacity>
          </View>
        </View>
      );
  }
   
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formTextInput: {
      width: 200,
      height: 35,
      borderWidth: 1,
      padding: 10,
    },
    abutton: {
      
      width: 150,
      height:30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: "green",
      marginHorizontal:50,
    },
      dbutton: {
        // marginBottom:0,
        width: 150,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "red",
        marginHorizontal:50,
      },
      });

      /*
marginHorizontal:-100,
      marginVertical:-10,
      marginTop:10

 marginHorizontal:50,
        marginVertical:-14


      */