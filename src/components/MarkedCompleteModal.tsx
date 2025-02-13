import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrimaryButton from './formElements/PrimaryButton';

interface ModalProps {
  show: boolean;
  close: () => void;
  name: string;
}
const MarkedCompleteModal = ({show, close, name}: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        // setModalVisible(!modalVisible);
        close;
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Timer marked Complete!</Text>
          <Text style={styles.title}>name: {name}</Text>
          <View style={styles.row}>
            <PrimaryButton label="Ok" onPress={close} flex={0.3} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MarkedCompleteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  desc: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
