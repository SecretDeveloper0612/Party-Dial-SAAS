import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, StatusBar, Dimensions, Modal, TextInput, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

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

export default function ProfileScreen() {
  const router = useRouter();
  const [showSupport, setShowSupport] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  
  const reviews = [
    { id: '1', name: 'Rahul Sharma', rating: 5, date: '2 days ago', comment: 'The Imperial Ballroom was perfect for our wedding. Highly recommended!', avatar: 'https://i.pravatar.cc/100?u=rahul' },
    { id: '2', name: 'Priya Verma', rating: 4, date: '1 week ago', comment: 'Great service, the staff was very professional.', avatar: 'https://i.pravatar.cc/100?u=priya' },
  ];

  const invoices = [
    { id: 'INV-001', date: 'March 15, 2026', amount: '₹14,999', status: 'Paid' },
    { id: 'INV-002', date: 'Feb 15, 2026', amount: '₹14,999', status: 'Paid' },
  ];

  const handleSupportSubmit = () => {
    Alert.alert('Support Ticket Created', 'We have received your message. Our team will contact you shortly via email.');
    setShowSupport(false);
  };

  const handleShareReview = () => {
    Alert.alert('Share Link', 'Review link copied: https://partydial.com/reviews/imperial-ballroom');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.mainWrapper}>
            <Text style={styles.groupTitle}>PROFILE SETTINGS</Text>
            
            <View style={styles.settingsGroup}>
                <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/profile-edit')}>
                    <View style={[styles.settingIcon, {backgroundColor: COLORS.blue + '15'}]}>
                        <Ionicons name="business-outline" size={20} color={COLORS.blue} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <Text style={styles.settingLabel}>Edit Profile Listing</Text>
                        <Text style={styles.settingSubtext}>Update venue photos, name, and address</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => setShowSupport(true)}>
                    <View style={[styles.settingIcon, {backgroundColor: COLORS.pink + '15'}]}>
                        <Ionicons name="headset-outline" size={20} color={COLORS.pink} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <Text style={styles.settingLabel}>Contact Support</Text>
                        <Text style={styles.settingSubtext}>Email us for business assistance</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => setShowInvoices(true)}>
                    <View style={[styles.settingIcon, {backgroundColor: COLORS.emerald + '15'}]}>
                        <Ionicons name="card-outline" size={20} color={COLORS.emerald} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <Text style={styles.settingLabel}>Invoices & Payments</Text>
                        <Text style={styles.settingSubtext}>Manage billing and download receipts</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleShareReview}>
                    <View style={[styles.settingIcon, {backgroundColor: COLORS.purple + '15'}]}>
                        <Ionicons name="share-social-outline" size={20} color={COLORS.purple} />
                    </View>
                    <View style={styles.settingTextContent}>
                        <Text style={styles.settingLabel}>Share Review Link</Text>
                        <Text style={styles.settingSubtext}>Get more client reviews for your venue</Text>
                    </View>
                    <Ionicons name="link-outline" size={18} color={COLORS.muted} />
                </TouchableOpacity>
            </View>

            {/* Manage Reviews Section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.groupTitle}>MANAGE REVIEWS</Text>
                <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text style={styles.ratingBadgeText}>4.8 Avg</Text>
                </View>
            </View>

            {reviews.map(review => (
                <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.reviewTop}>
                        <View style={[styles.reviewAvatar, {backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center'}]}>
                            <Ionicons name="person-circle-outline" size={32} color={COLORS.muted} />
                        </View>
                        <View style={styles.reviewCenter}>
                            <Text style={styles.reviewName}>{review.name}</Text>
                            <View style={styles.starRow}>
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={10} color={i < review.rating ? "#f59e0b" : "#e2e8f0"} />
                                ))}
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.replyBtn}>
                            <Text style={styles.replyBtnText}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.reviewBody}>{review.comment}</Text>
                </View>
            ))}

            <TouchableOpacity style={styles.logoutBtn}>
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Sign Out from Partner Console</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Support Modal */}
      <Modal visible={showSupport} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View>
                            <Text style={styles.modalTitle}>Contact Support</Text>
                            <Text style={styles.modalSub}>Ask us anything about your listing</Text>
                        </View>
                        <TouchableOpacity onPress={() => setShowSupport(false)} style={styles.closeBtn}>
                            <Ionicons name="close" size={24} color={COLORS.dark} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput style={styles.input} defaultValue="Henry" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput style={styles.input} defaultValue="henry@ballroom.com" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Message / Issue</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]} 
                            multiline 
                            numberOfLines={4} 
                            placeholder="Describe your issue or request..." 
                        />
                    </View>

                    <TouchableOpacity style={styles.submitBtn} onPress={handleSupportSubmit}>
                        <LinearGradient colors={PD_GRADIENT} style={styles.submitGradient} start={{x:0, y:0}} end={{x:1, y:0}}>
                            <Text style={styles.submitText}>Send Support Email</Text>
                        </LinearGradient>
                    </TouchableOpacity>
              </View>
          </View>
      </Modal>

      {/* Invoices Modal */}
      <Modal visible={showInvoices} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View>
                            <Text style={styles.modalTitle}>Invoices & Billing</Text>
                            <Text style={styles.modalSub}>History of your partner subscriptions</Text>
                        </View>
                        <TouchableOpacity onPress={() => setShowInvoices(false)} style={styles.closeBtn}>
                            <Ionicons name="close" size={24} color={COLORS.dark} />
                        </TouchableOpacity>
                    </View>
                    
                    {invoices.map((inv) => (
                        <View key={inv.id} style={styles.invoiceItem}>
                            <View style={styles.invInfo}>
                                <Text style={styles.invId}>{inv.id}</Text>
                                <Text style={styles.invDate}>{inv.date}</Text>
                            </View>
                            <View style={styles.invRight}>
                                <Text style={styles.invAmount}>{inv.amount}</Text>
                                <TouchableOpacity style={styles.downloadBtn} onPress={() => Alert.alert('Download', 'Downloading PDF...')}>
                                    <Ionicons name="download-outline" size={16} color={COLORS.blue} />
                                    <Text style={styles.downloadText}>PDF</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <View style={styles.upgradeBanner}>
                        <LinearGradient colors={[COLORS.emerald + '15', COLORS.emerald + '05']} style={styles.bannerContent}>
                            <Ionicons name="sparkles" size={20} color={COLORS.emerald} />
                            <Text style={styles.bannerText}>Unlock 500 more leads this month by upgrading to Platinum Pro.</Text>
                        </LinearGradient>
                    </View>
              </View>
          </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerGlow: {
    borderRadius: 30,
    padding: 25,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.emerald,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  headerInfo: {
    marginLeft: 15,
  },
  headerName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  premiumBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  locationLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
  mainWrapper: {
    padding: 25,
    paddingTop: 40,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.muted,
    letterSpacing: 2,
    marginBottom: 15,
  },
  settingsGroup: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 30,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingTextContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.dark,
  },
  settingSubtext: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#f59e0b',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 12,
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    marginRight: 12,
  },
  reviewCenter: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 9,
    color: COLORS.muted,
    marginLeft: 6,
    fontWeight: '600',
  },
  replyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  replyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.muted,
  },
  reviewBody: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 10,
    padding: 15,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
  },
  modalSub: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 4,
  },
  closeBtn: {
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    padding: 15,
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  textArea: {
      height: 100,
      textAlignVertical: 'top',
  },
  submitBtn: {
      borderRadius: 18,
      overflow: 'hidden',
  },
  submitGradient: {
      paddingVertical: 18,
      alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  invInfo: {
    flex: 1,
  },
  invId: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.dark,
  },
  invDate: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
  },
  invRight: {
    alignItems: 'flex-end',
  },
  invAmount: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.dark,
    marginBottom: 5,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.blue + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  downloadText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.blue,
  },
  upgradeBanner: {
    marginTop: 20,
    borderRadius: 18,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  bannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.emerald,
    lineHeight: 18,
  }
});
