import { useEffect, useState } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";
// import MapView from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function Maps(props) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);

      Location.watchPositionAsync({ distanceInterval: 50 }, (location) => {
        console.log(location);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={'google'}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
      >
        <Marker
          coordinate={{
            latitude: "33.565109",
            longitude: "73.016914",
            // latitude: "33.6088253172629",
            // longitude: "73.07609499989962"
          }}
          title="Current Location"
        />
        {/* <Marker
          coordinate={{
            latitude: 33.565109,
            longitude: 73.016914,
          }}
          title="Current Location"
        /> */}
        {/* <Marker
          coordinate={{
            latitude: parseFloat("33.565109"),
            longitude: parseFloat("73.016914"),
          }}
          title="Current Location"
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  text: {
    width: "90%",
    height: 40,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
  },
  TextInput: {
    borderWidth: 1,
    height: 60,
    width: 200,
    margin: 5,
    padding: 8,
    borderRadius: 25,
  },
});

export default Maps;
