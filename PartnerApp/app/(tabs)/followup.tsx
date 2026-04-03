import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const COLORS = {
  pink: '#FF4B5C',
  purple: '#8B4DCC',
  blue: '#2F6FD6',
  emerald: '#10B981',
  dark: '#0F172A',
  text: '#1F2937',
  muted: '#64748b',
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#f1f5f9'
};

const PD_GRADIENT: readonly [string, string, ...string[]] = ['#FF4B5C', '#E34BA9', '#8B4DCC', '#2F6FD6'];

export default function FollowUpScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const tabs = ['Upcoming', 'Missed', 'Completed'];

  const followups = [
    { id: '1', name: 'Rohan Kapoor', type: 'Wedding', time: '11:00 AM', status: 'High Interest', avatar: 'RK', urgency: 'Hot' },
    { id: '2', name: 'Sara Malik', type: 'Anniversary', time: '02:30 PM', status: 'Quotation Sent', avatar: 'SM', urgency: 'Warm' },
    { id: '3', name: 'Kabir Singh', type: 'Birthday', time: '04:00 PM', status: 'Negotiating', avatar: 'KS', urgency: 'Hot' },
    { id: '4', name: 'Priya Verma', type: 'Corporate Event', time: '05:30 PM', status: 'New Lead', avatar: 'PV', urgency: 'Warm' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
          <View>
              <Text style={styles.headerTitle}>Follow-up Hub</Text>
              <Text style={styles.headerSub}>Manage your upcoming engagements</Text>
          </View>
          <TouchableOpacity style={styles.calendarBtn}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.dark} />
          </TouchableOpacity>
      </View>

      {/* Segmented Control */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
            <TouchableOpacity 
                key={tab} 
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
            >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Timeline Row */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <View style={styles.countBadge}>
                <Text style={styles.countText}>{followups.length}</Text>
            </View>
        </View>

        {followups.map((item, index) => (
            <View key={item.id} style={styles.itemWrapper}>
                <View style={styles.timeline}>
                    <View style={[styles.timelineDot, {backgroundColor: item.urgency === 'Hot' ? COLORS.pink : COLORS.blue}]} />
                    {index < followups.length - 1 && <View style={styles.timelineLine} />}
                </View>

                <TouchableOpacity style={styles.followUpCard}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.avatar, {backgroundColor: item.urgency === 'Hot' ? COLORS.pink + '15' : COLORS.blue + '15'}]}>
                            <Text style={[styles.avatarText, {color: item.urgency === 'Hot' ? COLORS.pink : COLORS.blue}]}>{item.avatar}</Text>
                        </View>
                        <View style={styles.leadInfo}>
                            <Text style={styles.leadName}>{item.name}</Text>
                            <Text style={styles.leadType}>{item.type} • {item.time}</Text>
                        </View>
                        <View style={[styles.urgencyBadge, {backgroundColor: item.urgency === 'Hot' ? COLORS.pink + '10' : COLORS.blue + '10'}]}>
                            <Text style={[styles.urgencyText, {color: item.urgency === 'Hot' ? COLORS.pink : COLORS.blue}]}>{item.urgency}</Text>
                        </View>
                    </View>

                    <View style={styles.cardFooter}>
                        <View style={styles.statusRow}>
                            <Ionicons name="ellipse" size={8} color={COLORS.muted} />
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.miniActionBtn}>
                                <Ionicons name="call" size={16} color={COLORS.blue} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.miniActionBtn}>
                                <Ionicons name="logo-whatsapp" size={16} color={COLORS.emerald} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.miniActionBtn, styles.completeBtn]}>
                                <Ionicons name="checkmark-done" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        ))}

        {/* Motivation Card */}
        <LinearGradient 
            colors={PD_GRADIENT} 
            style={styles.promoCard}
            start={{x:0, y:0}} end={{x:1, y:1}}
        >
            <Ionicons name="rocket" size={30} color="#fff" style={styles.promoIcon} />
            <Text style={styles.promoTitle}>Conversion Tip</Text>
            <Text style={styles.promoText}>Following up with a lead after generating a quote increases booking probability by 40%. Stay persistent!</Text>
        </LinearGradient>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.dark,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 25,
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
  },
  activeTabText: {
    color: COLORS.dark,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.dark,
  },
  countBadge: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  itemWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  timeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 15,
    paddingTop: 15,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.pink,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#f1f5f9',
    marginTop: 5,
  },
  followUpCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.dark,
  },
  leadType: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniActionBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  completeBtn: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emerald,
  },
  promoCard: {
    marginHorizontal: 25,
    marginTop: 25,
    borderRadius: 25,
    padding: 25,
  },
  promoIcon: {
    marginBottom: 15,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  promoText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  }
});
