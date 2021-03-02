import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import MyHeader from "../Components/MyHeader.js";
import firebase from "firebase";
import db from "../config.js";

export default class MyDonationScreen extends Component {
  constructor() {
    super();
    this.state = {
      personId: firebase.auth().currentUser.email,
      personName: "",
      allDonations: [],
    };
    this.requestRef = null;
  }

  static navigationOptions = { header: null };

  getPersonDetails = (personId) => {
    db.collection("users")
      .where("email_id", "==", personId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            personName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

  getAllDonations = () => {
    this.requestRef = db
      .collection("all_gifts")
      .where("person_id", "==", this.state.personId)
      .onSnapshot((snapshot) => {
        var allDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation["doc_id"] = doc.id;
          allDonations.push(donation);
        });
        this.setState({
          allDonations: allDonations,
        });
      });
  };

  sendGift = (giftDetails) => {
    if (giftDetails.request_status === "Gift Sent") {
      var requestStatus = "Person Interested To Gift";
      db.collection("all_donations").doc(giftDetails.doc_id).update({
        request_status: "Person Interested To Gift",
      });
      this.sendNotification(giftDetails, requestStatus);
    } else {
      var requestStatus = "Gift Sent";
      db.collection("all_gifts").doc(giftDetails.doc_id).update({
        request_status: "Gift Sent",
      });
      this.sendNotification(GiftDetails, requestStatus);
    }
  };

  sendNotification = (GiftDetails, requestStatus) => {
    var requestId = GiftDetails.request_id;
    var personId = GiftDetails.person_id;
    db.collection("all_notifications")
      .where("request_id", "==", requestId)
      .where("person_id", "==", personId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = "";
          if (requestStatus === "Gift Sent") {
            message = this.state.personName + " sent you gift";
          } else {
            message =
              this.state.personName + " has shown interest in donating the gift";
          }
          db.collection("all_notifications").doc(doc.id).update({
            message: message,
            notification_status: "unread",
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.gift_name}
      subtitle={
        "Requested By : " +
        item.requested_by +
        "\nStatus : " +
        item.request_status
      }
      leftElement={<Icon name="gift" type="font-awesome" color="#696969" />}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.request_status === "Gift Sent" ? "green" : "#ff5722",
            },
          ]}
          onPress={() => {
            this.sendGift(item);
          }}
        >
          <Text style={{ color: "#ffff" }}>
            {item.request_status === "Gift Sent" ? "Gift Sent" : "Send Gift"}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.getPersonDetails(this.state.personId);
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="Gift List" />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all Gifts</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
