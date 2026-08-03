
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      
      <Tabs.Screen
 name="index"
 options={{
   title:"Home",
   tabBarIcon:({color})=>(
     <Ionicons
       name="home-outline"
       size={24}
       color={color}
     />
   )
 }}
/>


<Tabs.Screen
  name="shop"
  listeners={{
    tabPress: (e) => {
      e.preventDefault();

      router.replace("/shop");
    },
  }}
  options={{
    title: "Shop",
    tabBarIcon: ({ color }) => (
      <Ionicons
        name="cart-outline"
        size={24}
        color={color}
      />
    ),
  }}
/>


<Tabs.Screen
 name="add"
 options={{
   title:"Add",
   tabBarIcon:({color})=>(
     <Ionicons
       name="add-circle-outline"
       size={24}
       color={color}
     />
   )
 }}
/>
    </Tabs>
  );
}
