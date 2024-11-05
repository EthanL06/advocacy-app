import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return null;
  }

  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  return location.coords;
};
