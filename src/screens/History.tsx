import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCompletedList} from '../helpers/storage';
import HistoryCard from '../components/HistoryCard';
import {useIsFocused} from '@react-navigation/native';

const History = () => {
  const [completedTimers, setCompletedTimers] = useState<TimerProps[]>([]);
  const [loading, setLoading] = useState(false);
  const getCompletedData = async () => {
    setLoading(true);
    await getCompletedList()
      .then(res => setCompletedTimers(res))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getCompletedData();
  }, [isFocused]);

  return (
    <FlatList
      data={completedTimers}
      contentContainerStyle={{padding: 16}}
      renderItem={({item}) => (
        <HistoryCard
          name={item.name}
          category={item?.category}
          completedAt={item.completedAt || new Date()}
        />
      )}
      refreshControl={
        <RefreshControl onRefresh={getCompletedData} refreshing={loading} />
      }
      ListHeaderComponent={<Text style={styles.title}>History</Text>}
    />
  );
};

export default History;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 6,
    color: '#0a8270',
  },
});
