import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  icon: string;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address';
};

export default function LoginTextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  secure = false,
  keyboardType = 'default',
}: Props<T>) {
  const [hidden, setHidden] = useState(secure);
  const [focused, setFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <Text style={styles.inputTitle}>{label}</Text>
          <View
            style={[
              styles.inputRow,
              focused && styles.inputRowFocused,
              !!error && styles.inputRowError,
            ]}
          >
            <Icon name={icon} size={20} color={focused ? '#C8863A' : '#A89F94'} />
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor="#C4BAB0"
              style={styles.input}
              secureTextEntry={hidden}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={keyboardType}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
              }}
            />
            {secure && (
              <Pressable onPress={() => setHidden(h => !h)} hitSlop={8}>
                <Icon
                  name={hidden ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={focused ? '#C8863A' : '#A89F94'}
                />
              </Pressable>
            )}
          </View>
          {!!error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 18 },
  inputTitle: {
    fontSize: 13,
    fontFamily: 'Cairo-SemiBold',
    color: '#1A1A2E',
    marginBottom: 8,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#EDE8E0',
    paddingHorizontal: 16,
    height: 56,
    gap: 10,
    shadowColor: '#3D2B1F',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputRowFocused: {
    borderColor: '#C8863A',
    shadowColor: '#C8863A',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  inputRowError: { borderColor: '#dc2626' },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Cairo-Regular',
    color: '#1A1A2E',
    paddingVertical: 0,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#dc2626',
    marginTop: 5,
    marginLeft: 4,
  },
});
