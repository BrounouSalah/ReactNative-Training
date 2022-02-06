import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';

import CustomButton from '../CustomButton/index';
import Message from '../Message/index';
import colors from '../../../assets/theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {CONTACT_DETAIL, CREATE_CONTACT} from '../../../constants/routeNames';
const ContactsComponent = ({sortBy, data, loading, setModalVisible}) => {
  const {navigate} = useNavigation();
  const ListEmptyComponent = () => (
    <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
      <Message info message="No Contacts Found" />
    </View>
  );
  const renderItem = ({item}) => {
    const {contact_picture, first_name, last_name, phone_number, country_code} =
      item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigate(CONTACT_DETAIL, {item});
        }}>
        <View style={styles.item}>
          {contact_picture ? (
            <Image
              style={{width: 45, height: 45, borderRadius: 100}}
              source={{uri: contact_picture}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: colors.grey,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <Text style={[styles.name, {color: colors.white}]}>
                {first_name[0]}
              </Text>
              <Text style={[styles.name, {color: colors.white}]}>
                {last_name[0]}
              </Text>
            </View>
          )}
          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{first_name}</Text>
              <Text style={styles.name}>{last_name}</Text>
            </View>
            <Text
              style={
                styles.phoneNumber
              }>{`${country_code} ${phone_number}`}</Text>
          </View>
        </View>
        <AntDesign size={18} name="right" color={colors.grey} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        {loading && (
          <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        {!loading && (
          <View style={{paddingVertical: 20}}>
            <FlatList
              keyExtractor={item => String(item.id)}
              renderItem={renderItem}
              data={
                sortBy
                  ? data.sort((a, b) => {
                      if (sortBy === 'First Name') {
                        if (b.first_name > a.first_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                      if (sortBy === 'Last Name') {
                        if (b.last_name > a.last_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                    })
                  : data
              }
              ItemSeparatorComponent={() => (
                <View style={{height: 0.5, backgroundColor: colors.grey}} />
              )}
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={<View style={{height: 150}}></View>}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigate(CREATE_CONTACT);
        }}>
        <AntDesign size={24} name="plus" color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;
