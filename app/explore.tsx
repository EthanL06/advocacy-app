import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import DiscussionCard from "../components/discussion/post";

type Props = {};

const Explore = (props: Props) => {
  const testData = [
    { username: "@john_doe", title: "Issue at this location", description: "There's a problem that needs attention here..." },
    { username: "@jane_smith", title: "Another location issue", description: "This area needs to be looked at..." },
    { username: "@alice_jones", title: "Urgent maintenance needed", description: "The road here is in bad shape and needs repair." },
    { username: "@bob_white", title: "Littering problem", description: "There's too much litter around this park area." },
    { username: "@carol_king", title: "Street lights out", description: "Several street lights are not working in this area." },
    { username: "@david_lee", title: "Noise complaint", description: "Frequent loud noise here at night." },
    { username: "@emma_watson", title: "Blocked drainage", description: "Drainage is blocked causing flooding during rain." },
    { username: "@frank_taylor", title: "Need more benches", description: "This park lacks sufficient seating for visitors." },
    { username: "@grace_hopper", title: "Overgrown bushes", description: "The bushes here are overgrown and need trimming." },
    { username: "@harry_potter", title: "Broken sidewalk", description: "The sidewalk here is cracked and unsafe." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore</Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {testData.map((item, index) => (
          <DiscussionCard
            key={index}
            username={item.username}
            title={item.title}
            description={item.description}
            onPress={() => console.log(`Card ${index + 1} pressed!`)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    paddingBottom: 16,
  },
});
