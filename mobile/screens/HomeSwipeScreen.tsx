// mobile/screens/HomeSwipeScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { useSwipeable } from 'react-swipeable';
import { API } from '../api/client';

const { width } = Dimensions.get('window');

export default function HomeSwipeScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    API.get('/users/recommendations').then(res => setUsers(res.data));
  }, []);

  const handleSwipe = (dir: string) => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const user = users[currentIndex];

  if (!user) return <Text>No more users</Text>;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: user.photos[0] }} style={{ width: width - 40, height: 500, borderRadius: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{user.name}, {user.age}</Text>
      <Text>{user.bio}</Text>
    </View>
  );
}