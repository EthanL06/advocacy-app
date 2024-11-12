import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Details, Marker, Region } from "react-native-maps";
import { getUserLocation } from "../services/LocationService";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useBottomSheet } from "@/context/BottomSheetContext";
export default function Index() {
  const { openBottomSheet, setCoordinates, coordinates } = useBottomSheet();

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: 38.8977,
    longitude: -77.0365,
  });

  // const [currentLocation, setCurrentLocation] = useState<
  //   Record<string, number | null>
  // >({
  //   latitude: null, // Default location
  //   longitude: null,
  // });

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation();
      if (location) {
        setCoordinates({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {coordinates.latitude && coordinates.longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates.latitude, // Use current location
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Pressable
            onPress={() => {
              openBottomSheet();
            }}
            style={({ pressed }) => [
              styles.reportButton,
              {
                backgroundColor: pressed ? "gray" : "white",
              },
            ]}
          >
            <AntDesign
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              name="plus"
              size={24}
              color="black"
            />
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
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Custom Callout
              </Text>
            </Callout>
          </Marker>
        </MapView>
      ) : (
        <>
          <ActivityIndicator size="large" color="#651FFF" />
          <Text
            style={{
              marginTop: 8,
              fontSize: 16,
              fontWeight: "400",
              color: "gray",
            }}
          >
            Fetching your location...
          </Text>
        </>
      )}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
