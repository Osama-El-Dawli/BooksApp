import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from './components/LoginForm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../components/CustomHeader';
import Animated, { FadeInDown } from 'react-native-reanimated';

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
          <Animated.View
            entering={FadeInDown.springify().duration(600)}
            style={styles.hero}
          >
            <View style={styles.logo}>
              <Icon name="auto-stories" size={65} color="#fff" />
            </View>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue reading</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.springify().duration(600)}
            style={styles.form}
          >
            <LoginForm />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F4EF' },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 60 },
  hero: { alignItems: 'center', marginBottom: 36 },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#1A1A2E',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#8A7F72',
    marginTop: 4,
  },
  form: { width: '100%' },
});
