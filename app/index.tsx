import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import MapView, { Callout, Details, Marker, Region } from "react-native-maps";
import { getUserLocation } from '../services/LocationService'
import { Airplay, Camera } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

export default function Index() {
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: 38.8977,
    longitude: -77.0365,
  });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 38.8977,  // Default location
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,  // Use current location
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}
        showsUserLocation={true}
        followsUserLocation={true}
      >
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
            <Button title="Press me" onPress={() => console.log("Button pressed")}/>
          </Callout>
        </Marker>

        <View style={styles.mapOverlay}>
          <Button backgroundColor="$blue4" icon={Camera}>
            test
          </Button>
          <Button alignSelf="center" icon={Airplay} size="$6">
            Large
          </Button>
        </View>
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
  mapOverlay: {
    position: "absolute",
    bottom: 40,
    borderWidth: 2,
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
    width: "100%",
    left: 12,
    textAlign: "center",
    zIndex: 100,
  },
});
