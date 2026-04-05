import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, StatusBar, TextInput, Dimensions, Alert, Linking, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  border: '#f1f5f1'
};

const AMENITIES = [
  { name: 'Air Conditioning', icon: 'snow-outline' },
  { name: 'Parking Available', icon: 'car-outline' },
  { name: 'Power Backup', icon: 'flash-outline' },
  { name: 'Indoor Hall', icon: 'business-outline' },
  { name: 'Outdoor Lawn', icon: 'leaf-outline' },
  { name: 'In-House Catering', icon: 'restaurant-outline' },
  { name: 'Outside Catering Allowed', icon: 'fast-food-outline' },
  { name: 'DJ Allowed', icon: 'musical-notes-outline' },
  { name: 'Decoration Available', icon: 'sparkles-outline' },
  { name: 'Bridal Room', icon: 'female-outline' },
  { name: 'Security Available', icon: 'shield-checkmark-outline' },
  { name: 'Wi-Fi Available', icon: 'wifi-outline' }
];

const GALLERY_CATEGORIES = ['Interior', 'Decoration', 'Food', 'Exterior', 'Setup'];

type CategorizedGallery = { [key: string]: string[] };

export default function EditProfileScreen() {
  const router = useRouter();
  const [venueName, setVenueName] = useState('Imperial Ballroom');
  const [address, setAddress] = useState('Imperial Ballroom, Nainital Road, Haldwani');
  const [contact, setContact] = useState('+91 9876543210');
  const [about, setAbout] = useState("Henry's Imperial Ballroom is a premium events space designed for grandeur.");
  const [vegRate, setVegRate] = useState('750');
  const [nonVegRate, setNonVegRate] = useState('950');
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['Air Conditioning', 'Parking Available']);
  const [activeGalleryTab, setActiveGalleryTab] = useState('Interior');
  const [covers, setCovers] = useState<string[]>([
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800'
  ]);
  const [spaces, setSpaces] = useState<any[]>([
    { id: '1', name: 'Grand Ballroom', capacity: '800', area: '12000 sq ft', photo: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500' },
    { id: '2', name: 'Rooftop Terrace', capacity: '300', area: '4500 sq ft', photo: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500' }
  ]);
  const [homeGallery, setHomeGallery] = useState<string[]>([
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=300'
  ]);

  const [categorizedGallery, setCategorizedGallery] = useState<CategorizedGallery>({
      'Interior': ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500'],
      'Decoration': [], 'Food': [], 'Exterior': [], 'Setup': []
  });

  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
  const [newSpace, setNewSpace] = useState({ name: '', capacity: '', area: '', photo: '' });

  useEffect(() => {
    const loadStored = async () => {
        const data = await AsyncStorage.getItem('@venue_profile_data');
        if (data) {
            const saved = JSON.parse(data);
            setVenueName(saved.name || '');
            setAddress(saved.address || '');
            setContact(saved.contact || '');
            setAbout(saved.about || '');
            setVegRate(saved.vegRate || '');
            setNonVegRate(saved.nonVegRate || '');
            if (saved.amenities) setSelectedAmenities(saved.amenities);
            if (saved.covers) setCovers(saved.covers);
            if (saved.spaces) setSpaces(saved.spaces);
            if (saved.homeGallery) setHomeGallery(saved.homeGallery);
            if (saved.categorizedGallery) setCategorizedGallery(saved.categorizedGallery);
        }
    };
    loadStored();
  }, []);

  const saveProfile = async () => {
    try {
        const payload = {
            name: venueName, address, contact, about, vegRate, nonVegRate,
            amenities: selectedAmenities, covers, spaces, homeGallery, categorizedGallery
        };
        await AsyncStorage.setItem('@venue_profile_data', JSON.stringify(payload));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Profile Saved', 'Successfully updated your venue records.');
    } catch (e) {
        Alert.alert('Error', 'Failed to save profile.');
    }
  };

  const pickImage = async (target: 'cover' | 'space' | 'home' | 'new_space' | 'category', id?: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission Error', 'Gallery access denied.');

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: (target === 'home' || target === 'space'),
      aspect: [1, 1],
      quality: 0.8,
      allowsMultipleSelection: (target === 'cover' || target === 'category'),
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (target === 'cover') {
        setCovers([...covers, ...result.assets.map(a => a.uri)]);
      } else if (target === 'space') {
        setSpaces(spaces.map(s => s.id === id ? { ...s, photo: result.assets[0].uri } : s));
      } else if (target === 'home') {
          setHomeGallery([...homeGallery, result.assets[0].uri].slice(0, 6));
      } else if (target === 'new_space') {
        setNewSpace({ ...newSpace, photo: result.assets[0].uri });
      } else if (target === 'category') {
        const uris = result.assets.map(a => a.uri);
        setCategorizedGallery({
            ...categorizedGallery,
            [activeGalleryTab]: [...(categorizedGallery[activeGalleryTab] || []), ...uris]
        });
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const removeFromCategory = (idx: number) => {
    const updated = categorizedGallery[activeGalleryTab].filter((_, i) => i !== idx);
    setCategorizedGallery({ ...categorizedGallery, [activeGalleryTab]: updated });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleAddSpace = () => {
    if (!newSpace.name || !newSpace.capacity) return Alert.alert('Error', 'Details missing.');
    setSpaces([...spaces, { id: Date.now().toString(), ...newSpace, photo: newSpace.photo || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500' }]);
    setNewSpace({ name: '', capacity: '', area: '', photo: '' });
    setShowAddSpaceModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color={COLORS.dark} /></TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Venue Profile</Text>
          <TouchableOpacity onPress={saveProfile}><Text style={styles.saveBtn}>Save</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Covers */}
          <View style={styles.section}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Cover Photos Slider</Text>
                  <TouchableOpacity onPress={() => pickImage('cover')}><Text style={styles.addText}>+ Add Photo</Text></TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.coverList}>
                  {covers.map((uri, idx) => (
                      <View key={idx} style={styles.coverWrapper}>
                          <Image source={{ uri }} style={styles.coverImg} />
                          <TouchableOpacity onPress={() => setCovers(covers.filter((_, i) => i !== idx))} style={styles.removeBtn}><Ionicons name="close-circle" size={20} color="#fff" /></TouchableOpacity>
                      </View>
                  ))}
              </ScrollView>
          </View>

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.formGroup}><Text style={styles.label}>Venue Name</Text><TextInput style={styles.input} value={venueName} onChangeText={setVenueName} /></View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Address</Text>
                <View style={styles.row}>
                    <TextInput style={[styles.input, { flex: 1 }]} value={address} onChangeText={setAddress} multiline />
                    <TouchableOpacity style={styles.mapBtn} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`)}><Ionicons name="map" size={20} color={COLORS.blue} /></TouchableOpacity>
                </View>
            </View>
          </View>

          {/* About & Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Venue</Text>
            <TextInput style={[styles.input, {height: 80, textAlignVertical:'top'}]} value={about} onChangeText={setAbout} multiline />
            
            <Text style={[styles.sectionTitle, {marginTop: 20}]}>Select Amenities</Text>
            <View style={styles.amenitiesGrid}>
                {AMENITIES.map(a => (
                    <TouchableOpacity key={a.name} style={[styles.chip, selectedAmenities.includes(a.name) && styles.chipActive]} onPress={() => setSelectedAmenities(selectedAmenities.includes(a.name) ? selectedAmenities.filter(x => x !== a.name) : [...selectedAmenities, a.name])}>
                        <Ionicons name={a.icon as any} size={14} color={selectedAmenities.includes(a.name) ? '#fff' : COLORS.muted} />
                        <Text style={[styles.chipText, selectedAmenities.includes(a.name) && {color:'#fff'}]}>{a.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
          </View>

          {/* Spaces */}
          <View style={styles.section}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Available Spaces</Text>
                  <TouchableOpacity onPress={() => setShowAddSpaceModal(true)}><Text style={styles.addText}>+ Add Space</Text></TouchableOpacity>
              </View>
              {spaces.map(s => (
                  <View key={s.id} style={styles.spaceCard}>
                      <Image source={{ uri: s.photo }} style={styles.spaceImg} />
                      <View style={{flex: 1}}>
                          <Text style={styles.spaceName}>{s.name}</Text>
                          <Text style={styles.spaceMeta}>{s.capacity} Pax | {s.area}</Text>
                          <View style={styles.row}>
                              <TouchableOpacity style={styles.editBtn} onPress={() => pickImage('space', s.id)}><Text style={styles.editText}>Edit Photo</Text></TouchableOpacity>
                              <TouchableOpacity onPress={() => setSpaces(spaces.filter(x => x.id !== s.id))} style={{marginLeft: 15}}><Ionicons name="trash" size={16} color="#ef4444" /></TouchableOpacity>
                          </View>
                      </View>
                  </View>
              ))}
          </View>

          {/* Home Gallery */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Home Gallery (Top 6)</Text>
              <View style={styles.galleryGrid}>
                  {homeGallery.map((uri, idx) => (
                      <View key={idx} style={styles.gallerySlot}>
                          <Image source={{ uri }} style={{width: '100%', height:'100%'}} />
                          <TouchableOpacity onPress={() => setHomeGallery(homeGallery.filter((_, i) => i !== idx))} style={styles.slotRemove}><Ionicons name="close" size={14} color="#fff" /></TouchableOpacity>
                      </View>
                  ))}
                  {homeGallery.length < 6 && <TouchableOpacity style={styles.addSlot} onPress={() => pickImage('home')}><Ionicons name="add" size={24} color={COLORS.muted} /></TouchableOpacity>}
              </View>
          </View>

          {/* Categorized Gallery Management */}
          <View style={[styles.section, {borderBottomWidth: 0}]}>
              <Text style={styles.sectionTitle}>Full Gallery Categories</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 15}}>
                  {GALLERY_CATEGORIES.map(cat => (
                      <TouchableOpacity key={cat} style={[styles.filterTab, activeGalleryTab === cat && styles.filterTabActive]} onPress={() => setActiveGalleryTab(cat)}>
                          <Text style={[styles.filterTabText, activeGalleryTab === cat && {color:'#fff'}]}>{cat}</Text>
                      </TouchableOpacity>
                  ))}
              </ScrollView>

              <View style={styles.categoryGrid}>
                  {categorizedGallery[activeGalleryTab]?.map((uri, idx) => (
                      <View key={idx} style={styles.categorySlot}>
                          <Image source={{ uri }} style={{width:'100%', height:'100%'}} />
                          <TouchableOpacity onPress={() => removeFromCategory(idx)} style={styles.slotRemove}><Ionicons name="trash" size={12} color="#fff" /></TouchableOpacity>
                      </View>
                  ))}
                  <TouchableOpacity style={styles.addCategorySlot} onPress={() => pickImage('category')}>
                      <Ionicons name="cloud-upload-outline" size={20} color={COLORS.blue} />
                      <Text style={{fontSize: 9, fontWeight:'800', color: COLORS.blue, marginTop: 4}}>Upload</Text>
                  </TouchableOpacity>
              </View>
          </View>

      </ScrollView>

      {/* Add Space Modal */}
      <Modal visible={showAddSpaceModal} animationType="slide" transparent>
          <View style={styles.overlay}>
              <View style={styles.modalCard}>
                  <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>New Venue Space</Text>
                      <TouchableOpacity onPress={() => setShowAddSpaceModal(false)}><Ionicons name="close" size={24} color={COLORS.dark} /></TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.modalPhoto} onPress={() => pickImage('new_space')}>
                      {newSpace.photo ? <Image source={{ uri: newSpace.photo }} style={{width:'100%', height:'100%'}} /> : <Ionicons name="camera" size={30} color={COLORS.muted} />}
                  </TouchableOpacity>
                  <TextInput style={styles.modalInput} placeholder="Space Name" value={newSpace.name} onChangeText={t => setNewSpace({...newSpace, name: t})} />
                  <TextInput style={styles.modalInput} placeholder="Capacity" keyboardType="numeric" value={newSpace.capacity} onChangeText={t => setNewSpace({...newSpace, capacity: t})} />
                  <TextInput style={styles.modalInput} placeholder="Area" value={newSpace.area} onChangeText={t => setNewSpace({...newSpace, area: t})} />
                  <TouchableOpacity style={styles.submitBtn} onPress={handleAddSpace}><Text style={styles.submitText}>Add to Listing</Text></TouchableOpacity>
              </View>
          </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 100, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: COLORS.dark },
  saveBtn: { color: COLORS.blue, fontSize: 15, fontWeight: '800' },
  scrollContent: { paddingBottom: 40 },
  section: { padding: 20, borderBottomWidth: 8, borderBottomColor: '#f8fafc' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: COLORS.dark },
  addText: { color: COLORS.blue, fontSize: 12, fontWeight: '800' },
  coverList: { gap: 15 },
  coverWrapper: { position: 'relative' },
  coverImg: { width: 250, height: 140, borderRadius: 20, backgroundColor: '#eee' },
  removeBtn: { position: 'absolute', right: 10, top: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 2 },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 11, fontWeight: '800', color: COLORS.muted, marginBottom: 6 },
  input: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 12, fontSize: 13, color: COLORS.dark, borderWidth: 1, borderColor: '#f1f5f9' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mapBtn: { padding: 12, backgroundColor: COLORS.blue + '10', borderRadius: 12 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#f1f5f9' },
  chipActive: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
  chipText: { fontSize: 11, fontWeight: '700', color: COLORS.muted },
  spaceCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 15, padding: 10, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 10, alignItems: 'center' },
  spaceImg: { width: 70, height: 70, borderRadius: 12, marginRight: 15 },
  spaceName: { fontSize: 14, fontWeight: '800', color: COLORS.dark },
  spaceMeta: { fontSize: 11, color: COLORS.muted, marginTop: 4 },
  editBtn: { backgroundColor: COLORS.blue + '10', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  editText: { fontSize: 10, fontWeight: '800', color: COLORS.blue },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gallerySlot: { width: (width - 60) / 3, height: (width - 60) / 3, borderRadius: 12, backgroundColor: '#eee', overflow: 'hidden', position: 'relative' },
  slotRemove: { position: 'absolute', right: 5, top: 5, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: 2 },
  addSlot: { width: (width - 60) / 3, height: (width - 60) / 3, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: '#f8fafc', marginRight: 10 },
  filterTabActive: { backgroundColor: COLORS.purple },
  filterTabText: { fontSize: 11, fontWeight: '700', color: COLORS.muted },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 20 },
  categorySlot: { width: (width - 65) / 4, height: (width - 65) / 4, borderRadius: 10, backgroundColor: '#eee', overflow: 'hidden', position: 'relative' },
  addCategorySlot: { width: (width - 65) / 4, height: (width - 65) / 4, borderStyle: 'dashed', borderWidth: 1, borderColor: COLORS.blue + '40', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.blue + '05' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 16, fontWeight: '900' },
  modalPhoto: { height: 120, backgroundColor: '#f8fafc', borderRadius: 15, borderStyle: 'dashed', borderWidth: 1, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginBottom: 15, overflow: 'hidden' },
  modalInput: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#f1f5f9' },
  submitBtn: { backgroundColor: COLORS.blue, padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#fff', fontWeight: '900' }
});
