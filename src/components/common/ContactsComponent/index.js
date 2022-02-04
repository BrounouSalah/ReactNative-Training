import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import AppModal from '../AppModal';
import CustomButton from '../CustomButton/index';
import Message from '../Message/index';
import colors from '../../../assets/theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {CREATE_CONTACT} from '../../../constants/routeNames';
const ContactsComponent = ({modalVisible, data, loading, setModalVisible}) => {
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
      <TouchableOpacity style={styles.itemContainer}>
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
        <AppModal
          modalFooter={<></>}
          modalBody={<></>}
          title="My Profile"
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
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
              data={data}
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
