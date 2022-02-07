import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Container from '../Container';
import styles from './styles';
import ImageComponent from './ImageComponent';
import colors from '../../../assets/theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../CustomButton';
import {CREATE_CONTACT} from '../../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {navigate} from '../../../navigations/SideMenu/RootNavigation';
import {DEFAULT_IMAGE_URI} from '../../../constants/general';
import ImagePicker from '../ImagePicker';
const ContactDetailsComponent = ({
  contact,
  localFile,
  openSheet,
  sheetRef,
  onFileSelected,
  uploadSucceeded,
}) => {
  const {
    contact_picture,
    first_name,
    last_name,
    updatingImage,
    country_code,
    phone_number,
  } = contact;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {(contact_picture || uploadSucceeded) && (
          <ImageComponent src={contact_picture || localFile?.path} />
        )}

        {!contact_picture && !uploadSucceeded && (
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <Image
              source={{
                uri: localFile?.path
                  ? localFile.path
                  : localFile || DEFAULT_IMAGE_URI,
              }}
              style={styles.imageView}
            />
            <TouchableOpacity
              onPress={() => {
                openSheet();
              }}>
              <Text style={{color: colors.primary}}>
                {updatingImage ? 'updating...' : 'Add picture'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.names}> {first_name + ' ' + last_name} </Text>
        </View>
        <View style={styles.hrLine} />

        <View style={styles.topCallOptions}>
          <TouchableOpacity style={styles.topCallOption}>
            <Ionicons name="call-outline" color={colors.primary} size={27} />
            <Text style={styles.middleText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <MaterialCommunityIcons
              name="message-text"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <MaterialCommunityIcons
              name="video"
              color={colors.primary}
              size={27}
            />
            <Text style={styles.middleText}>Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middleCallOptions}>
          <Ionicons name="call-outline" color={colors.grey} size={27} />
          <View style={styles.phoneMobile}>
            <Text>{phone_number}</Text>
            <Text>Mobile</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="video"
              color={colors.primary}
              size={27}
            />
            <MaterialCommunityIcons
              name="message-text"
              color={colors.primary}
              size={27}
              style={[styles.msgIcon]}
            />
          </View>
        </View>
        <View style={{alignSelf: 'flex-end', marginRight: 20, width: 200}}>
          <CustomButton
            primary
            title="Edit Contact"
            OnPress={() => {
              navigate(CREATE_CONTACT, {contact, editing: true});
            }}
          />
        </View>
      </View>
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </ScrollView>
  );
};

export default ContactDetailsComponent;
