import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/formElements/CustomTextInput';
import PrimaryButton from '../components/formElements/PrimaryButton';
import OptionSelect from '../components/formElements/OptionSelect';
import {saveData} from '../helpers/storage';
import {useNavigation} from '@react-navigation/native';
import {TimerListNavigationProp} from '../types/navProps';

const categoryOptions = ['Workout', 'Study', 'Break'];

const AddTimer = () => {
  const navigation = useNavigation<TimerListNavigationProp>();
  const [timerData, setTimerData] = useState({
    name: '',
    duration: '',
    category: '',
    notifyHalfway: false,
  });
  const [loading, setLoading] = useState(false);

  const validateValues = () => {
    const {name, duration, category} = timerData;
    // if(!name || !duration || !category){
    //     ToastAndroid.show('All feilds are required', ToastAndroid.SHORT)
    // }
    if (!name) {
      ToastAndroid.show('Please add a name', ToastAndroid.SHORT);
      return false;
    }
    if (!duration) {
      ToastAndroid.show('Please add duration', ToastAndroid.SHORT);
      return false;
    }
    if (!category) {
      ToastAndroid.show('Please select a Category', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateValues()) {
      setLoading(true);
      await saveData(timerData)
        .then(() => {
          ToastAndroid.show('Timer added successfully', ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch(err => {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.formWrap}>
        <CustomTextInput
          label="Name"
          value={timerData.name}
          placeholder="e.g: Workout Timer"
          onChangeText={val => setTimerData({...timerData, name: val})}
        />
        <CustomTextInput
          label="Duration"
          value={timerData.duration}
          placeholder={'Duration in seconds'}
          onChangeText={val => setTimerData({...timerData, duration: val})}
          keyboardType="number-pad"
        />
        <OptionSelect
          value={timerData.category}
          options={categoryOptions}
          label="Select Category"
          onPress={val => setTimerData({...timerData, category: val})}
        />
        <Pressable
          style={{flexDirection: 'row', gap: 6}}
          onPress={() =>
            setTimerData({
              ...timerData,
              notifyHalfway: !timerData.notifyHalfway,
            })
          }>
          <View
            style={[
              styles.check,
              timerData.notifyHalfway && styles.checkActive,
            ]}
          />
          <Text style={styles.label}>{'Notify Halfway'}</Text>
        </Pressable>
        <PrimaryButton
          label={'Add Timer'}
          onPress={handleSubmit}
          contained
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddTimer;

const styles = StyleSheet.create({
  formWrap: {
    gap: 16,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  check: {
    height: 12,
    width: 12,
    borderRadius: 2,
    // backgroundColor: '#0a8270',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  checkActive: {
    backgroundColor: '#0a8270',
  },
});
