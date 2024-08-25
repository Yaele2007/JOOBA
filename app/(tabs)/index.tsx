import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { I18nextProvider } from 'react-i18next';  // Import I18nextProvider
import i18n from '@/localization/i18n';  // Import your i18n configuration
import LocationPicker from '@/components/LocationPicker';
import TimePicker from '@/components/TimePicker';
import GuessButton from '@/components/GuessButton';
import CorrectGuessesList from '@/components/CorrectGuessesList';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type Location = {
  id: string;
  name: string;
  timezone: string | null;  // Ensure timezone is part of the type
};

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [guessedTime, setGuessedTime] = useState<{ hour: string; minute: string }>({ hour: '', minute: '' });
  const [correctGuesses, setCorrectGuesses] = useState<Array<{ location: Location | null; time: string }>>([]);

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleTimeChange = (hour: string, minute: string) => {
    setGuessedTime({ hour, minute });
  };

  const handleGuessSubmit = async () => {
    if (!selectedLocation || !selectedLocation.timezone) {
      alert("Please select a valid location.");
      return;
    }
  
    try {
      // Fetch the current time for the selected location
      const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedLocation.timezone}`);
      const data = await response.json();
  
      // Extract the time from the API response
      const currentTime = new Date(data.datetime);
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
  
      // Compare with guessed time
      const guessedHour = parseInt(guessedTime.hour, 10);
      const guessedMinute = parseInt(guessedTime.minute, 10);
  
      const isCorrect =
        guessedHour === currentHour && guessedMinute === currentMinute;
  
      if (isCorrect) {
        alert("Correct guess!");
        // Record the guess
        const correctTime = `${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
        setCorrectGuesses([...correctGuesses, { location: selectedLocation, time: correctTime }]);
      } else {
        alert(`Incorrect. The correct time is ${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}.`);
      }
  
    } catch (error) {
      console.error("Error fetching time:", error);
      alert("There was an error fetching the current time. Please try again.");
    }
  };

  return (
    <I18nextProvider i18n={i18n}> {/* Wrap your component in I18nextProvider */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Guess the Time!</Text>
          
          <LocationPicker onChange={handleLocationChange} />
          
          <TimePicker onChange={handleTimeChange} />
          
          <GuessButton onPress={handleGuessSubmit} />
          
          <CorrectGuessesList guesses={correctGuesses} />
          
          <LanguageSwitcher /> {/* This will now work because i18n is provided */}
        </View>
      </ScrollView>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
