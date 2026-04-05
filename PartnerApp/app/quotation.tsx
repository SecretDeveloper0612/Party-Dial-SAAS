import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Alert, StatusBar, Modal, Image, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

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

interface QuoteItem {
  id: string;
  description: string;
  price: string;
  qty: string;
}

// Default Data (Fallback)
const PROPERTY_DATA = {
  name: "Henry's Imperial Ballroom",
  location: "Nainital Road, Haldwani",
  description: "A premium luxury event space designed for grand celebrations.",
  amenities: [
    { name: 'Air Conditioning', icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596043.png' },
    { name: 'Parking Available', icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596102.png' },
    { name: 'Power Backup', icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596109.png' },
    { name: 'Indoor Hall', icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596115.png' },
    { name: 'In-House Catering', icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596120.png' },
    { name: 'Wi-Fi Available', icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596125.png' }
  ],
  images: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500'
  ]
};

export default function QuotationMakerScreen() {
  const [customerName, setCustomerName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', description: 'Event Venue Rental', price: '50000', qty: '1' }
  ]);
  const [tax, setTax] = useState('18');
  const [discount, setDiscount] = useState('0');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [liveVenue, setLiveVenue] = useState(PROPERTY_DATA);

  useFocusEffect(
    React.useCallback(() => {
      const loadProfileData = async () => {
          try {
              const data = await AsyncStorage.getItem('@venue_profile_data');
              if (data) {
                  const saved = JSON.parse(data);
                  setLiveVenue({
                      name: saved.name || PROPERTY_DATA.name,
                      location: saved.address || PROPERTY_DATA.location,
                      description: saved.about || PROPERTY_DATA.description,
                      amenities: saved.amenities ? saved.amenities.map((a: string) => ({ name: a, icon: 'https://cdn-icons-png.flaticon.com/512/3596/3596043.png' })) : PROPERTY_DATA.amenities,
                      images: saved.covers && saved.covers.length > 0 ? saved.covers : PROPERTY_DATA.images
                  });
              }
          } catch (e) {
              console.log('Error loading profile in quote maker');
          }
      };
      loadProfileData();
    }, [])
  );

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', price: '', qty: '1' }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price || '0') * parseFloat(item.qty || '0')), 0);
  const discountAmount = (subtotal * parseFloat(discount || '0')) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * parseFloat(tax || '0')) / 100;
  const total = taxableAmount + taxAmount;

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; background: #fff; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; }
          .brand-info { flex: 1; }
          .brand-name { font-size: 26px; font-weight: 900; color: #0f172a; }
          .location { font-size: 13px; color: #64748b; margin-top: 4px; font-weight: 600; }
          .logo { width: 60px; height: 60px; }
          .greet-box { margin-top: 40px; margin-bottom: 30px; }
          .greet-title { font-size: 20px; font-weight: 800; }
          .about-section { background: #f8fafc; padding: 20px; border-radius: 15px; margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 12px; border-left: 4px solid #2f6fd6; padding-left: 10px; }
          .amenities-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px; }
          .amenity-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #475569; }
          .amenity-icon { width: 14px; height: 14px; }
          .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 20px; }
          .gallery-img { width: 100%; height: 150px; border-radius: 8px; object-fit: cover; }
          .table { width: 100%; border-collapse: collapse; margin-top: 40px; }
          .table th { background: #0f172a; color: #fff; text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
          .table td { padding: 15px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .fin-box { margin-top: 30px; margin-left: auto; width: 300px; background: #fffefe; padding: 20px; border-radius: 12px; border: 1px solid #f1f5f9; }
          .fin-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
          .fin-label { color: #64748b; font-weight: 600; }
          .fin-val { font-weight: 800; }
          .grand-row { border-top: 2px solid #f1f5f9; padding-top: 15px; margin-top: 15px; }
          .grand-label { font-size: 18px; font-weight: 900; }
          .grand-val { font-size: 22px; font-weight: 900; color: #ff4b5c; }
          .ai-stamp { margin-top: 60px; text-align: center; border: 1px dashed #8b4dcc50; padding: 15px; border-radius: 10px; font-size: 11px; color: #8b4dcc; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand-info">
            <div class="brand-name">${PROPERTY_DATA.name}</div>
            <div class="location">📍 ${PROPERTY_DATA.location}</div>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" class="logo" />
        </div>

        <div class="greet-box">
          <div class="greet-title">Quotation for ${customerName}</div>
          <p>Hi ${customerName}, based on your requirement of "${requirements || 'a luxury venue'}", here is our customized proposal for your event.</p>
        </div>

        <div class="section-title">ABOUT OUR VENUE</div>
        <div class="about-section">
          <p style="margin: 0; font-size: 14px; color: #334155;">${PROPERTY_DATA.description}</p>
          <div class="amenities-grid">
            ${PROPERTY_DATA.amenities.map(am => `
              <div class="amenity-item">
                <img src="${am.icon}" class="amenity-icon" />
                ${am.name}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section-title">VENUE GALLERY</div>
        <div class="gallery-grid">
          ${PROPERTY_DATA.images.map(img => `<img src="${img}" class="gallery-img" />`).join('')}
        </div>

        <table class="table">
          <thead>
            <tr><th>Description</th><th style="text-align: center;">Qty</th><th style="text-align: right;">Amount (₹)</th></tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td style="font-weight: 700;">${item.description}</td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right; font-weight: 800;">₹ ${(parseInt(item.price || '0') * parseInt(item.qty || '0')).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="fin-box">
          <div class="fin-row"><span class="fin-label">Subtotal</span><span class="fin-val">₹ ${subtotal.toLocaleString()}</span></div>
          ${discount !== '0' ? `<div class="fin-row"><span class="fin-label" style="color: #10b981;">Discount (${discount}%)</span><span class="fin-val" style="color: #10b981;">- ₹ ${discountAmount.toLocaleString()}</span></div>` : ''}
          <div class="fin-row"><span class="fin-label">Taxes (${tax}%)</span><span class="fin-val">₹ ${taxAmount.toLocaleString()}</span></div>
          <div class="fin-row grand-row"><span class="grand-label">GRAND TOTAL</span><span class="grand-val">₹ ${total.toLocaleString()}</span></div>
        </div>

        <div class="ai-stamp">
          ✨ This document is a visual-first proposal created by Party Dial AI Engine for ${PROPERTY_DATA.name}.
        </div>
      </body>
    </html>
  `;

  const handleSharePDF = async () => {
    try {
      setIsGenerating(true);
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      setIsGenerating(false);
    } catch (e) {
      setIsGenerating(false);
      Alert.alert('Error', 'Unable to share PDF');
    }
  };

  const handleDownloadPDF = async () => {
    try {
        await Print.printAsync({ html: htmlContent });
    } catch (e) {
        Alert.alert('Error', 'Unable to print/download');
    }
  };

  const handleShareEmail = async () => {
    try {
        const isAvailable = await MailComposer.isAvailableAsync();
        if (isAvailable) {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await MailComposer.composeAsync({
                subject: `Event Proposal: ${customerName}`,
                body: `Dear ${customerName},\n\nPlease find the attached proposal for your event at ${PROPERTY_DATA.name}.`,
                attachments: [uri]
            });
        } else {
            const mailUrl = `mailto:?subject=Proposal&body=Hi ${customerName}`;
            Linking.openURL(mailUrl);
        }
    } catch (e) {
        Alert.alert('Error', 'Unable to share via email');
    }
  };

  const handleGenerate = () => {
    if (!customerName) {
      Alert.alert('Missing Info', 'Please enter the customer name.');
      return;
    }
    if (items.some(i => !i.description || !i.price)) {
      Alert.alert('Missing Info', 'Please fill in all item descriptions and prices.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Quotation Maker</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.introBox}>
          <LinearGradient colors={[COLORS.pink + '15', COLORS.purple + '15']} style={styles.introGradient}>
            <Ionicons name="sparkles" size={24} color={COLORS.pink} />
            <View style={{flex: 1}}>
                <Text style={styles.introTitle}>Smart Proposal Builder</Text>
                <Text style={styles.introText}>Our AI will merge your venue profile with client specifics to create a high-fidelity proposal.</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.formCard}>
              <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Customer Name</Text>
                  <TextInput
                    placeholder="e.g. Alok Gupta"
                    style={styles.input}
                    value={customerName}
                    onChangeText={setCustomerName}
                  />
              </View>
              <View style={[styles.inputContainer, { marginTop: 15 }]}>
                  <Text style={styles.inputLabel}>Special Requirements / Note</Text>
                  <TextInput
                    placeholder="e.g. Needs extra stage lights and 200kg flowers..."
                    style={[styles.input, styles.textArea]}
                    value={requirements}
                    onChangeText={setRequirements}
                    multiline
                  />
              </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Items</Text>
          {items.map((item, index) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemIndex}>Item #{index + 1}</Text>
                {items.length > 1 && (
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                placeholder="Description (e.g. Catering Services)"
                style={styles.input}
                value={item.description}
                onChangeText={(val) => updateItem(item.id, 'description', val)}
              />
              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 2, marginTop: 10 }]}>
                  <Text style={styles.inputLabel}>Price (₹)</Text>
                  <TextInput
                    placeholder="0.00"
                    keyboardType="numeric"
                    style={styles.input}
                    value={item.price}
                    onChangeText={(val) => updateItem(item.id, 'price', val)}
                  />
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginTop: 10 }]}>
                  <Text style={styles.inputLabel}>Qty</Text>
                  <TextInput
                    placeholder="1"
                    keyboardType="numeric"
                    style={styles.input}
                    value={item.qty}
                    onChangeText={(val) => updateItem(item.id, 'qty', val)}
                  />
                </View>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addItemBtn} onPress={addItem}>
            <Ionicons name="add" size={20} color={COLORS.blue} />
            <Text style={styles.addItemText}>Add Another Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Taxes & Discounts</Text>
           <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Tax / GST (%)</Text>
                    <TextInput
                        placeholder="18"
                        keyboardType="numeric"
                        style={styles.input}
                        value={tax}
                        onChangeText={setTax}
                    />
                </View>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Discount (%)</Text>
                    <TextInput
                        placeholder="0"
                        keyboardType="numeric"
                        style={styles.input}
                        value={discount}
                        onChangeText={setDiscount}
                    />
                </View>
           </View>
        </View>

        <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹ {subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount ({discount}%)</Text>
                <Text style={[styles.summaryValue, { color: COLORS.emerald }]}>- ₹ {discountAmount.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>GST ({tax}%)</Text>
                <Text style={styles.summaryValue}>₹ {taxAmount.toLocaleString()}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>₹ {total.toLocaleString()}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} disabled={isGenerating}>
          <LinearGradient colors={PD_GRADIENT} style={styles.gradientBtn} start={{x:0, y:0}} end={{x:1, y:0}}>
            {isGenerating ? (
              <Text style={styles.generateText}>GENERATING PROPOSAL...</Text>
            ) : (
              <>
                <Ionicons name="sparkles" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.generateText}>GENERATE AI PROPOSAL</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Preview Modal */}
      <Modal visible={showPreview} animationType="slide" transparent={false}>
          <SafeAreaView style={styles.fullModal}>
              <View style={styles.modalHeaderFixed}>
                    <TouchableOpacity onPress={() => setShowPreview(false)} style={styles.closeBtn}>
                        <Ionicons name="close" size={24} color={COLORS.dark} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitleFull}>Proposal Preview</Text>
                    <View style={{ width: 40 }} />
              </View>

              <ScrollView style={styles.proposalScroll} showsVerticalScrollIndicator={false}>
                    <View style={styles.proposalPaper}>
                        {/* Property Header */}
                        <View style={styles.propHeader}>
                             <View style={{flex: 1}}>
                                <Text style={styles.propBrand}>{PROPERTY_DATA.name}</Text>
                                <View style={styles.locBox}>
                                    <Ionicons name="location" size={12} color={COLORS.muted} />
                                    <Text style={styles.propLoc}>{PROPERTY_DATA.location}</Text>
                                </View>
                             </View>
                             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png' }} style={styles.brandLogo} />
                        </View>

                        <View style={styles.proposalDivider} />

                        {/* Customer Greeting */}
                        <View style={styles.greetingBox}>
                            <Text style={styles.greetTitle}>Hi {customerName},</Text>
                            <Text style={styles.greetText}>
                                Based on your requirement of "{requirements || 'a luxury event space'}", we are excited to offer our venue for your special occasion. Here is our customized quotation and property overview.
                            </Text>
                        </View>

                        {/* Property Description & Amenities */}
                        <View style={styles.propDetailSection}>
                            <Text style={styles.propAboutTitle}>About our Venue</Text>
                            <Text style={styles.propAboutText}>{PROPERTY_DATA.description}</Text>
                            
                            <View style={styles.amenitiesPreviewGrid}>
                                {PROPERTY_DATA.amenities.map((am, i) => (
                                    <View key={i} style={styles.amenityPreviewItem}>
                                        <Image source={{ uri: am.icon }} style={{ width: 14, height: 14 }} />
                                        <Text style={styles.amenityPreviewName}>{am.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Image Gallery */}
                        <View style={styles.galleryPreviewSection}>
                            <Text style={styles.propAboutTitle}>Venue Gallery</Text>
                            <View style={styles.imageGrid}>
                                {PROPERTY_DATA.images.map((img, i) => (
                                    <Image key={i} source={{ uri: img }} style={styles.gridImg} />
                                ))}
                            </View>
                            <TouchableOpacity style={styles.viewMoreBtn} onPress={() => Linking.openURL('https://partydial.com')}>
                                <Text style={styles.viewMoreText}>View all 45+ Photos on Website</Text>
                                <Ionicons name="chevron-forward" size={14} color={COLORS.blue} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.proposalDivider} />

                        {/* Financial Table */}
                        <View style={styles.financialSection}>
                            <Text style={styles.propAboutTitle}>Proposed Quotation</Text>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderText, {flex: 3}]}>Description</Text>
                                <Text style={[styles.tableHeaderText, {flex: 1, textAlign: 'center'}]}>Qty</Text>
                                <Text style={[styles.tableHeaderText, {flex: 2, textAlign: 'right'}]}>Price</Text>
                            </View>
                            {items.map(item => (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, {flex: 3, fontWeight: '700'}]}>{item.description}</Text>
                                    <Text style={[styles.tableCell, {flex: 1, textAlign: 'center'}]}>{item.qty}</Text>
                                    <Text style={[styles.tableCell, {flex: 2, textAlign: 'right'}]}>₹ {(parseInt(item.price || '0') * parseInt(item.qty || '1')).toLocaleString()}</Text>
                                </View>
                            ))}

                            <View style={styles.finalFinancials}>
                                <View style={styles.finRow}>
                                    <Text style={styles.finLabel}>Subtotal</Text>
                                    <Text style={styles.finVal}>₹ {subtotal.toLocaleString()}</Text>
                                </View>
                                {discount !== '0' && (
                                    <View style={styles.finRow}>
                                        <Text style={[styles.finLabel, {color: COLORS.emerald}]}>Discount ({discount}%)</Text>
                                        <Text style={[styles.finVal, {color: COLORS.emerald}]}>- ₹ {discountAmount.toLocaleString()}</Text>
                                    </View>
                                )}
                                <View style={styles.finRow}>
                                    <Text style={styles.finLabel}>Taxes ({tax}%)</Text>
                                    <Text style={styles.finVal}>₹ {taxAmount.toLocaleString()}</Text>
                                </View>
                                <View style={[styles.finRow, styles.grandRow]}>
                                    <Text style={styles.grandLabel}>FINAL TOTAL</Text>
                                    <Text style={styles.grandVal}>₹ {total.toLocaleString()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.aiStamp}>
                            <Ionicons name="sparkles" size={16} color={COLORS.purple} />
                            <Text style={styles.aiStampText}>This document is a visual-first proposal created by Party Dial AI Engine.</Text>
                        </View>
                    </View>
              </ScrollView>

              <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.shareBtnMain} onPress={handleSharePDF} disabled={isGenerating}>
                        {isGenerating ? <Text style={styles.shareBtnText}>Processing...</Text> : (
                            <>
                                <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                                <Text style={styles.shareBtnText}>Share PDF</Text>
                            </>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnSmall} onPress={handleShareEmail}>
                        <Ionicons name="mail" size={20} color={COLORS.dark} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnSmall} onPress={handleDownloadPDF}>
                        <Ionicons name="download-outline" size={20} color={COLORS.dark} />
                    </TouchableOpacity>
              </View>
          </SafeAreaView>
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
    paddingHorizontal: 20,
    height: 100,
    paddingTop: 40,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
  },
  backBtn: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  introBox: {
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
  },
  introGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  introTitle: {
      fontSize: 14,
      fontWeight: '900',
      color: COLORS.dark,
      marginBottom: 4,
  },
  introText: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '600',
    lineHeight: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 15,
  },
  formCard: {
      backgroundColor: '#fff',
      borderRadius: 18,
      padding: 15,
      borderWidth: 1,
      borderColor: COLORS.border,
  },
  itemRow: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIndex: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.muted,
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginTop: 0,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.muted,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '600',
  },
  textArea: {
      height: 80,
      textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderStyle: 'dashed',
    marginTop: 5,
    gap: 8,
  },
  addItemText: {
    color: COLORS.blue,
    fontSize: 13,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: COLORS.dark,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  totalRow: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    marginBottom: 0,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  totalValue: {
    color: COLORS.pink,
    fontSize: 18,
    fontWeight: '900',
  },
  generateBtn: {
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  gradientBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  fullModal: {
      flex: 1,
      backgroundColor: '#f1f5f9',
  },
  modalHeaderFixed: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      height: 60,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
  },
  modalTitleFull: {
      fontSize: 16,
      fontWeight: '800',
      color: COLORS.dark,
  },
  closeBtn: {
      padding: 5,
  },
  proposalScroll: {
      flex: 1,
      padding: 15,
  },
  proposalPaper: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 5,
      marginBottom: 30,
  },
  propHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
  },
  propBrand: {
      fontSize: 18,
      fontWeight: '900',
      color: COLORS.dark,
  },
  locBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
  },
  propLoc: {
      fontSize: 11,
      color: COLORS.muted,
      fontWeight: '600',
  },
  brandLogo: {
      width: 40,
      height: 40,
  },
  proposalDivider: {
      height: 1,
      backgroundColor: '#f1f5f9',
      marginVertical: 20,
  },
  greetingBox: {
      marginBottom: 20,
  },
  greetTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: COLORS.dark,
      marginBottom: 8,
  },
  greetText: {
      fontSize: 13,
      color: COLORS.text,
      lineHeight: 20,
      fontWeight: '500',
  },
  propDetailSection: {
      backgroundColor: '#f8fafc',
      padding: 15,
      borderRadius: 12,
      marginBottom: 20,
  },
  propAboutTitle: {
      fontSize: 14,
      fontWeight: '800',
      color: COLORS.dark,
      marginBottom: 10,
  },
  propAboutText: {
      fontSize: 12,
      color: COLORS.text,
      lineHeight: 18,
      marginBottom: 15,
  },
  amenitiesPreviewGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
  },
  amenityPreviewItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: '#fff',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#e2e8f0',
  },
  amenityPreviewName: {
      fontSize: 10,
      fontWeight: '700',
      color: COLORS.muted,
  },
  galleryPreviewSection: {
      marginBottom: 20,
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      marginBottom: 10,
  },
  gridImg: {
      width: (width - 80) / 3,
      height: (width - 80) / 3,
      borderRadius: 4,
  },
  viewMoreBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      justifyContent: 'center',
      paddingVertical: 10,
  },
  viewMoreText: {
      fontSize: 11,
      fontWeight: '800',
      color: COLORS.blue,
  },
  financialSection: {
      marginTop: 10,
  },
  tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f8fafc',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
  },
  tableHeaderText: {
      fontSize: 10,
      fontWeight: '900',
      color: COLORS.muted,
      textTransform: 'uppercase',
  },
  tableRow: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f1f5f9',
  },
  tableCell: {
      fontSize: 12,
      color: COLORS.dark,
  },
  finalFinancials: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#fff8f8',
      borderRadius: 12,
  },
  finRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
  },
  finLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: COLORS.muted,
  },
  finVal: {
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.dark,
  },
  grandRow: {
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
      marginBottom: 0,
  },
  grandLabel: {
      fontSize: 14,
      fontWeight: '900',
      color: COLORS.dark,
  },
  grandVal: {
      fontSize: 16,
      fontWeight: '900',
      color: COLORS.pink,
  },
  aiStamp: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      gap: 8,
      borderWidth: 1,
      borderColor: COLORS.purple + '20',
      padding: 10,
      borderRadius: 10,
      borderStyle: 'dashed',
  },
  aiStampText: {
      fontSize: 9,
      fontWeight: '700',
      color: COLORS.purple,
      textAlign: 'center',
  },
  modalActions: {
      flexDirection: 'row',
      padding: 20,
      backgroundColor: '#fff',
      gap: 12,
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
  },
  shareBtnMain: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#10B981',
      paddingVertical: 16,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
  },
  shareBtnText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '900',
  },
  actionBtnSmall: {
      width: 55,
      height: 55,
      backgroundColor: '#f1f5f9',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
  }
});
