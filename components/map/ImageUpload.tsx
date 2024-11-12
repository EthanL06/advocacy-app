import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({
  setFiles,
  files,
}: {
  setFiles: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset[]>
  >;
  files: ImagePicker.ImagePickerAsset[];
}) => {
  // Stores any error message
  const [error, setError] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                 roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setFiles(result.assets);

        // Clear any previous errors
        setError(null);
      }
    }
  };

  return (
    <>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Ionicons name="cloud-upload-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Conditionally render the image 
            or error message */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {files.length > 0 ? (
          // Display the selected image
          files.map((file) => (
            <View key={file.uri} style={styles.imageContainer}>
              <Image source={{ uri: file.uri }} style={styles.image} />
            </View>
          ))
        ) : (
          // Display an error message if there's
          // an error or no image selected
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    marginBottom: 15,
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 4,
    // elevation: 5,
    borderWidth: 4,
    borderColor: "#ccc",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
});

export default ImageUpload;
