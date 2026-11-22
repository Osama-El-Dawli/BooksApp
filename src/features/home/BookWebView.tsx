import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';
import { RootStackParamList } from '../../navigation/types';
import { View } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function BookWebView() {
  const route = useRoute<RouteProp<RootStackParamList, 'bookWebView'>>();
  const navigation = useNavigation<Nav>();
  const { previewLink, title } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        showBack
        onBack={() => {
          navigation.pop();
        }}
        title={title}
      />
      <WebView style={{ flex: 1 }} source={{ uri: previewLink }} />
    </SafeAreaView>
  );
}
