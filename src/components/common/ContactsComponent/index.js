import {View, Text} from 'react-native';
import React from 'react';
import AppModal from '../AppModal';
import CustomButton from '../CustomButton/index';
const ContactsComponent = ({modalVisible, setModalVisible}) => {
  return (
    <View>
      <AppModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <CustomButton
        OnPress={() => {
          setModalVisible(true);
        }}
        secondary
        title="Open Modal"
      />
    </View>
  );
};

export default ContactsComponent;
