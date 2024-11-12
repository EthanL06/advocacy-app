import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ReportType } from "@/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImagePickerAsset } from "expo-image-picker";

// Add new report
export const addReport = async (report: ReportType) => {
  try {
    const docRef = await addDoc(collection(db, "reports"), report);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const uploadImage = async (file: ImagePickerAsset) => {
  // Create a root reference
  const storageRef = ref(storage, "images/" + file.fileName);
  const response = await fetch(file.uri);
  const blob = await response.blob();
  const snapshot = await uploadBytes(storageRef, blob);
  // Return the download URL
  const url = await getDownloadURL(storageRef);
  return url;
};

export const getReports = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reports"));
    const reports: ReportType[] = [];
    querySnapshot.forEach((doc) => {
      reports.push(doc.data() as ReportType);
    });
    return reports;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
