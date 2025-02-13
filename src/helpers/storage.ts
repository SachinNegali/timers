import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (item: TimerProps) => {
  try {
    const existingData = await AsyncStorage.getItem('items');
    let items = [];
    if (existingData) {
      items = JSON.parse(existingData);
    }
    items.unshift(item);
    await AsyncStorage.setItem('items', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem('items');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};

export const updateData = async (item: TimerProps) => {
  try {
    const existingData = await AsyncStorage.getItem('items');
    let items = [];
    if (existingData) {
      items = JSON.parse(existingData);
      items = items.filter((dataObj: TimerProps) => {
        return (
          dataObj.name !== item.name ||
          dataObj.category !== item.category ||
          dataObj.duration !== item.duration
        );
      });
    }
    await AsyncStorage.setItem('items', JSON.stringify(items));
    await addDataToCompletedList(item);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const addDataToCompletedList = async (item: TimerProps) => {
  try {
    const existingData = await AsyncStorage.getItem('completed');
    let items = [];
    if (existingData) {
      items = JSON.parse(existingData);
    }
    items.unshift(item);
    await AsyncStorage.setItem('completed', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getCompletedList = async () => {
  try {
    const data = await AsyncStorage.getItem('completed');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};
