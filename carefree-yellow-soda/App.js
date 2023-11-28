import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const App = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setMilliseconds(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleLapReset = () => {
    if (running) {
      const lapTime = milliseconds - (laps.length > 0 ? laps[laps.length - 1].totalTime : 0);
      setLaps([...laps, { lapTime, totalTime: milliseconds }]);
    } else {
      setMilliseconds(0);
      setLaps([]);
    }
  };

  const formatTime = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(2);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(milliseconds)}</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
  onPress={handleLapReset}style={[styles.button, !running ? styles.resetButton : styles.lapButton]}
        >
  <Text style={styles.buttonText}>{running ? 'Lap' : 'Reset'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
  onPress={handleStartStop}style={[styles.button, running ? styles.stopButton : styles.startButton]}
        >
  <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lapsHeader}>
        <Text style={styles.lapsHeaderText}>Lap</Text>
        <Text style={styles.lapsHeaderText}>Lap Time</Text>
        <Text style={styles.lapsHeaderText}>Total Time</Text>
      </View>
      <ScrollView style={styles.lapsWrapper}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>{laps.length - index}</Text>
            <Text style={styles.lapText}>{formatTime(lap.lapTime)}</Text>
            <Text style={styles.lapText}>{formatTime(lap.totalTime)}</Text>
          </View>
        )).reverse()}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
    
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'aqua',
    marginVertical: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
  resetButton: {
    borderColor: 'green',
  },
  lapButton: {
    borderColor: 'green',
  },
  lapsWrapper: {
    width: '100%',
  },
  lapsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  lapsHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'yellow',
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'grey',
  },
  lapText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
