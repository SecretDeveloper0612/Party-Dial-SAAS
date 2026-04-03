import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Party Dial Dashboard Theme
const COLORS = {
  pink: '#FF4B5C',
  purple: '#8B4DCC',
  blue: '#2F6FD6',
  emerald: '#10B981',
  dark: '#0F172A',
  text: '#1F2937',
  muted: '#64748b',
  bg: '#ffffff'
};

const PD_GRADIENT: readonly [string, string, ...string[]] = ['#FF4B5C', '#E34BA9', '#8B4DCC', '#2F6FD6'];

export default function DashboardScreen() {
  const [activeFilter, setActiveFilter] = React.useState('Today');
  const filters = ['Today', 'Yesterday', 'Week', 'Month'];

  const dailyStats = [
    { label: 'Today Leads', value: '12', color: COLORS.pink, icon: 'flash' },
    { label: 'Reply Leads', value: '08', color: COLORS.purple, icon: 'chatbox-ellipses' },
    { label: 'Convert', value: '04', color: COLORS.emerald, icon: 'trending-up' },
    { label: 'Follow up', value: '15', color: COLORS.blue, icon: 'calendar' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>Dashboard</Text>
                <Text style={styles.headerDate}>Friday, 3 April 2026</Text>
            </View>
        </View>

        {/* Date Filter Tabs */}
        <View style={styles.filterSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
                {filters.map(filter => (
                    <TouchableOpacity 
                        key={filter} 
                        style={[styles.filterTab, activeFilter === filter && styles.filterTabActive]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.customFilterTab}>
                    <Ionicons name="options-outline" size={16} color={COLORS.muted} />
                </TouchableOpacity>
            </ScrollView>
        </View>

        {/* Actionable Sections Title */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Hub</Text>
        </View>

        {/* Today's Priority Grid */}
        <View style={styles.grid}>
          {dailyStats.map((stat, i) => (
            <TouchableOpacity key={i} style={styles.statCard}>
              <View style={[styles.iconBox, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pending Follow-ups List */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Follow-ups</Text>
            <TouchableOpacity><Text style={styles.viewAll}>Full Schedule</Text></TouchableOpacity>
        </View>
        
        {/* Follow-up 1 */}
        <View style={styles.followUpItem}>
            <View style={styles.followUpInfo}>
                <Text style={styles.followUpName}>Sushant - Anniversary</Text>
                <Text style={styles.followUpTime}>Today, 2:30 PM</Text>
            </View>
            <View style={styles.followUpActions}>
                <TouchableOpacity style={styles.followActionBtn}><Ionicons name="call" size={16} color={COLORS.blue} /></TouchableOpacity>
                <TouchableOpacity style={styles.followActionBtn}><Ionicons name="logo-whatsapp" size={16} color={COLORS.emerald} /></TouchableOpacity>
            </View>
        </View>

        {/* Follow-up 2 */}
        <View style={styles.followUpItem}>
            <View style={styles.followUpInfo}>
                <Text style={styles.followUpName}>Karan - Birthday Party</Text>
                <Text style={styles.followUpTime}>Today, 4:00 PM</Text>
            </View>
            <View style={styles.followUpActions}>
                <TouchableOpacity style={styles.followActionBtn}><Ionicons name="call" size={16} color={COLORS.blue} /></TouchableOpacity>
                <TouchableOpacity style={styles.followActionBtn}><Ionicons name="logo-whatsapp" size={16} color={COLORS.emerald} /></TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.dark,
    letterSpacing: -0.5,
  },
  headerDate: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '700',
    marginTop: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
  },
  profileBtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterList: {
    paddingHorizontal: 25,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  filterTabActive: {
    backgroundColor: COLORS.dark,
    borderColor: COLORS.dark,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
  },
  filterTextActive: {
    color: '#fff',
  },
  customFilterTab: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.dark,
  },
  viewAll: {
    fontSize: 12,
    color: COLORS.pink,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.dark,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '700',
    marginTop: 2,
  },
  actionCard: {
    marginHorizontal: 25,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 25,
    elevation: 2,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leadSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.pink + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  leadSourceText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.pink,
    textTransform: 'uppercase',
  },
  leadTime: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '600',
  },
  cardMainText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.dark,
    lineHeight: 22,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  miniActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10B98110',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  miniActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  conversionList: {
    paddingHorizontal: 25,
    gap: 15,
    paddingBottom: 10,
    marginBottom: 20,
  },
  conversionCard: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  convAvatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.pink + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  convAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.pink,
  },
  convName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 4,
  },
  convStage: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '600',
    marginBottom: 12,
  },
  followUpBtn: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  followUpBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  followUpItem: {
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  followUpInfo: {
    flex: 1,
  },
  followUpName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
  },
  followUpTime: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
    fontWeight: '500',
  },
  followUpActions: {
    flexDirection: 'row',
    gap: 10,
  },
  followActionBtn: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
});
