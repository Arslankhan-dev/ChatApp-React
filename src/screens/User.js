import { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-web";
import firebase from "../config/firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { AuthContext } from "../store/context/AuthContext";


const Users = (props) => {
  const db = getFirestore(firebase);
  const [users, setUsers] = useState([]);
  const [tmp, setTmp] = useState("");
  const [location, setLocation] = useState(null);

  const {state: authState,setAuth,clearAuth} = useContext(AuthContext)
  console.log(authState)
  
  const loadData = async () => {
    let weather = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=Rawalpindi&appid=a85ac25759d9e3a2346297280eb4b989&units=metric"
    );
    console.log(weather.data.main.temp);
    setTmp(weather.data.main.temp);
    const q = query(collection(db, "Users"));
    let users = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      users.push({ ...doc.data(), email: doc.id });
    });
    setUsers(users);
  };

  const loadLocation = async () => {
    Location.watchPositionAsync(
      { distanceInterval: 50 },
       async (location) => {
     try{
      console.log(location);
      // setLocation(location)
      const ref = doc(db, "Users", auth.currentUser.email);

      // Set the "capital" field of the city 'DC'
      await updateDoc(ref, {
        capital: true,
      });
    }catch(e) {
       console.log(e)
    }
    });
  };
  useEffect(() => {
    loadData();
    loadLocation();
  }, []);

  const onUserSelected = (selectedUserEmail) => {
    let array = [
      getAuth().currentUser.email.toLocaleLowerCase(),
      selectedUserEmail.toLocaleLowerCase(),
    ];
    array.sort();
    let key = array[0] + "_" + array[1];
    // alert(key)
    props.navigation.navigate("Home", { collectionName: key });
    //  let key = getAuth().currentUser.email + '_' + selectedUserEmail
    //  alert(key)
  };
  return (
    <View styles={styles.container}>
      <Text>`Temperature in Rawalpindi is : {tmp} °C`</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return getAuth().currentUser.email !==
            item.email.toLocaleLowerCase ? (
            // <TouchableOpacity
            <View
              style={{
                backgroundColor: "#d3d3d3",
                // height: '30%',
                alignItems: "center",
                margin: 10,
                borderRadius: 20,
              }}
              onPress={() => onUserSelected(item.email)}
            >
              <Text
                style={{ padding: 3, fontWeight: "bold" }}
              >{`${item.email}`}</Text>
              <Text
                style={{ padding: 3, fontWeight: "bold" }}
              >{`${item.firstName}`}</Text>
              <Text
                style={{ padding: 3, fontWeight: "bold" }}
              >{`${item.age}`}</Text>
              <Text
                style={{ padding: 3, fontWeight: "bold" }}
              >{`${item.address}`}</Text>
              {item.location ? (
                <MapView
                  style={styles.map}
                  provider={"google"}
                  showsMyLocationButton={true}
                  showsUserLocation={true}
                  showsCompass={true}
                >
                  <Marker
                    coordinate={{
                      latitude: item.location.coords.latitude,
                      longitude: item.location.coords.longitude,
                    }}
                    // title={`$(item.firstName)'s` + 'Location'}
                      title ={`${item.firstName}` + ' Location'}
                  />
                </MapView>
              ) : null}
              {/* // </TouchableOpacity> */}
            </View>
          ) : null;
        }}
      />
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
};

export default Users;
