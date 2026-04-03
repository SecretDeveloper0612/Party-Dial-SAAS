import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Party Dial Colors
const PD_GRADIENT: readonly [string, string, ...string[]] = ['#FF4B5C', '#E34BA9', '#8B4DCC', '#2F6FD6'];

export default function LoginScreen() {
  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  const handleCreateAccount = async () => {
    await WebBrowser.openBrowserAsync('https://partydial.com/signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Banner Section */}
      <LinearGradient
        colors={PD_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBanner}
      >
        <SafeAreaView style={styles.topHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Party Dial</Text>
            <TouchableOpacity style={styles.topButton} onPress={handleCreateAccount}>
              <Text style={styles.topButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content Card */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.whiteCard}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>Enter your details below to access console</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="vendor@partydial.com"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="••••••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                style={styles.input}
              />
              <IconSymbol name="eye.fill" size={18} color="#94a3b8" style={styles.inputIcon} />
            </View>
          </View>

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.mainButton}>
            <LinearGradient
              colors={PD_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.googleInner}>
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBanner: {
    height: height * 0.35,
    width: '100%',
  },
  topHeader: {
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 90,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  topButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  topButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  keyboardView: {
    flex: 1,
    marginTop: -50,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 35,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingHorizontal: 15,
    height: 55,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    height: '100%',
  },
  inputIcon: {
    marginLeft: 10,
  },
  mainButton: {
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#E34BA9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  forgotText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  dividerText: {
    color: '#94a3b8',
    marginHorizontal: 15,
    fontSize: 12,
    fontWeight: '800',
  },
  googleButton: {
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  googleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
});

