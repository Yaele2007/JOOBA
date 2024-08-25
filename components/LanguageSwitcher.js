import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchToEnglish = () => {
    i18n.changeLanguage('en');
  };

  const switchToHebrew = () => {
    i18n.changeLanguage('he');
  };

  return (
    <View style={styles.container}>
      <Button title="English" onPress={switchToEnglish} />
      <Button title="עברית" onPress={switchToHebrew} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default LanguageSwitcher;
