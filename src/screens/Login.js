import { useEffect, useState, useRef , useContext} from "react";
import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  Platform,
} from "react-native";
import TouchableText from "./../components/TouchableText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {FirstContext} from '../store/context/FirstContext'
import {AuthContext} from '../store/context/AuthContext'

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setisPasswordValid] = useState(false);
  const [isEmailValid, setisEmailValid] = useState(false);
  // const [loading, setloading] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  // const {state,addValue,subValue} = useContext(FirstContext)  
  const {state: authState,setAuth,clearAuth} = useContext(AuthContext)
  const {loading} = authState



  // Method
  let token;
  async function registerForPushNotificationsAsync() {
   

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    if (email.includes(".com") && email.includes("@")) {
      setisEmailValid(true);
    } else {
      setisEmailValid(false);
    }
    if (password.length > 4) {
      setisPasswordValid(true);
    } else {
      setisPasswordValid(false);
    }
    if(authState.email && authState.token){
      // props.navigation.navigate('User')
      props.navigation.navigate("Users");
    }

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
      console.log(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, [email, password,authState]);

  const onLoginPressed = async () => {
    const auth = getAuth();
    if (email.length && password.length) {
      try{
          await setAuth (email, password)
         
      }
      catch(e){
        console.log(e)
      }
      // setloading(true);
      // signInWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     // Signed in

      //     const user = userCredential.user;
      //     setAuth({email, token: user.stsTokenManager.accessToken})
      //     alert("User Logined Success");
      //     props.navigation.navigate("Users");
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     alert("User don't login because" + errorMessage);
      //     setloading(false);
      //   });
    } else {
      alert("Kindly fill all the Feilds");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("./../../assets/logo.png")}
      />
      {/* <Text>{state.value}</Text> */}
      {/* <Button
        title = 'Add'
        onPress={() =>addValue(2)}
      />
       <Button
        title = 'Sub'
        onPress={() =>subValue(2)}
      /> */}
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

      {loading ? <ActivityIndicator color={"green"} /> : null}

      <Button title="Login" onPress={() => onLoginPressed()} />

    

      <TouchableText
        onPress={() => props.navigation.navigate("Forget")}
        style={{ alignSelf: "center" , margin: 4 }}
        text={'Forget Password?'}
        textStyle={{ color: "blue" }}
      >
           </TouchableText>

      <TouchableText
        onPress={() => props.navigation.navigate("SignUp")}
        style={{ alignSelf: "center" , margin: 4 }}
        text={'Have not account, Register'}
        textStyle={{ color: "blue" }}
      >
       
      </TouchableText>

      <TouchableText
        onPress={() => props.navigation.navigate("Maps")}
        style={{ alignSelf: "center" , margin: 4 }}
        text={'Go To Maps'}
        textStyle={{ color: "blue" }}
      >
        {/* <Text>Go To Maps</Text> */}
      </TouchableText>

   
    </View>
  );
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
    // margin:30,
  },
  TextInput: {
    borderWidth: 1,
    height: 60,
    width: 200,
    margin: 5,
    padding: 8,
    borderRadius: 25
  },
});

export default Login;
