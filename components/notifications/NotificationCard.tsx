// components/notifications/NotificationCard.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NotificationCard = ({ name, description, time, type }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardDescription}>
        {description} {time}
      </Text>
      {type === "report" || type === "discussion" ? (
        <TouchableOpacity>
          <Text style={styles.viewReportText}>View Report</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  viewReportText: {
    color: "#1e90ff",
    marginTop: 8,
  },
});
