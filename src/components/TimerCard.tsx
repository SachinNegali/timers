import {Button, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import PrimaryButton from './formElements/PrimaryButton';

interface CardProps {
  timer: TimerProps;
  handleResetTimer: () => void;
  handleStartPauseTimer: () => void;
}

const TimerCard = ({
  timer,
  handleResetTimer,
  handleStartPauseTimer,
}: CardProps) => {
  const {name, isRunning, timeLeft, duration, notifyHalfway} = timer;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    notifyHalfway &&
      parseInt(duration) / seconds == 2 &&
      ToastAndroid.show(
        `Halfway through the timer ${name}`,
        ToastAndroid.SHORT,
      );
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  {
    name == 'Elevation' && console.log(timeLeft, duration);
  }

  return (
    <View style={styles.card}>
      <View style={styles.progressbg}>
        <View
          style={[
            styles.progressbar,
            {
              flex: timeLeft
                ? (parseInt(duration) - timeLeft) / parseInt(duration)
                : 0,
            },
          ]}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{name}</Text>
        {timeLeft && timeLeft < parseInt(duration) && (
          <View style={styles.statusCard}>
            <Text style={styles.status}>
              {isRunning
                ? 'Started'
                : timeLeft && timeLeft > 0
                ? 'Paused'
                : 'Completed'}
            </Text>
          </View>
        )}
      </View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        {formatTime(timeLeft || 0)}
      </Text>
      <View style={styles.btnRow}>
        <PrimaryButton label="Reset" onPress={handleResetTimer} flex={0.3} />
        <PrimaryButton
          label={isRunning ? 'Pause' : 'Start'}
          onPress={handleStartPauseTimer}
          flex={0.7}
          contained
        />
      </View>
    </View>
  );
};

export default TimerCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 6,
    padding: 10,
    paddingTop: 0,
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
  progressbg: {
    flex: 1,
    backgroundColor: '#c1c1c1',
    // borderRadius: 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 4,
    flexDirection: 'row',
    marginBottom: 4,
  },
  progressbar: {
    backgroundColor: '#0a8270',
    borderBottomLeftRadius: 4,
    // borderBottomRightRadius: 4,
    borderTopRightRadius: 0,
  },
});
