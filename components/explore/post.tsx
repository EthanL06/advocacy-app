import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

// Define interface for component props
interface DiscussionCardProps {
  username?: string;
  title?: string;
  description?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ 
  username = "@username",
  title = "Title",
  description = "More about the problem...",
  onPress
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user" size={16} color="#666666" />
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.interactionContainer}>
        <View style={styles.interactionItem}>
          <FontAwesome5 name="pen-fancy" size={16} color="black" />
          <Text style={styles.interactionText}>00</Text>
        </View>
        
        <View style={styles.interactionItem}>
          <FontAwesome5 name="comment" size={16} color="#666666" />
          <Text style={styles.interactionText}>00</Text>
        </View>
        
        <View style={styles.interactionItem}>
          <Entypo name="share-alternative" size={16} color="black" />
          <Text style={styles.interactionText}>00</Text>
        </View>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Image Placeholder</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  username: {
    color: '#666666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#666666',
    marginBottom: 12,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    color: '#666666',
    marginLeft: 4,
  },
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    height: 160,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#999999',
  },
});
