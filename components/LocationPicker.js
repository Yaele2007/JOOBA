import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const locationTimezoneMap = {
  'Tel Aviv, Israel': 'Asia/Jerusalem',
  'New York, USA': 'America/New_York',
  'London, UK': 'Europe/London',
  'Paris, France': 'Europe/Paris',
  'Tokyo, Japan': 'Asia/Tokyo',
  // Add more mappings as needed
};

const LocationPicker = ({ onChange }) => {
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (search.length > 2) {
      fetchLocations(search);
    } else {
      setLocations([]);
    }
  }, [search]);

  const fetchLocations = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.geonames.org/searchJSON?formatted=true&q=${query}&maxRows=10&lang=en&username=yaele`
      );
      const data = await response.json();
      
      if (data && data.geonames) {
        const locationResults = data.geonames.map((item) => {
          const name = `${item.name}, ${item.countryName}`;
          return {
            id: item.geonameId.toString(),
            name,
            timezone: locationTimezoneMap[name] || null,  // Map the location to a timezone
          };
        });
        setLocations(locationResults);
      } else {
        console.error("No geonames data found:", data);
        setLocations([]); // Clear locations if no data is found
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]); // Clear locations on error
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (location) => {
    if (location.timezone) {
      setSelectedLocation(location);
      onChange(location);  // Notify the parent component of the selected location
    } else {
      alert('This location does not have a mapped timezone. Please choose another.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location"
        value={search}
        onChangeText={setSearch}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              item.id === selectedLocation?.id && styles.selectedItem,
            ]}
            onPress={() => handleSelectLocation(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  itemText: {
    fontSize: 16,
  },
});

export default LocationPicker;
