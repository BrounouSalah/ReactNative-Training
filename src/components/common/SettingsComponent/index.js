import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Container from '../Container/index';
import colors from '../../../assets/theme/colors';
import AppModal from '../AppModal';
import Entypo from 'react-native-vector-icons/Entypo';
const SettingsComponent = ({
  settingsOptions,
  setModalVisible,
  modalVisible,
  prefArr,
}) => {
  return (
    <>
      <AppModal
        modalVisible={modalVisible}
        modalFooter={<></>}
        closeOnTouchOutside
        modalBody={
          <View>
            {prefArr.map(({name, selected, onPress}) => (
              <View key={name}>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  {selected && <Entypo size={21} name="check" />}
                  <Text style={{fontSize: 17, paddingLeft: selected ? 15 : 30}}>
                    {name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        title="Sort by"
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{backgroundColor: colors.white}}>
        {settingsOptions.map(({title, subTitle, onPress}, index) => (
          <TouchableOpacity key={title} onPress={onPress}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 20,
              }}>
              <Text style={{fontSize: 17}}>{title}</Text>
              {subTitle && (
                <Text style={{fontSize: 14, opacity: 0.6, paddingTop: 5}}>
                  {subTitle}
                </Text>
              )}
            </View>
            <View style={{height: 0.5, backgroundColor: colors.grey}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default SettingsComponent;
