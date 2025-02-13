import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getData} from '../helpers/storage';
import Collapsible from '../components/Collapsible';
import PrimaryButton from '../components/formElements/PrimaryButton';
import MarkedCompleteModal from '../components/MarkedCompleteModal';
import {TimerListNavigationProp} from '../types/navProps';

const Home = () => {
  const navigation = useNavigation<TimerListNavigationProp>();
  const [timers, setTimers] = useState<TimerCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMarkedComplete, setShowMarkedComplete] = useState<boolean>(false);
  const [completedTimer, setCompletedTimer] = useState<string>('');

  const processData = (data: TimerProps[]) => {
    const groupedData: {[key: string]: TimerProps[]} = {};
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const {category} = item;

      if (!groupedData[category]) {
        groupedData[category] = [];
      }

      groupedData[category].push(item);
    }
    const result = Object.keys(groupedData).map(category => ({
      category,
      items: groupedData[category],
    }));
    return result;
  };

  const getAllTimers = async () => {
    console.log('insidee......?');
    setLoading(true);
    await getData()
      .then((res: TimerProps[]) => {
        const processedData = processData(res);
        setTimers([...processedData]);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };
  const focused = useIsFocused();
  useEffect(() => {
    getAllTimers();
  }, [focused]);

  useEffect(() => {
    console.log('Updated timers:', timers);
  }, [timers]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList<TimerCategory>
        data={timers}
        contentContainerStyle={{gap: 16, padding: 16}}
        keyExtractor={item => item.category}
        renderItem={({item}) => {
          return (
            <Collapsible
              label={item.category}
              items={item.items}
              key={item.category}
              timerComplete={(name: string) => {
                setCompletedTimer(name);
                setShowMarkedComplete(true);
              }}
            />
          );
        }}
        refreshControl={
          <RefreshControl onRefresh={getAllTimers} refreshing={loading} />
        }
        ListHeaderComponent={<Text style={styles.title}>Active Timers</Text>}
      />
      <View style={styles.floatBtn}>
        <PrimaryButton
          label="Add Timer"
          onPress={() => navigation.navigate('AddTimer')}
          contained
        />
      </View>

      <MarkedCompleteModal
        show={showMarkedComplete}
        name={completedTimer}
        close={() => {
          setShowMarkedComplete(false);
          getAllTimers();
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 6,
    color: '#0a8270',
  },
  floatBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 10,
  },
});
