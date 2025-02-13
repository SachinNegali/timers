import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  AddTimer: undefined;
};

export type TimerListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddTimer'
>;
