import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CorrectGuessesList = ({ guesses }) => {
  const renderGuessItem = ({ item }) => (
    <View style={styles.guessItem}>
      <Text style={styles.guessText}>
        {item.location.name}: {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Correct Guesses</Text>
      {guesses.length > 0 ? (
        <FlatList
          data={guesses}
          renderItem={renderGuessItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noGuessesText}>No correct guesses yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  guessItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  guessText: {
    fontSize: 16,
  },
  noGuessesText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default CorrectGuessesList;
