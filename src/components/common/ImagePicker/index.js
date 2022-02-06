import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../assets/theme/colors';
import ImagePickerCropper from 'react-native-image-crop-picker';

const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <Entypo color={colors.grey} name="camera" size={21} />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            onFileSelected(image);
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    {
      name: 'Choose from galery',
      icon: (
        <MaterialIcons color={colors.grey} name="photo-library" size={21} />
      ),
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            onFileSelected(image);
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={150}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <View style={styles.optionWrapper}>
        {options.map(({name, icon, onPress}) => (
          <TouchableOpacity
            onPress={onPress}
            style={styles.pickerOptions}
            key={name}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default ImagePicker;
