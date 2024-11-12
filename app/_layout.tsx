import { TabBar } from "@/components/TabBar";
import { BottomSheetProvider } from "@/context/BottomSheetContext";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Stack, Tabs } from "expo-router";
import { createContext, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function RootLayout() {
  return (
    <BottomSheetProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Map",
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
    </BottomSheetProvider>
  );
}
