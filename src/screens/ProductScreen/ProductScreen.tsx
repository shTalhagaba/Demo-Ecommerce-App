import React, {useContext} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {t} from 'react-native-tailwindcss';
import {UserContext} from '../../ContextAPI/UserContext'; // Import context

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

const ProductScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {data, isLoading, error} = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  const context = useContext(UserContext);
  const isDarkMode = context?.profile.themePreference === 'dark';

  if (isLoading)
    return (
      <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
        <ActivityIndicator size={'large'} />
        <Text style={[t.mt2, t.textLg, isDarkMode ? t.textWhite : t.textBlack]}>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
        <Text style={[t.textRed500]}>Error fetching products</Text>
      </View>
    );

  return (
    <View style={[t.flex1, isDarkMode ? t.bgBlack : t.bgWhite]}>
      <View style={[t.flexRow, t.itemsCenter, t.p6, isDarkMode ? t.bgGray800 : t.bgPrimary, t.shadow]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={[t.p2, t.absolute, t.top1, t.right1]}>
                <Text
              numberOfLines={1}
              style={[t.textBase, t.fontBold, t.mt2, isDarkMode ? t.textGray400 : t.textGray800]}>
              {"Profile"}
            </Text>
        </TouchableOpacity>

      </View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              t.m2,
              t.p4,
              isDarkMode ? t.bgGray900 : t.bgWhite,
              t.shadow,
              t.roundedLg,
              t.border,
              isDarkMode ? t.borderGray700 : t.borderGray300,
              {width:'46%'}
            ]}
            onPress={() =>
              navigation.navigate('ProductDetail', {product: item})
            }>
            <View style={[t.itemsCenter]}>
              <Text style={[t.text2xl, isDarkMode ? t.textYellow500 : t.textPrimary]}>${item.price}</Text>
            </View>
            <Image
              source={{uri: item.image}}
              style={[t.wFull, t.h40, t.roundedLg, t.mt2]}
            />
            <Text
              numberOfLines={1}
              style={[t.textBase, t.fontBold, t.mt2, isDarkMode ? t.textGray400 : t.textGray800]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={[t.p2]}
      />
    </View>
  );
};

export default ProductScreen;
