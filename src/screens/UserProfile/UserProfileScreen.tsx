import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {UserContext} from '../../ContextAPI/UserContext';

const UserProfileScreen = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const {profile, updateProfile} = context;

  const toggleTheme = () => {
    const newTheme = profile.themePreference === 'light' ? 'dark' : 'light';
    updateProfile({...profile, themePreference: newTheme});
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {color: profile.themePreference === 'light' ? 'black' : 'white'},
        ]}>
        User Profile
      </Text>
      <View style={styles.profileContainer}>
        <Text
          style={[
            styles.label,
            {color: profile.themePreference === 'light' ? 'black' : 'white'},
          ]}>
          Current Theme:
        </Text>
        <Text
          style={[
            styles.value,
            {color: profile.themePreference === 'light' ? 'black' : 'white'},
          ]}>
          {profile.themePreference}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleTheme}
        accessible={true}
        accessibilityLabel="Toggle Theme">
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
    // <View>
    //   <Text>Theme: {profile.themePreference}</Text>
    //   <Button title="Toggle Theme" onPress={toggleTheme} />
    // </View>
  );
};

export default UserProfileScreen;
