import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../src/screens/Login/LoginScreen';

test('renders login screen correctly', () => {
  const {getByPlaceholderText, getByText} = render(
    <LoginScreen navigation={{replace: jest.fn()}} />,
  );
  expect(getByPlaceholderText('Email')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getByText('Login')).toBeTruthy();
});

test('validates email and password', () => {
  const {getByPlaceholderText, getByText} = render(
    <LoginScreen navigation={{replace: jest.fn()}} />,
  );
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, '12345');
  fireEvent.press(loginButton);

  expect(getByText('Please enter a valid email')).toBeTruthy();
});
