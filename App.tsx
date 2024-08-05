import React, {useContext} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import store from './src/toolkit/storeNew';
import ProductScreen from './src/screens/ProductScreen/ProductScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen/ProductDetailScreen';
import OrderForm from './src/screens/OrderForm/OrderForm';
import UserProfileScreen from './src/screens/UserProfile/UserProfileScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import {UserProvider, UserContext} from './src/ContextAPI/UserContext';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <MainNavigator />
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const MainNavigator = () => {
  const context = useContext(UserContext);
  const theme =
    context?.profile.themePreference === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.card, // Apply theme colors
          },
          headerTintColor: theme.colors.text,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Profile" component={UserProfileScreen} />
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="OrderForm" component={OrderForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
