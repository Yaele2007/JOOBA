import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const TimePicker = ({ onChange }) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const handleHourChange = (text) => {
    const sanitizedHour = text.replace(/[^0-9]/g, '');
    if (sanitizedHour === '' || (Number(sanitizedHour) >= 0 && Number(sanitizedHour) <= 23)) {
      setHour(sanitizedHour);
      onChange(sanitizedHour, minute);
    }
  };

  const handleMinuteChange = (text) => {
    const sanitizedMinute = text.replace(/[^0-9]/g, '');
    if (sanitizedMinute === '' || (Number(sanitizedMinute) >= 0 && Number(sanitizedMinute) <= 59)) {
      setMinute(sanitizedMinute);
      onChange(hour, sanitizedMinute);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hour:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH"
        value={hour}
        keyboardType="numeric"
        maxLength={2}
        onChangeText={handleHourChange}
      />
      <Text style={styles.label}>Minute:</Text>
      <TextInput
        style={styles.input}
        placeholder="MM"
        value={minute}
        keyboardType="numeric"
        maxLength={2}
        onChangeText={handleMinuteChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    width: 50,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 20,
    fontSize: 16,
  },
});

export default TimePicker;
