import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NotificationTabs from "../components/notifications/NotificationTab";
import NotificationCard from "../components/notifications/NotificationCard";
import { SafeAreaView } from "react-native-safe-area-context";


// Sample data for notifications
const notificationData = [
  { id: 1, type: "followers", name: "Name", description: "Started following you.", time: "1h ago" },
  { id: 2, type: "reports", name: "Name", description: "Signed your Report.", time: "2h ago" },
  { id: 3, type: "discussions", name: "Name", description: "Mentioned you in a discussion.", time: "3h ago" },
  { id: 4, type: "reports", name: "Your report is at 200 signatures", description: "Details", time: "4h ago" },
  { id: 5, type: "discussions", name: "Name", description: "Replied to your discussion.", time: "5h ago" },
];

const Notifications = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  // Filter notifications based on the selected tab
  const filteredNotifications = notificationData.filter((notification) => {
    if (selectedTab === "All") return true;
    return notification.type === selectedTab.toLowerCase();
  });

  console.log("Selected Tab:", selectedTab);  // Debugging log
  console.log("Filtered Notifications:", filteredNotifications);  // Debugging log

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <NotificationTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationCard
              name={item.name}
              description={item.description}
              time={item.time}
              type={item.type}  // Pass the type to NotificationCard
            />
          )}
          ListEmptyComponent={<Text>No notifications available.</Text>}  // Message when list is empty
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
