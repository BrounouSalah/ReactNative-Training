import {View, Text, Switch, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import Container from '../Container/index';
import Input from '../Input/index';
import CustomButton from '../CustomButton';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_IMAGE_URI} from '../../../constants/general';
import colors from '../../../assets/theme/colors';
import ImagePicker from '../ImagePicker';
const CreateContactComponent = ({
  onChangeText,
  onSubmit,
  form,
  setForm,
  error,
  loading,
  toggleValueChange,
  sheetRef,
  openSheet,
  closeSheet,
  onFileSelected,
  localFile,
}) => {
  return (
    <View style={styles.container}>
      <Container>
        <Image
          source={{
            uri: localFile?.path
              ? localFile.path
              : localFile || DEFAULT_IMAGE_URI,
          }}
          style={styles.imageView}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseText}>Choose image</Text>
        </TouchableOpacity>
        <Input
          onChangeText={value => {
            onChangeText({name: 'firstName', value});
          }}
          label="First name"
          placeholder="Enter First name"
          error={error?.first_name?.[0]}
          value={form.firstName || ''}
        />
        <Input
          onChangeText={value => {
            onChangeText({name: 'lastName', value});
          }}
          label="Last name"
          placeholder="Enter Last name"
          error={error?.last_name?.[0]}
          value={form.lastName || ''}
        />
        <Input
          icon={
            <CountryPicker
              withFilter
              withFlag
              countryCode={form.countryCode || undefined}
              withCountryNameButton={false}
              withCallingCode
              withCallingCodeButton
              withEmoji
              onSelect={v => {
                const phoneCode = v.callingCode[0];
                const cCode = v.cca2;
                setForm({...form, phoneCode, countryCode: cCode});
              }}
            />
          }
          style={{padding: 10}}
          iconPosition="left"
          onChangeText={value => {
            onChangeText({name: 'phoneNumber', value});
          }}
          label="Phone number"
          placeholder="Enter Phone"
          error={error?.phone_number?.[0]}
          value={form.phoneNumber || ''}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17}}>Add to favorite</Text>
          <Switch
            trackColor={{false: '#767577', true: colors.primary}}
            thumbColor={'#ffffff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite}
          />
        </View>
        <CustomButton
          loading={loading}
          disabled={loading}
          OnPress={onSubmit}
          primary
          title="Submit"
        />
      </Container>
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </View>
  );
};

export default CreateContactComponent;
