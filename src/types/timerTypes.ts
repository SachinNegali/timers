interface TimerProps {
  name: string;
  duration: string;
  category: string;
  isRunning?: boolean;
  timeLeft?: number;
  completedAt?: Date;
  notifyHalfway?: boolean;
}

interface TimerCategory {
  category: string;
  items: TimerProps[];
}
