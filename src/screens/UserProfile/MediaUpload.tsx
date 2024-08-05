import React, {useState} from 'react';
import {View, Button, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const MediaUpload = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 100, height: 100}} />
      )}
    </View>
  );
};

export default MediaUpload;
