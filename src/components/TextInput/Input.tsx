import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface InputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: any;
  isDarkMode: boolean;
  editable: any;
}

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  icon,
  isDarkMode,
  editable,
}) => (
  <View style={styles.inputContainer}>
    {icon && <Text style={styles.icon}>{icon}</Text>}
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.input, {color: isDarkMode ? '#fff' : '#000'}]}
      placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
      editable={editable}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  icon: {
    marginRight: 10,
  },
});

export default Input;
