import React, {useContext, useState} from 'react';
import {Text, TouchableWithoutFeedback, View, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {t} from 'react-native-tailwindcss';
import Input from '../../components/TextInput/Input';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import {dismissKeyboard} from '../../common/Constants';
import {UserContext} from '../../ContextAPI/UserContext';
import {RouteProp, useRoute} from '@react-navigation/native';
import APIService from '../../network/APIService';

interface ProductDetailRouteParams {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
}

const OrderForm = () => {
  const route =
    useRoute<RouteProp<{params: ProductDetailRouteParams}, 'params'>>();
  const {product} = route.params;
  const context = useContext(UserContext);
  const [productName, setProductName] = useState(product?.title || '');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<{
    image: string | null;
    video: string | null;
    audio: string | null;
  }>({image: null, video: null, audio: null});

  const isDarkMode = context?.profile.themePreference === 'dark';

  const handleOrderSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const order = {
        product_id: product?.id,
        productName,
        description,
        quantity,
        // media,
      };
      const response = await APIService.submitOrder(order);
      if (response) {
        Alert.alert('Order submitted successfully');
        // Store order in AsyncStorage if needed
        const jsonValue = JSON.stringify(order);
        await AsyncStorage.setItem('order', jsonValue);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validationButton = () => {
    if (!productName) {
      Alert.alert('Validation Error', 'Please enter the product name');
    } else if (!description) {
      Alert.alert('Validation Error', 'Please enter the description');
    } else if (!quantity || isNaN(Number(quantity))) {
      Alert.alert('Validation Error', 'Please enter a valid quantity');
    } else {
      handleOrderSubmit();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      const uri = result.assets[0].uri;
      setMedia(prev => ({...prev, image: uri}));
      // Convert the image URI to a Blob
      const blob = await convertUriToBlob(uri);
      console.log('Image Blob:', blob);
    }
  };

  const convertUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibrary({mediaType: 'video'});
    if (result.assets) {
      setMedia(prev => ({...prev, video: result.assets[0].uri}));
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      if (result) {
        setMedia(prev => ({...prev, audio: result[0].uri}));
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[t.flex1, isDarkMode ? t.bgGray900 : t.bgWhite, t.p5]}>
        <View style={t.p5}>
          <Text
            allowFontScaling={false}
            style={[
              t.text3xl,
              t.fontBold,
              t.mb5,
              isDarkMode ? t.textWhite : t.textBlack,
            ]}>
            Order Form
          </Text>
          {error ? (
            <Text allowFontScaling={false} style={[t.textRed500, t.mb2]}>
              {error}
            </Text>
          ) : null}
          <Input
            value={productName}
            placeholder="Product Name"
            onChangeText={setProductName}
            isDarkMode={isDarkMode}
            editable={false}
          />
          <Input
            value={description}
            placeholder="Description"
            onChangeText={setDescription}
            isDarkMode={isDarkMode}
          />
          <Input
            value={quantity}
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={setQuantity}
            isDarkMode={isDarkMode}
          />
          <View style={t.mt5}>
            <Button btnTitle="Upload Image" onPress={pickImage} />
            {media.image && (
              <Image
                source={{uri: media.image}}
                style={[t.w24, t.h24, t.my3]}
              />
            )}
            <Button btnTitle="Upload Video" onPress={pickVideo} />
            {media.video && (
              <Text style={[t.mt3, isDarkMode ? t.textWhite : t.textBlack]}>
                {media.video}
              </Text>
            )}
            <Button btnTitle="Upload Audio" onPress={pickAudio} />
            {media.audio && (
              <Text style={[t.mt3, isDarkMode ? t.textWhite : t.textBlack]}>
                {media.audio}
              </Text>
            )}
          </View>
          <Button
            btnTitle="Submit Order"
            onPress={validationButton}
            containerStyle={[t.mt8]}
          />
        </View>
        <Text
          style={[
            t.textCenter,
            t.textGray600,
            t.mt8,
            isDarkMode ? t.textGray400 : t.textGray600,
          ]}>
          By placing an order, you agree to our terms and conditions.
        </Text>
        {loading && <Loader />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrderForm;
