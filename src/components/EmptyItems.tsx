import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  subTitle: string;
  icon: string;
};

type Nav = NativeStackNavigationProp<RootDrawerParamList>;

export default function EmptyItems({ title, subTitle, icon }: Props) {
  const navigation = useNavigation<Nav>();
  return (
    <View style={styles.empty}>
      <Animated.View
        entering={ZoomIn.duration(500).springify().damping(50)}
        style={styles.emptyIconWrapper}
      >
        <Icon name={icon} size={56} color="#000" />
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.delay(200).duration(500)}
        style={styles.emptyTitle}
      >
        {title}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(300).duration(500)}
        style={styles.emptyText}
      >
        {subTitle}
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        style={styles.emptyButtonWrapper}
      >
        <CustomButton text="Browse Books" onPress={() => navigation.goBack()} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  emptyIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
    marginTop: 24,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 22,
  },
  emptyButtonWrapper: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
});
