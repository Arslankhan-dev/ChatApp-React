import { useEffect, useState } from "react";
import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-web";
import firebase from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { async } from "@firebase/util";

function Home(props) {
  const [msg, setMsg] = useState("");
  const db = getFirestore(firebase);
  const [data, setData] = useState([]);

  const { collectionName } = props.route.params;

  let unsubscribe;
  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("time", "asc"));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chat = [];
      querySnapshot.forEach((doc) => {
        chat.push(doc.data());
        console.log(doc.data());
      });
      setData(chat);
    });
    return unsubscribe;
  }, []);

  const onSendPressed = async () => {
    try {
      // const auth = getAuth()
      if (msg)
        await addDoc(collection(db, collectionName), {
          msg: msg,
          msgFrom: getAuth().currentUser.email,
          time: serverTimestamp(),
        });
      setMsg("");
    } catch (e) {
      alert(e.message);
    }
  };
  // alert(getAuth().currentUser.email)
  return (
    <View style={styles.container1}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={
                getAuth().currentUser.email == item.msgFrom
                  ? {
                      backgroundColor: "#333dff",
                      width: "40%",
                      padding: 10,
                      margin: 5,
                      borderRadius: 20,
                      alignSelf: "flex-end",
                    }
                  : {
                      backgroundColor: "#666eff",
                      width: "40%",
                      padding: 10,
                      margin: 5,
                      borderRadius: 20,
                    }
              }
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {getAuth().currentUser.email == item.msgFrom
                  ? "You"
                  : item.msgFrom}
              </Text>
              <Text style={{ color: "white" }}>{item.msg}</Text>
              {item.time ? (
                <Text style={{ fontSize: 8, color: "white" }}>
                  {item.time.toDate().toUTCString()}
                </Text>
              ) : null}
            </View>
          );
        }}
      />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Type Your Message..."
          value={msg}
          style={styles.text}
          onChangeText={setMsg}
        />
        <TouchableOpacity
          onPress={() => onSendPressed()}
          style={styles.btnImageContainer}
        >
          <Image
            style={styles.btnImage}
            source={require("../../assets/send.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    width: "90%",
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
    // margin:30,
  },
  TextInput: {
    borderWidth: 1,
    border: 1,
    margin: 5,
    padding: 8,
  },
  btnImage: {
    height: 50,
    width: 50,
    alignItems: "center",
    marginRight: 10,
  },
  btnImageContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});

export default Home;
