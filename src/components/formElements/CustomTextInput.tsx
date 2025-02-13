import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

interface InputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (val: string) => void;
  keyboardType?: 'default' | 'number-pad';
}

const CustomTextInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
}: InputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor={'#c1c1c1'}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
});
