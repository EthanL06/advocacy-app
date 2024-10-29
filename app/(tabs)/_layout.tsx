import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="maps" />
      </Tabs>
    </>
  );
}
