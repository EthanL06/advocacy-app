import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from "react-native";
import MapView, { Callout, Details, Marker, Region } from "react-native-maps";
import { getUserLocation } from "../services/LocationService";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addReport } from "@/firebase/firestore";

export default function Index() {
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: 38.8977,
    longitude: -77.0365,
  });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 38.8977, // Default location
    longitude: -77.0365,
  });

  const onRegionChange = (region: Region, details: Details) => {
    console.log(region, details);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation();
      if (location) {
        setCurrentLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude, // Use current location
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Pressable
          onPress={() => {
            addReport({
              title: "New report",
              description: "This is a new report",
              author: "Anonymous",
              createdDate: new Date(),
            }).then((id) => {
              console.log("Report added with ID: ", id);
            });
          }}
          style={({ pressed }) => [
            styles.reportButton,
            {
              backgroundColor: pressed ? "gray" : "white",
            },
          ]}
        >
          <AntDesign name="plus" size={24} color="black" />
        </Pressable>

        <Marker
          draggable
          coordinate={draggableMarkerCoord}
          onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
          title="Drag me!"
          description="This is a draggable marker."
        >
          <Callout
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 200,
              height: 80,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", }}>Custom Callout</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    padding: 12,
  },
  reportButton: {
    position: "absolute",
    top: 60,
    right: 20,
    padding: 12,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
