import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";

export default class GiftScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      requestedGiftsList: [],
    };
    this.requestRef = null;
  }

  getRequestedGiftsList = () => {
    this.requestRef = db
      .collection("requested_gifts")
      .onSnapshot((snapshot) => {
        var requestedGiftsList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedGiftsList: requestedGiftsList,
        });
      });
  };

  componentDidMount() {
    this.getRequestedGiftsList();
  }

  componentWillUnmount() {
  this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    console.log(item.gift_name,item.reason_to_request)
    return (
      <ListItem
        key={i}
        title={item.gift_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RecieverDetailScreen", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#ffff" }}>Receiver Detail</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <MyHeader title="Gift List" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.requestedGiftsList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Gifts</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedGiftsList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
  },
  view:{
    flex: 1,
    backgroundColor: "#fff"
  }
});
