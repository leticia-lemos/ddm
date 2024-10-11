import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2A55C2',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Câmera',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'camera-sharp' : 'camera-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="local"
        options={{
          title: 'Localização',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
