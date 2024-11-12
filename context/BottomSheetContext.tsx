// BottomSheetContext.tsx

import React, {
  createContext,
  useCallback,
  useRef,
  ReactNode,
  useState,
} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReportForm from "@/components/map/ReportForm";

// Define the context type
interface BottomSheetContextType {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  setCoordinates: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
  coordinates: { latitude: number; longitude: number };
}

// Create context with a default value (null initially)
export const BottomSheetContext = createContext<BottomSheetContextType | null>(
  null
);

// Define props for the provider
interface BottomSheetProviderProps {
  children: ReactNode;
}

// Provider component
export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  // Function to open the bottom sheet
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetContext.Provider
        value={{
          openBottomSheet,
          closeBottomSheet,
          setCoordinates,
          coordinates,
        }}
      >
        <View style={{ flex: 1 }}>
          {children}

          {/* Bottom Sheet Component */}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            topInset={200}
            snapPoints={["80%"]}
            enableDynamicSizing={false}
            enablePanDownToClose={true}
          >
            <ReportForm />
          </BottomSheet>
        </View>
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  );
};

export const useBottomSheet = () => {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
