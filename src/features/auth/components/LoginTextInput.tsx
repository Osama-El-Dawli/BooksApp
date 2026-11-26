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
            <Icon name={icon} size={20} color="#6b7280" />
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor="#9ca3af"
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
                  color="#6b7280"
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
  wrapper: { marginBottom: 16 },
  inputTitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Medium',
    color: '#111',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    height: 54,
    gap: 10,
  },
  inputRowFocused: { borderColor: '#353535' },
  inputRowError: { borderColor: '#dc2626' },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Cairo-Regular',
    color: '#111',
    paddingVertical: 0,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#dc2626',
    marginTop: 4,
    marginLeft: 4,
  },
});
