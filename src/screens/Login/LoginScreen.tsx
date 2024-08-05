import React, {useState, useEffect} from 'react';
import {Text, TouchableWithoutFeedback, View, Switch} from 'react-native';
import ImagePath from '../../common/ImagePath';
import Input from '../../components/TextInput/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Strings from '../../common/Strings';
import {dismissKeyboard} from '../../common/Constants';
import {setTheme, setToken, loadState} from '../../toolkit/authSlice';
import {RootState} from '../../store';
import APIService from '../../network/APIService';
import {t} from 'react-native-tailwindcss';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.auth.theme);
  const [darkMode, setDarkMode] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    const loadAuthState = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const theme = await AsyncStorage.getItem('theme');

      if (user) {
        dispatch(
          loadState({
            token: token,
            user: JSON.parse(user),
            theme: theme || 'light',
          }),
        );
      }
    };

    loadAuthState();
  }, [dispatch, navigation]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const user = {
        email: email,
        password: password,
      };
      dispatch(setToken({token: user, user: user}));
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonValue);
      navigation.replace('Products');
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const validationButton = () => {
    if (email === '' || email.length < 5) {
      alert('Please enter a valid email');
    } else if (password === '' || password.length < 5) {
      alert('Please enter a valid password');
    } else {
      handleLogin();
    }
  };

  const toggleDarkMode = async () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    dispatch(setTheme(newTheme));
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View
        style={[
          t.flex1,
          t.justifyCenter,
          t.p4,
          darkMode ? t.bgGray900 : t.bgWhite,
        ]}>
        <View style={[t.p4]}>
          <Text
            allowFontScaling={false}
            style={[
              t.text3xl,
              t.fontBold,
              t.mb5,
              darkMode ? t.textWhite : t.textBlack,
            ]}>
            {Strings.login}
          </Text>
          <Text
            allowFontScaling={false}
            style={[t.mb4, darkMode ? t.textGray400 : t.textGray700]}>
            {Strings.letsGetStarted}
          </Text>
          {error ? (
            <Text allowFontScaling={false} style={[t.textRed500, t.mb2]}>
              {error}
            </Text>
          ) : null}
          <Input
            icon={ImagePath.email}
            value={email}
            placeholder={Strings.email}
            onChangeText={setEmail}
            inputStyle={darkMode ? t.textWhite : t.textBlack}
            isDarkMode={darkMode}
          />
          <Input
            icon={ImagePath.lock}
            value={password}
            placeholder={Strings.password}
            secureTextEntry
            onChangeText={setPassword}
            inputStyle={darkMode ? t.textWhite : t.textBlack}
            isDarkMode={darkMode}
          />
          <Button
            btnTitle={Strings.login}
            onPress={validationButton}
            containerStyle={[t.mt8]}
          />
          <Text
            style={[t.mt4, darkMode ? t.textGray400 : t.textGray700]}
            allowFontScaling={false}>
            {Strings.doNothaveAccount}
            <Text
              allowFontScaling={false}
              style={[t.textBlue500]}
              onPress={() => navigation.navigate('SignUpScreen')}>
              {Strings.signup}
            </Text>
          </Text>
        </View>
        <View style={[t.flexRow, t.itemsCenter, t.justifyCenter, t.mt5]}>
          <Text style={darkMode ? t.textWhite : t.textBlack}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
        <Text
          style={[t.mt5, darkMode ? t.textGray400 : t.textGray700]}
          allowFontScaling={false}>
          {Strings.privacyPolicyText}
        </Text>
        {loading && <Loader />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
