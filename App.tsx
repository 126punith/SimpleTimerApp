import {Text, SafeAreaView, StyleSheet, Button, View} from 'react-native';
import {useState, useEffect, useRef} from 'react';
// You can import supported modules from npm
const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};
// or any files within the Snack
const initialCount = 60 * 60;

const twoDigits = (num: number) => String(num).padStart(2, '0');

const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef();

  // Remember the last callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //set up the interval
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default function App() {
  const [secondsRemaining, SetSecondsRemaining] = useState<number>(initialCount);
  const [status, setStatus] = useState<string>(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;

  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;

  const minutesToDisplay = minutesRemaining % 60;

  const hoursToDispaly = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };

  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };

  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    SetSecondsRemaining(initialCount);
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        SetSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null,
  );
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Button title="start Timer" onPress={handleStart} />
        <Button title="stop Timer" onPress={handleStop} />
        <Button title="reset Timer" onPress={handleReset} />
      </View>
      <Text style={styles.paragraph}>
        {`${twoDigits(hoursToDispaly)} : ${twoDigits(
          minutesToDisplay,
        )} : ${twoDigits(secondsToDisplay)}`}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
