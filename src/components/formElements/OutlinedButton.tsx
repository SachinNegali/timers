import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ButtonProps {
  label: string;
  onPress: () => void;
  flex?: number;
  contained?: boolean;
}
const OutlinedButton = ({
  label,
  onPress,
  flex,
  contained = false,
}: ButtonProps) => {
  return (
    <Pressable style={[styles.btn, {flex: flex ?? 1}]} onPress={onPress}>
      <Text style={styles.btnLable}>{label}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  btn: {
    // backgroundColor: '#0a8270',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  btnLable: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
