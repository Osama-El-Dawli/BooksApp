import React from 'react';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';

export default function BookViewer() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="My pdf" />
      <Pdf source={{ uri: 'bundle-assets://book.pdf' }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
