import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';

const COLORS = {
  blue: '#3b82f6',
  orange: '#f59e0b',
  purple: '#8b5cf6',
  emerald: '#10b981',
  rose: '#f43f5e',
  dark: '#0f172a',
  muted: '#64748b'
};

export default function CRMPipelineScreen() {
  const router = useRouter();
  const [selectedLeadStage, setSelectedLeadStage] = React.useState<any | null>(null);
  
  const stages = [
    { id: 'new', name: 'New Lead', icon: 'flash', color: COLORS.blue, count: 4 },
    { id: 'contacted', name: 'Contacted', icon: 'call', color: COLORS.purple, count: 2 },
    { id: 'followup', name: 'Followups', icon: 'calendar', color: '#f59e0b', count: 3 },
    { id: 'quotation', name: 'Quotation Send', icon: 'document-text', color: '#ec4899', count: 1 },
    { id: 'booked', name: 'Booked 🎉', icon: 'checkbox', color: COLORS.emerald, count: 5 },
    { id: 'lost', name: 'Lost ❌', icon: 'close-circle', color: COLORS.muted, count: 3 }
  ];

  const mockLeads = [
    { id: '1', name: 'Alok Gupta', stage: 'new', type: 'Wedding', date: 'Oct 24', phone: '9876543210' },
    { id: '2', name: 'Simran Jolly', stage: 'new', type: 'Engagement', date: 'Nov 12', phone: '9876543211' },
    { id: '3', name: 'Vikram Singh', stage: 'contacted', type: 'Birthday', date: 'Sep 30', phone: '9876543212' },
    { id: '4', name: 'Rajesh Kumar', stage: 'followup', type: 'Corporate', date: 'Dec 05', phone: '9876543213' },
    { id: '5', name: 'Megha Sharma', stage: 'booked', type: 'Wedding', date: 'Jan 15', phone: '9876543214' },
    { id: '6', name: 'Anil Kapoor', stage: 'lost', type: 'Reception', date: 'Oct 01', phone: '9876543215' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lead Pipeline</Text>
        <Text style={styles.headerSubtitle}>Track your sales funnel progression</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {stages.map((stage, i) => (
          <View key={stage.id}>
            <TouchableOpacity 
                style={styles.stageCard}
                onPress={() => setSelectedLeadStage(stage)}
            >
                <View style={[styles.iconBox, { backgroundColor: stage.color + '15' }]}>
                <Ionicons name={stage.icon as any} size={24} color={stage.color} />
                </View>
                <View style={styles.stageInfo}>
                <Text style={styles.stageName}>{stage.name}</Text>
                <Text style={styles.stageMetrics}>{stage.count} leads in this stage</Text>
                </View>
                <View style={styles.arrowBox}>
                <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
                </View>
                
                {/* Connection Line */}
                {i < stages.length - 1 && <View style={styles.line} />}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Leads Viewer Modal (Standalone Page Feel) */}
      <Modal visible={!!selectedLeadStage} animationType="slide" transparent={false}>
          <SafeAreaView style={styles.modalFull}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => setSelectedLeadStage(null)} style={styles.modalBack}>
                        <Ionicons name="chevron-back" size={24} color={COLORS.dark} />
                    </TouchableOpacity>
                    <View style={styles.modalHeaderTitleBox}>
                        <Text style={styles.modalHeaderTitle}>{selectedLeadStage?.name}</Text>
                        <Text style={styles.modalHeaderSub}>{selectedLeadStage?.count} active leads</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.leadScroll}>
                   {mockLeads.filter(l => l.stage === selectedLeadStage?.id).map(lead => (
                       <View key={lead.id} style={styles.fullLeadCard}>
                           <View style={styles.leadCardTop}>
                               <View style={styles.leadAvatar}>
                                   <Text style={styles.leadAvatarText}>{lead.name[0]}</Text>
                               </View>
                               <View style={styles.leadCardContent}>
                                   <Text style={styles.leadCardName}>{lead.name}</Text>
                                   <Text style={styles.leadCardType}>{lead.type}</Text>
                               </View>
                               <TouchableOpacity style={[styles.callBtn, { backgroundColor: (selectedLeadStage?.color || COLORS.blue) + '10'}]}>
                                   <Ionicons name="call" size={18} color={selectedLeadStage?.color || COLORS.blue} />
                               </TouchableOpacity>
                           </View>
                           <View style={styles.leadCardFooter}>
                                <View style={styles.metaBadge}>
                                    <Ionicons name="calendar-outline" size={10} color={COLORS.muted} />
                                    <Text style={styles.metaText}>{lead.date || 'TBD'}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.detailsBtn} 
                                    onPress={() => { 
                                        setSelectedLeadStage(null); 
                                        router.push('/quotation'); 
                                    }}
                                >
                                    <View style={styles.sendQuoteMini}>
                                        <Ionicons name="document-text" size={12} color={COLORS.blue} />
                                        <Text style={styles.detailsText}>Send Quote</Text>
                                    </View>
                                </TouchableOpacity>
                           </View>
                       </View>
                   ))}
                   {mockLeads.filter(l => l.stage === selectedLeadStage?.id).length === 0 && (
                       <View style={styles.emptyView}>
                           <Ionicons name="documents-outline" size={60} color={COLORS.muted + '40'} />
                           <Text style={styles.emptyTitle}>No Leads Yet</Text>
                           <Text style={styles.emptyDesc}>There are currently no leads in the "{selectedLeadStage?.name}" stage.</Text>
                       </View>
                   )}
                </ScrollView>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  stageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stageInfo: {
    flex: 1,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  stageMetrics: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  arrowBox: {
    marginLeft: 10,
  },
  line: {
    position: 'absolute',
    bottom: -22,
    left: 43,
    width: 2,
    height: 20,
    backgroundColor: '#f1f5f9',
    zIndex: -1,
  },
  modalFull: {
      flex: 1,
      backgroundColor: '#f8fafc',
  },
  modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#f1f5f9',
  },
  modalHeaderTitleBox: {
      marginLeft: 15,
  },
  modalHeaderTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: COLORS.dark,
  },
  modalHeaderSub: {
      fontSize: 11,
      color: COLORS.muted,
      fontWeight: '600',
      marginTop: 2,
  },
  modalBack: {
      padding: 5,
  },
  leadScroll: {
      padding: 20,
      paddingBottom: 40,
  },
  fullLeadCard: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#f1f5f9',
  },
  leadCardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
  },
  leadAvatar: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: '#f1f5f9',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  leadAvatarText: {
      fontSize: 16,
      fontWeight: '800',
      color: COLORS.dark,
  },
  leadCardContent: {
      flex: 1,
  },
  leadCardName: {
      fontSize: 15,
      fontWeight: '800',
      color: COLORS.dark,
  },
  leadCardType: {
      fontSize: 11,
      color: COLORS.muted,
      fontWeight: '600',
      marginTop: 2,
  },
  callBtn: {
      width: 38,
      height: 38,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  leadCardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#f1f5f9',
  },
  metaBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: '#f8fafc',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
  },
  metaText: {
      fontSize: 10,
      fontWeight: '700',
      color: COLORS.muted,
  },
  detailsBtn: {
      padding: 5,
  },
  sendQuoteMini: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: '#3b82f6' + '10',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
  },
  detailsText: {
      fontSize: 11,
      fontWeight: '800',
      color: '#3b82f6',
  },
  emptyView: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
  },
  emptyTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: COLORS.dark,
      marginTop: 20,
  },
  emptyDesc: {
      fontSize: 13,
      color: COLORS.muted,
      textAlign: 'center',
      marginHorizontal: 30,
      marginTop: 10,
      lineHeight: 18,
      fontWeight: '500',
  }
});
