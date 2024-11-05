import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

// Define interface for component props
interface DiscussionCardProps {
  username?: string;
  title?: string;
  description?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

// Custom icon components using Views
const UserIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.userIconHead} />
    <View style={styles.userIconBody} />
  </View>
);

const CommentIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.commentIconBubble} />
  </View>
);

const ShareIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.shareIconArrow} />
  </View>
);

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
          <UserIcon />
        </View>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.interactionContainer}>
        <View style={styles.interactionItem}>
          <CommentIcon />
          <Text style={styles.interactionText}>00</Text>
        </View>
        
        <View style={styles.interactionItem}>
          <UserIcon />
          <Text style={styles.interactionText}>00</Text>
        </View>
        
        <View style={styles.interactionItem}>
          <ShareIcon />
          <Text style={styles.interactionText}>00</Text>
        </View>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Image Placeholder</Text>
      </View>
    </TouchableOpacity>
  );
};

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
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIconHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
  },
  userIconBody: {
    width: 12,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
    marginTop: 2,
  },
  commentIconBubble: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#666666',
  },
  shareIconArrow: {
    width: 12,
    height: 2,
    backgroundColor: '#666666',
    transform: [{ rotate: '45deg' }],
  },
});

export default DiscussionCard;