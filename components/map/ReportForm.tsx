import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons"; // For the upload icon
import RNPickerSelect from "react-native-picker-select"; // Import the picker
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUpload from "./ImageUpload";
import { addReport, uploadImage } from "@/firebase/firestore";
import { useBottomSheet } from "@/context/BottomSheetContext";
import * as ImagePicker from "expo-image-picker";

// Define the Zod schema for validation
const schema = z.object({
  issueType: z.string().min(1, "Please select an issue type"),
  postTitle: z
    .string()
    .min(3, "Title should be at least 3 characters")
    .max(100, "Title should not exceed 100 characters"),
  description: z
    .string()
    .min(5, "Description should be at least 5 characters")
    .max(500, "Description should not exceed 500 characters"),
});

const typeOfIssueOptions = [
  { label: "Bug", value: "bug" },
  { label: "Feature Request", value: "feature" },
  { label: "General Inquiry", value: "inquiry" },
];

type ReportData = z.infer<typeof schema>;

const ReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportData>({
    resolver: zodResolver(schema),
  });

  const { closeBottomSheet, coordinates } = useBottomSheet();

  const onSubmit = async (data: ReportData) => {
    setIsSubmitting(true);

    if (!coordinates.latitude || !coordinates.longitude) {
      setIsSubmitting(false);
      // Show an alert if the location is not available
      return Alert.alert(
        "Location Not Available",
        "Please enable location services to submit a report."
      );
    }

    const imageLinks = await Promise.all(
      files.map(async (file) => {
        return await uploadImage(file);
      })
    );

    const { postTitle, description, issueType } = data;

    await addReport({
      title: postTitle,
      description: description,
      issueType: issueType,
      author: "Anonymous",
      createdDate: new Date(),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      images: imageLinks,
    });

    setIsSubmitting(false);
    // Show an alert to the user
    Alert.alert("Report Submitted", "Thank you for submitting the report!", [
      {
        text: "OK",
        onPress: () => {
          reset();
          closeBottomSheet();
        },
      },
    ]);
  };

  return (
    <BottomSheetView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Create New Report</Text>

        <Text style={styles.label}>Report Type</Text>
        <Controller
          control={control}
          name="issueType"
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              items={typeOfIssueOptions}
              placeholder={{ label: "Select an issue type", value: null }}
              value={value}
              style={pickerSelectStyles}
            />
          )}
        />
        {errors.issueType && (
          <Text style={styles.errorText}>{errors.issueType.message}</Text>
        )}

        <Text style={styles.label}>Report Title</Text>
        <Controller
          control={control}
          name="postTitle"
          render={({ field: { onChange, value } }) => (
            <BottomSheetTextInput
              style={styles.input}
              placeholder="Enter title here"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.postTitle && (
          <Text style={styles.errorText}>{errors.postTitle.message}</Text>
        )}

        <Text style={styles.label}>Report Description</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <BottomSheetTextInput
              style={[
                styles.input,
                {
                  minHeight: 100,
                },
              ]}
              placeholder="Enter description here"
              multiline
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <Text style={styles.label}>Upload image(s) of the report:</Text>
        <ImageUpload setFiles={setFiles} files={files} />

        {!isSubmitting ? (
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="#651FFF" />
        )}
      </ScrollView>
    </BottomSheetView>
  );
};

export default ReportForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },

  postButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

// Custom styles for the picker
const pickerSelectStyles = {
  inputIOS: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  inputAndroid: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
};
