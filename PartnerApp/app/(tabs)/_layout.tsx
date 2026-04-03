import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  pink: '#F43F5E',
  dark: '#0F172A',
  muted: '#94a3b8',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.pink,
        tabBarInactiveTintColor: COLORS.muted,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 12,
          paddingTop: 12,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '800',
          marginTop: 4,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => <Ionicons size={22} name={focused ? "grid" : "grid-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => <Ionicons size={22} name={focused ? "flash" : "flash-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="crm"
        options={{
          title: 'Pipeline',
          tabBarIcon: ({ color, focused }) => <Ionicons size={22} name={focused ? "stats-chart" : "stats-chart-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="followup"
        options={{
          title: 'Follow-up',
          tabBarIcon: ({ color, focused }) => <Ionicons size={22} name={focused ? "notifications" : "notifications-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => <Ionicons size={22} name={focused ? "person" : "person-outline"} color={color} />,
        }}
      />
      {/* Hide old explore screen */}
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
