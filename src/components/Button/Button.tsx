import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../common/Colors';

interface ButtonProps {
  btnTitle: string;
  onPress: () => void;
  containerStyle?: object;
}

const Button: React.FC<ButtonProps> = ({btnTitle, onPress, containerStyle}) => (
  <TouchableOpacity style={[styles.button, containerStyle]} onPress={onPress}>
    <Text style={styles.buttonText}>{btnTitle}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 20,
    backgroundColor: Colors.primaryYellow,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
