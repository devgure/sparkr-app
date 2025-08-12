// mobile/navigation/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeSwipeScreen from '../screens/HomeSwipeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Discover" component={HomeSwipeScreen} />
    <Tab.Screen name="Chats" component={ChatScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);