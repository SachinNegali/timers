import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

interface ButtonProps {
  label: string;
  onPress: () => void;
  flex?: number;
  contained?: boolean;
  loading?: boolean;
}
const PrimaryButton = ({
  label,
  onPress,
  flex,
  contained = false,
  loading = false,
}: ButtonProps) => {
  return (
    <Pressable
      style={[
        styles.btn,
        contained && styles.contained,
        flex ? {flex: flex} : {},
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={contained ? '#fff' : '#0a8270'}
        />
      ) : (
        <Text style={[styles.btnLable, contained && styles.labelContained]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#0a8270',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  contained: {
    backgroundColor: '#0a8270',
    // borderColor: '#fff',
  },
  btnLable: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#0a8270',
    fontSize: 14,
  },
  labelContained: {
    color: '#fff',
  },
});
