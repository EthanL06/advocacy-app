import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ReportType } from "@/types";

// Add new report
export const addReport = async (report: ReportType) => {
  try {
    const docRef = await addDoc(collection(db, "reports"), report);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
