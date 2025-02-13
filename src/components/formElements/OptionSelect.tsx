import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

interface OptionProps {
  label: string;
  options: string[];
  value: string;
  onPress: (val: string) => void;
}
const OptionSelect = ({label, options, value, onPress}: OptionProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options?.map(option => {
          const isActive = value == option;
          return (
            <Pressable
              style={[styles.chip, isActive && styles.chipActive]}
              key={option}
              onPress={() => onPress(option)}>
              <Text style={[styles.chipTxt, isActive && styles.chipTxtActive]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default OptionSelect;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: '#0a827066',
    borderWidth: 1,
    borderColor: '#0a8270',
  },
  chipActive: {
    backgroundColor: '#0a8270',
  },
  chipTxt: {
    fontSize: 14,
    color: '#0a8270',
  },
  chipTxtActive: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
