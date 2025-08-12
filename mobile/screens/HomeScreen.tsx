import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Animated } from 'react-native';
import { useSwipeable } from 'react-swipeable-views';
import { API } from '../api/client';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY());

  useEffect(() => {
    API.get('/users/recommendations').then(res => setUsers(res.data));
  }, []);

  const handleSwipe = (direction: string) => {
    if (direction === 'left') {
      // Pass
      API.post('/likes', { receiverId: users[currentIndex].id, isSuperLike: false });
    } else if (direction === 'right') {
      // Like
      API.post('/likes', { receiverId: users[currentIndex].id, isSuperLike: false });
    } else if (direction === 'up') {
      // Super Like
      API.post('/likes', { receiverId: users[currentIndex].id, isSuperLike: true });
    }

    if (currentIndex < users.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const user = users[currentIndex];

  if (!user) return <Text>No more users</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photos[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}, {user.age}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.passButton} onPress={() => handleSwipe('left')}>
          <Text>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleSwipe('right')}>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.superLikeButton} onPress={() => handleSwipe('up')}>
          <Text>Super Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width - 40,
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  passButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superLikeButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});