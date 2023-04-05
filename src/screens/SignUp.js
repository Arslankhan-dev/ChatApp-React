import { useEffect, useState } from "react";
import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
 
  TextInput,
  Button
} from "react-native";
import firebase from "../config/firebase";
import TouchableText from "./../../src/components/TouchableText";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc , doc , getFirestore} from "firebase/firestore"
import * as Location from 'expo-location';

function SignUp(props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordValid, setisPasswordValid] = useState(false)
  const [isEmailValid, setisEmailValid] = useState(false)

  const [location, setLocation] = useState(null)
  const db = getFirestore(firebase)

  const loadLocation = async () =>{
    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }
  useEffect(() => {
    if (email.includes(".com") && email.includes("@")) {
      setisEmailValid(true)
    } else {
      setisEmailValid(false)
    }
    if (password.length > 4) {
      setisPasswordValid(true)
    } else {
      setisPasswordValid(false)
    }
    loadLocation()
  }, [email, password])

  const onSignupPressed = () => {
    const auth = getAuth()
    if(email.length && password.length && firstName.length && lastName.length && address.length && age.length){
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

        await setDoc(doc(db,"Users",email),{
          firstName,
          lastName,
          address,
          age,
          location
        })

        const user = userCredential.user
      alert('User Successfully Created')
       
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
       alert("User don't Created because"+errorMessage)
      
      })
  }
  else{
    alert('Kindly Fill All The Fields')
  }
}
  return (
   
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 , marginTop: 20}}
        source={require("./../../assets/logo.png")}
      />
         <TextInput
        placeholder="Enter First Name*"
        value={firstName}
        style={styles.TextInput}
        // onChangeText={() => setEmail()}
        onChangeText={setFirstName}
      />
         <TextInput
        placeholder="Enter Last Name*"
        value={lastName}
        style={styles.TextInput}
        // onChangeText={() => setEmail()}
        onChangeText={setLastName}
      />
         <TextInput
        placeholder="Enter Address*"
        value={address}
        style={styles.TextInput}
        // onChangeText={() => setEmail()}
        onChangeText={setAddress}
      />
         <TextInput
        placeholder="Enter Age*"
        value={age}
      
        style={styles.TextInput}
        // onChangeText={() => setEmail()}
        onChangeText={setAge}
      />

      <TextInput
        placeholder="Enter Email*"
        value={email}
        style={styles.TextInput}
        // onChangeText={() => setEmail()}
        onChangeText={setEmail}
      />
      {!isEmailValid ? (
        <Text style={{ color: "red" }}>Invalid Email</Text>
      ) : null}

      <TextInput
        placeholder="Enter Password*"
        value={password}
        style={styles.TextInput}
        secureTextEntry={true}
        keyboardType={"numeric"}
        // onChangeText={() => setPassword()}
        onChangeText={setPassword}
      />
      {!isPasswordValid ? (
        <Text style={{ color: "red" }}>
          Password length should be greater then 6...
        </Text>
      ) : null}

      <Button title="SignUp" onPress={() => onSignupPressed()} />

      <TouchableText
        onPress={() => props.navigation.navigate("Forget")}
        text={"Forget Password?"}
        style={{ alignSelf: "flex-end", margin:10 }}
        textStyle={{ color: "blue" }}
      />

      <TouchableText
        text={"Already Have Account, Login"}
        //  onPress = {() => props.navigation.navigate('Login')}
        onPress={() => props.navigation.goBack()}
        style={{ alignSelf: "flex-end"  , margin:10}}
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
    height: 40,
    width: 200,
    margin: 5,
    padding: 8,
    borderRadius: 25
  },
})

export default SignUp;
