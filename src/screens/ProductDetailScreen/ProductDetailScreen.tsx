import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  RouteProp,
  useRoute,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {t} from 'react-native-tailwindcss';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import Button from '../../components/Button/Button';
import Colors from '../../common/Colors';
import {UserContext} from '../../ContextAPI/UserContext';

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

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route =
    useRoute<RouteProp<{params: ProductDetailRouteParams}, 'params'>>();
  const {product} = route.params;

  const context = useContext(UserContext);
  const isDarkMode = context?.profile.themePreference === 'dark';

  return (
    <View style={[t.flex1, isDarkMode ? t.bgGray900 : t.bgWhite]}>
      <View
        style={[
          t.flexRow,
          t.itemsCenter,
          t.p3,
          t.justifyStart,
          {backgroundColor: isDarkMode ? Colors.primaryDark : Colors.primary},
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={t.p2}>
          <Text
            style={[t.textxl, t.my3, isDarkMode ? t.textWhite : t.textBlack]}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={[t.textLg, t.textWhite, t.fontBold, t.ml3]}>
          Product Detail
        </Text>
      </View>
      <View style={[t.flex1, t.p5]}>
        <Image
          source={{uri: product.image}}
          style={[t.wFull, {height: 300}, t.roundedLg, t.mb5]}
        />
        <Text
          style={[
            t.text2xl,
            isDarkMode ? t.textWhite : t.textPrimary,
            t.fontBold,
            t.my3,
          ]}>
          ${product.price}
        </Text>
        <AnimatedText
          style={[
            t.textXl,
            t.fontBold,
            t.my2,
            isDarkMode ? t.textWhite : t.textGray800,
          ]}
          description={product.title}
        />
        <AnimatedText
          style={[
            t.textBase,
            isDarkMode ? t.textGray400 : t.textGray600,
            t.mb5,
          ]}
          description={product.description}
        />
        <Button
          btnTitle="Place Order"
          onPress={() => navigation.navigate('OrderForm', {product: product})}
        />
      </View>
    </View>
  );
};

export default ProductDetailScreen;
