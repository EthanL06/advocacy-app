import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
        />
      </View>
      
      {/* Name and Username */}
      <Text style={styles.nameText}>John Smith</Text>
      <Text style={styles.usernameText}>@john_smith</Text>

      {/* Activity Section */}
      <View style={styles.activityContainer}>
        <View style={styles.activityBox}>
          <Text style={styles.activityTitle}>Your {"\n"} Reports:</Text>
          <Text style={styles.activityCount}>00</Text>
        </View>
        <View style={styles.activityBox}>
          <Text style={styles.activityTitle}>Signed Reports:</Text>
          <Text style={styles.activityCount}>00</Text>
        </View>
        <View style={styles.activityBox}>
          <Text style={styles.activityTitle}>Approved Reports:</Text>
          <Text style={styles.activityCount}>00</Text>
        </View>
      </View>

      {/* History */}
      <Text style={styles.historyText}>History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 50,
  },  
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  usernameText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 20,
  },
  activityBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginHorizontal: 5, // Add spacing between boxes
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  activityTitle: {
    fontSize: 12,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "#000",
  },
  activityCount: {
    fontSize: 40,
    fontWeight: "bold",
  },
  historyText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default Profile;
