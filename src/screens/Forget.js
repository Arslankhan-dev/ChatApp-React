import { useEffect, useState } from "react";
import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Button, 
} from "react-native";
import TouchableText from "./../../src/components/TouchableText";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Forget(props) {
  const [email, setEmail] = useState("")

  const [isEmailValid, setisEmailValid] = useState(false)

  useEffect(() => {
    if (email.includes(".com") && email.includes("@")) {
      setisEmailValid(true)
    } else {
      setisEmailValid(false)
    }
  }, [email])
  const onRestorePressed = () => {
    const auth = getAuth()
    sendPasswordResetEmail(auth, email)
      .then((user) => {
        // const user = userCredential.user
        alert(
          "We Have Send an Email to address,Please Check Mailbox to Restore"
        )
      })
      .catch((e) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert("User don't Created because" + e.message)
      })
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("./../../assets/logo.png")}
      />

      <TextInput
        placeholder="Enter Email"
        value={email}
        style={styles.TextInput}
        // onChangeText={() => setEmail()}
        onChangeText={setEmail}
      />
      {!isEmailValid ? (
        <Text style={{ color: "red" }}>Invalid Email</Text>
      ) : null}

      <Button title="Restore" onPress={() => onRestorePressed()} />

      <TouchableText
        //  onPress={() => {props.navigation.goBack()}}
        onPress={() => props.navigation.navigate("Login")}
        text={"Already have Account, Login"}
        style={{ alignSelf: "center" , margin: 4 }}
        textStyle={{ color: "blue" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // fontWeight: 'bold',
    // fontSize:'40',
    // color: 'black',
    // margin:30,
    width: "90%",
    height: 40,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
    margin: 30,
  },
  TextInput: {
    borderWidth: 1,
    height: 60,
    width: 200,
    margin: 5,
    padding: 8,
    borderRadius: 25
  },
})

export default Forget;
