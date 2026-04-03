import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Linking, Alert, StatusBar, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const COLORS = {
  pink: '#F43F5E',
  purple: '#8B4DCC',
  blue: '#2F6FD6',
  dark: '#0F172A',
  text: '#1e293b',
  muted: '#94a3b8',
  bg: '#f8fafc',
  green: '#10B981',
};

const PD_GRADIENT: readonly [string, string, ...string[]] = ['#FF4B5C', '#E34BA9', '#8B4DCC', '#2F6FD6'];

export default function LeadInboxScreen() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [leads, setLeads] = useState([
    {
      id: '1',
      name: 'Aditya Raj',
      phone: '+91 98765 43210',
      event: 'Imperial Wedding',
      date: '24 May 2026',
      pax: 500,
      location: 'Haldwani, Uttarakhand',
      time: 'Just now',
      isUnlocked: false,
      status: 'New'
    },
    {
      id: '2',
      name: 'Surbhi Gupta',
      phone: '+91 99988 77766',
      event: 'Golden Anniversary',
      date: '12 June 2026',
      pax: 200,
      location: 'Civil Lines, Delhi',
      time: '2 hrs ago',
      isUnlocked: true,
      status: 'Contacted'
    }
  ]);

  const statuses = ['All', 'New', 'Contacted', 'Followups', 'Quotation Send', 'Booked', 'Lost'];

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'New': return COLORS.blue;
        case 'Contacted': return COLORS.purple;
        case 'Followups': return '#f59e0b';
        case 'Quotation Send': return '#ec4899';
        case 'Booked': return COLORS.green;
        case 'Lost': return COLORS.muted;
        default: return COLORS.dark;
    }
  };

  const unlockLead = (id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, isUnlocked: true } : l));
  };

  const handleStatusUpdate = (status: string) => {
    if (selectedLead) {
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, status } : l));
      setShowStatusModal(false);
      setSelectedLead(null);
    }
  };

  const filteredLeads = activeStatus === 'All' 
    ? leads 
    : leads.filter(l => l.status === activeStatus);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Lead Inbox</Text>
          <Text style={styles.headerSubtitle}>Real-time inquiries from clients</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="funnel-outline" size={20} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      {/* Status Filter Tabs */}
      <View style={styles.statusFilter}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusList}>
              {statuses.map(s => (
                  <TouchableOpacity 
                    key={s} 
                    style={[styles.statusTab, activeStatus === s && styles.statusTabActive]}
                    onPress={() => setActiveStatus(s)}
                  >
                      <Text style={[styles.statusTabText, activeStatus === s && styles.statusTabTextActive]}>{s}</Text>
                  </TouchableOpacity>
              ))}
          </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredLeads.map((lead) => (
          <View key={lead.id} style={styles.leadCard}>
            <View style={styles.cardTop}>
              <View style={styles.userRow}>
                <View style={[styles.avatar, { backgroundColor: lead.status === 'Booked' ? COLORS.green + '15' : 'rgba(139, 92, 246, 0.1)' }]}>
                  {lead.status === 'Booked' ? (
                      <Ionicons name="checkmark-circle" size={24} color={COLORS.green} />
                  ) : (
                      <Text style={styles.avatarText}>{lead.name.charAt(0)}</Text>
                  )}
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{lead.name}</Text>
                  <Text style={styles.leadTime}>{lead.time}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.statusBadge, { backgroundColor: getStatusColor(lead.status) + '15' }]}
                    onPress={() => {
                        setSelectedLead(lead);
                        setShowStatusModal(true);
                    }}
                >
                   <Text style={[styles.statusText, { color: getStatusColor(lead.status) }]}>{lead.status.toUpperCase()}</Text>
                   <Ionicons name="chevron-down" size={10} color={getStatusColor(lead.status)} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={14} color={COLORS.muted} />
                  <Text style={styles.detailText}>{lead.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="people-outline" size={14} color={COLORS.muted} />
                  <Text style={styles.detailText}>{lead.pax} Guests</Text>
                </View>
              </View>

              <View style={styles.detailItemFull}>
                <Ionicons name="sparkles-outline" size={14} color={COLORS.pink} />
                <Text style={styles.eventText}>{lead.event}</Text>
              </View>
              
              <View style={styles.phoneSection}>
                <Text style={styles.phoneLabel}>Phone Number</Text>
                {lead.isUnlocked ? (
                  <View style={styles.phoneRow}>
                      <Text style={styles.phoneNumber}>{lead.phone}</Text>
                      <View style={styles.quickActions}>
                          <TouchableOpacity onPress={() => Linking.openURL(`tel:${lead.phone}`)} style={styles.quickBtn}>
                              <Ionicons name="call" size={18} color={COLORS.blue} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => Linking.openURL(`whatsapp://send?phone=${lead.phone}`)} style={styles.quickBtn}>
                              <Ionicons name="logo-whatsapp" size={18} color={COLORS.green} />
                          </TouchableOpacity>
                      </View>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.unlockBtn} onPress={() => unlockLead(lead.id)}>
                    <Text style={styles.unlockText}>Tap to Unlock Contact</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {lead.isUnlocked && (
                <View style={styles.bottomActions}>
                    <TouchableOpacity style={styles.mainActionBtn} onPress={() => { setSelectedLead(lead); setShowStatusModal(true); }}>
                        <Ionicons name="git-network-outline" size={16} color={COLORS.dark} />
                        <Text style={styles.mainActionText}>Update Pipeline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.mainActionBtn, { borderLeftWidth: 1, borderLeftColor: '#f1f5f9' }]}
                        onPress={() => router.push('/quotation')}
                    >
                        <Ionicons name="document-text-outline" size={16} color={COLORS.dark} />
                        <Text style={styles.mainActionText}>Send Quote</Text>
                    </TouchableOpacity>
                </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Status Update Modal */}
      <Modal
        visible={showStatusModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setShowStatusModal(false)}
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Update Lead Status</Text>
                    <TouchableOpacity onPress={() => setShowStatusModal(false)}>
                        <Ionicons name="close" size={24} color={COLORS.dark} />
                    </TouchableOpacity>
                </View>
                <View style={styles.statusOptions}>
                    {statuses.slice(1).map(s => (
                        <TouchableOpacity 
                        key={s} 
                        style={styles.statusOption}
                        onPress={() => handleStatusUpdate(s)}
                        >
                            <View style={[styles.dot, { backgroundColor: getStatusColor(s) }]} />
                            <Text style={styles.optionText}>{s}</Text>
                            {selectedLead?.status === s && <Ionicons name="checkmark" size={20} color={COLORS.green} />}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.dark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusFilter: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statusList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  statusTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  statusTabActive: {
    backgroundColor: COLORS.dark,
    borderColor: COLORS.dark,
  },
  statusTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
  },
  statusTabTextActive: {
    color: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardTop: {
    padding: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.purple,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },
  leadTime: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  detailItemFull: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  eventText: {
      fontSize: 13,
      fontWeight: '700',
      color: COLORS.dark,
      fontStyle: 'italic',
  },
  phoneSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  phoneLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.muted,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
  },
  quickBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  unlockBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderStyle: 'dashed',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  unlockText: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '700',
  },
  bottomActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#fcfcfd',
  },
  mainActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  mainActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.dark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
  },
  statusOptions: {
    gap: 12,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
    marginLeft: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  }
});
