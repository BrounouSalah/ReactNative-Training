import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const AppModal = ({
  modalVisible,
  title,
  modalBody,
  modalFooter,
  setModalVisible,
}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
        }}
        style={styles.wrapper}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.header}>
              <EvilIcons size={27} name="close" />
              <Text style={styles.title}>{title || 'Contacts'}</Text>
              <View />
              <View />
              <View />
              <View />
              <View />
            </View>
            <View style={styles.footerSeparator} />
            <View style={styles.body}>{modalBody}</View>
            {modalFooter}

            {!modalFooter && (
              <View>
                <>
                  <View style={styles.footerSeparator} />
                  <View style={styles.footerItems}>
                    <View style={styles.footer}>
                      <Text style={styles.footerText}>Privacy Policy</Text>
                      <View style={styles.termsView} />
                      <Text style={styles.footerText}>Terms of Service</Text>
                    </View>
                  </View>
                </>
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AppModal;
