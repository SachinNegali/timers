import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface CardProps {
  name: string;
  category: string;
  completedAt: Date;
}
const HistoryCard = ({name, category, completedAt}: CardProps) => {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.statusCard}>
          <Text style={styles.status}>{category}</Text>
        </View>
      </View>
      <Text style={{fontSize: 10, fontWeight: 'bold'}}>
        {formatDate(completedAt)}
      </Text>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 6,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 5,
    margin: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCard: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
