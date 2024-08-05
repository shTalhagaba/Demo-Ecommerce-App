import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface RouteParams {
  description?: string;
  style?: any;
}

const AnimatedText = (props: RouteParams) => {
  const {description, style} = props;
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });

    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    <Animated.Text style={[style, animatedStyle]}>{description}</Animated.Text>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    color: '#000',
  },
});

export default AnimatedText;
