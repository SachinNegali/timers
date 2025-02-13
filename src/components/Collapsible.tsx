import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TimerCard from './TimerCard';
import PrimaryButton from './formElements/PrimaryButton';
import {updateData} from '../helpers/storage';

interface CollapsibleProps {
  label: string;
  items?: any;
  timerComplete: (name: string) => void;
}
const Collapsible = ({label, items, timerComplete}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [allRunning, setAllRunning] = useState(false);
  const [timers, setTimers] = useState(
    items.map((item: TimerProps) => ({
      ...item,
      isRunning: false,
      timeLeft: parseInt(item.duration, 10),
    })),
  );

  useEffect(() => {
    setTimers(
      items.map((item: TimerProps) => ({
        ...item,
        isRunning: false,
        timeLeft: parseInt(item.duration, 10),
      })),
    );
  }, [items]);

  const markItemAsComplete = async (timer: TimerProps) => {
    console.log('do you log just once.....');
    const item = {
      ...timer,
      completedAt: new Date(),
    };
    await updateData(item)
      .then(async () => {
        timerComplete(timer.name);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const intervals = timers.map((timer: TimerProps, index: number) => {
      if (timer.isRunning) {
        return setInterval(() => {
          setTimers((prevTimers: TimerProps[]) => {
            const updatedTimers = [...prevTimers];
            if (
              updatedTimers[index].timeLeft &&
              updatedTimers[index].timeLeft > 0
            ) {
              updatedTimers[index].timeLeft -= 1;
            } else {
              updatedTimers[index].isRunning = false;
              markItemAsComplete(timer);
            }

            return updatedTimers;
          });
        }, 1000);
      }
      return null;
    });

    return () => {
      intervals.forEach((interval: any) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [timers]);

  const handleStartPauseTimer = (index: number) => {
    setTimers((prevTimers: TimerProps[]) =>
      prevTimers.map((timer, idx) =>
        idx === index ? {...timer, isRunning: !timer.isRunning} : timer,
      ),
    );
  };

  const handleResetTimer = (index: number) => {
    setTimers((prevTimers: TimerProps[]) =>
      prevTimers.map((timer, idx) =>
        idx === index
          ? {...timer, timeLeft: timer.duration, isRunning: false}
          : timer,
      ),
    );
  };

  const handleStartAll = () => {
    setTimers((prevTimers: TimerProps[]) =>
      prevTimers.map(timer => ({
        ...timer,
        isRunning: !timer.isRunning,
      })),
    );
    setAllRunning(!allRunning);
  };

  const handleResetAll = () => {
    setTimers((prevTimers: TimerProps[]) =>
      prevTimers.map(timer => ({
        ...timer,
        timeLeft: timer.duration,
        isRunning: false,
      })),
    );
  };

  return (
    <View style={[styles.card, isOpen && styles.cardOpen]}>
      <Pressable style={styles.row} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.title}>{label}</Text>
        <Text>v</Text>
      </Pressable>
      {isOpen && (
        <>
          <View>
            {timers.map((timer: TimerProps, index: number) => (
              <TimerCard
                timer={timer}
                handleResetTimer={() => handleResetTimer(index)}
                handleStartPauseTimer={() => handleStartPauseTimer(index)}
                key={index}
              />
            ))}
          </View>
          <View style={styles.btnRow}>
            <PrimaryButton
              label="Reset All"
              onPress={handleResetAll}
              flex={0.3}
            />
            <PrimaryButton
              label={allRunning ? 'Pause All' : 'Start All'}
              onPress={handleStartAll}
              flex={0.7}
              contained
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    borderBottomWidth: 1,
    // borderWidth: 1,
    // borderRadius: 6,
    borderColor: '#c1c1c1',
    // padding: 6,
    paddingBottom: 10,
    // marginTop: 16,
  },
  cardOpen: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#c1c1c1',
    marginTop: 10,
  },
});
