import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import LoginTextInput from './LoginTextInput';
import CustomButton from '../../../components/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginValues } from '../schema/loginSchema';
import { mmkvStorage } from '../../../storage/mmkvStorage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function LoginForm() {
  const { control, handleSubmit } = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const navigation = useNavigation<Nav>();

  const onSubmit = () => {
    mmkvStorage.setItem('token', 'true');
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <LoginTextInput
        name="email"
        control={control}
        label="Email"
        icon="mail-outline"
        placeholder="you@example.com"
        keyboardType="email-address"
      />
      <LoginTextInput
        control={control}
        name="password"
        label="Password"
        icon="lock-outline"
        placeholder="Enter your password"
        secure
      />
      <CustomButton
        text="Login"
        style={styles.btn}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    shadowColor: '#3D2B1F',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    marginBottom: 16
  },
  btn: { marginTop: 8, marginBottom: 4 },
});
