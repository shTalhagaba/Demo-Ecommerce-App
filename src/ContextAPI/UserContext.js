// UserContext.js
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [profile, setProfile] = useState({
    themePreference: 'light', // default theme
  });

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem('userProfile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    };

    loadProfile();
  }, []);

  const updateProfile = async newProfile => {
    setProfile(newProfile);
    await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  return (
    <UserContext.Provider value={{profile, updateProfile}}>
      {children}
    </UserContext.Provider>
  );
};
