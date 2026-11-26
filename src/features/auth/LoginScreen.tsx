import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from './components/LoginForm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../components/CustomHeader';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Login" />
      <KeyboardAvoidingView behavior={'padding'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.logo}>
              <Icon name="auto-stories" size={65} color="#fff" />
            </View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue reading</Text>
          </View>

          <View style={styles.form}>
            <LoginForm />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fcfcfc' },
  scroll: { flexGrow: 1, paddingHorizontal: 16, paddingTop: 80 },
  hero: { alignItems: 'center', marginBottom: 32 },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  form: { width: '100%' },
});
