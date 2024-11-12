// components/notifications/NotificationTabs.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const tabs = ["All", "Reports", "Followers", "Discussions"];

const NotificationTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.activeTab]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NotificationTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#ddd",
  },
  activeTab: {
    backgroundColor: "#333",
  },
  tabText: {
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
  },
});
