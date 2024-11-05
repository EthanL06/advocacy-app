import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DiscussionCard from '../discussion/post';

export default function TestScreen() {
  const testData = [
    {
      username: "@john_doe",
      title: "Test Title 1",
      description: "This is a test description for the first card",
    },
    {
      username: "@jane_smith",
      title: "Test Title 2",
      description: "This is a test description for the second card",
    },
  ];

  return (
    <ScrollView style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});