import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  TextInput,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { SearchBar, ListItem, Input } from "react-native-elements";

import MyHeader from "../Components/MyHeader";
// import { BookSearch } from "react-native-google-books";

export default class RequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      giftName: "",
      reasonToRequest: "",
      IsGiftkRequestActive: "",
      requestedGiftName: "",
      giftStatus: "",
      requestId: "",
      userDocId: "",
      docId: "",
      // Imagelink: "#",
      dataSource: "",
      // requestedImageLink: "",
      giftType:''
      // showFlatlist: false,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (giftName, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    // var books = await BookSearch.searchbook(
    //   giftName,
    //   "AIzaSyASyOjOtJla-X-b3io2eLoaUc_bIRFSIIc"
    // );


    db.collection("requested_gifts").add({
      user_id: userId,
      gift_name: giftName,
      reason_to_request: reasonToRequest,
      request_id: randomRequestId,
      gift_status: "requested",
      date: firebase.firestore.FieldValue.serverTimestamp(),
      // image_link: books.data[0].volumeInfo.imageLinks.thumbnail,
    });

    await this.getGiftRequest();
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            IsGiftRequestActive: true,
          });
        });
      });

    this.setState({
      giftName: "",
      reasonToRequest: "",
      giftType:"",
      requestId: randomRequestId,
    });

    return Alert.alert("gift Requested Successfully");
  };

  receivedGifts = (giftName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    db.collection("received_gifts").add({
      user_id: userId,
      gift_name: giftName,
      request_id: requestId,
      giftStatus: "received",
    });
  };

  getIsGiftRequestActive() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            IsGiftRequestActive: doc.data().IsGiftRequestActive,
            userDocId: doc.id,
          });
        });
      });
  }

  getGiftRequest = () => {
    // getting the requested book
    var giftRequest = db
      .collection("requested_gifts")
      .where("user_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().gift_status !== "received") {
            this.setState({
              requestId: doc.data().request_id,
              requestedGiftName: doc.data().gift_name,
              giftStatus: doc.data().gift_status,
              // requestedImageLink: doc.data().image_link,
              docId: doc.id,
            });
          }
        });
      });
  };

  sendNotification = () => {
    //to get the first name and last name
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().first_name;
          var lastName = doc.data().last_name;

          // to get the person id and book nam
          db.collection("all_notifications")
            .where("request_id", "==", this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var personId = doc.data().person_id;
                var giftName = doc.data().gift_name;

                //targert user id is the person id to send notification to the user
                db.collection("all_notifications").add({
                  targeted_user_id: personId,
                  message:
                    name + " " + lastName + " received the gift " + giftName,
                  notification_status: "unread",
                  gift_name: giftName,
                });
              });
            });
        });
      });
  };

  componentDidMount() {
    this.getGiftRequest();
    this.getIsGiftRequestActive();
  }

  updateGiftRequestStatus = () => {
    //updating the gift status after receiving the gift
    db.collection("requested_gifts").doc(this.state.docId).update({
      gift_status: "received",
    });

    //getting the  doc id to update the users doc
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //updating the doc
          db.collection("users").doc(doc.id).update({
            IsGiftRequestActive: false,
          });
        });
      });
  };
/*
  async getBooksFromApi(bookName) {
    this.setState({ bookName: bookName });
    if (bookName.length > 2) {
      var books = await BookSearch.searchbook(
        bookName,
        "AIzaSyASyOjOtJla-X-b3io2eLoaUc_bIRFSIIc"
      );
      this.setState({
        dataSource: books.data,
        showFlatlist: true,
      });
    }
  }

  //render Items  functionto render the books from api
  renderItem = ({ item, i }) => {


    let obj = {
      title: item.volumeInfo.title,
      selfLink: item.selfLink,
      buyLink: item.saleInfo.buyLink,
      imageLink: item.volumeInfo.imageLinks,
    };

    return (
      <TouchableHighlight
        style={styles.touchableopacity}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.setState({
            showFlatlist: false,
            bookName: item.volumeInfo.title,
          });
        }}
        bottomDivider
      >
        <Text> {item.volumeInfo.title} </Text>
      </TouchableHighlight>
    );
  };
*/
  render() {
    if (this.state.IsGiftRequestActive === true) {
      return (
        <View style={{ flex: 1}}>
          <View
            style={{
              flex: 0.1,
            }}
          >
            <MyHeader title="Gift Status" navigation={this.props.navigation} />
          </View>
          <View
            style={styles.ImageView}
          >
            {/* <Image
              source={{ uri: this.state.requestedImageLink }}
              style={styles.imageStyle}
            /> */}
          </View>
          <View
            style={styles.giftstatus}
          >
            <Text
              style={{
                fontSize: RFValue(20),

              }}
            >
              Name of the gift
            </Text>
            <Text
              style={styles.requestedGiftName}
            >
              {this.state.requestedGiftName}
            </Text>
            <Text
              style={styles.status}
            >
              Status
            </Text>
            <Text
              style={styles.giftStatus}
            >
              {this.state.giftStatus}
            </Text>
          </View>
          <View
            style={styles.buttonView}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.sendNotification();
                // this.updateGiftRequestStatus();
                this.receivedGifts(this.state.requestedGiftName);
              }}
            >
              <Text
                style={styles.buttontxt}
              >
                Gift Recived
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Request Gift" navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 0.9 }}>
          <Input
            style={styles.formTextInput}
            label={"Gift Name"}
            placeholder={"Gift name"}
            containerStyle={{ marginTop: RFValue(60) }}
            
            onChangeText={(text) => this.setState({ giftName: text })}
            // onChangeText={(text) => this.getBooksFromApi(text)}
            // onClear={(text) => this.getBooksFromApi("")}
            value={this.state.giftName}
          />
          <Input
            style={styles.formTextInput}
            label={"Gift Type"}
            placeholder={"Gift Type"}
            containerStyle={{ marginTop: RFValue(60) }}
            
            onChangeText={(text) => this.setState({ giftType: text })}
            // onChangeText={(text) => this.getBooksFromApi(text)}
            // onClear={(text) => this.getBooksFromApi("")}
            value={this.state.giftType}
          />
         
            <KeyboardAvoidingView style={{ alignItems: "center" }}>
              <Input
                style={styles.textInput}
                containerStyle={{ marginTop: RFValue(30) }}
                multiline={true}
                numberOfLines={8}
                label={"Description"}
                placeholder={"Tell me about your gift"}
                onChangeText={(text) => {
                  this.setState({
                    reasonToRequest: text,
                  });
                }}
                value={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: RFValue(30) }]}
                onPress={() => {
                  this.addRequest(
                    this.state.giftName,
                    this.state.reasonToRequest
                  );
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >Request
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    borderWidth: 1,
    padding: 10,
  },
  textInput: {
    width: "75%",
    height: RFValue(155),
    borderWidth: 1,
    padding: 10,
  },
  ImageView:{
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
  },
  imageStyle:{
    height: RFValue(150),
    width: RFValue(150),
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: RFValue(10),
  },
  giftstatus:{
    flex: 0.4,
    alignItems: "center",

  },
  requestedGiftName:{
    fontSize: RFValue(30),
    fontWeight: "500",
    padding: RFValue(10),
    fontWeight: "bold",
    alignItems:'center',
    marginLeft:RFValue(60)
  },
  status:{
    fontSize: RFValue(20),
    marginTop: RFValue(30),
  },
  giftStatus:{
    fontSize: RFValue(30),
    fontWeight: "bold",
    marginTop: RFValue(10),
  },
  buttonView:{
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontxt:{
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#fff",
  },
  touchableopacity:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "90%",
  },
  requestbuttontxt:{
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#56f567",
  },
  button: {
    width: "75%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
