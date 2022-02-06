import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ContactDetailsComponent from '../../components/common/ContactDetailsComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/theme/colors';
import {GlobalContext} from '../../context/Provider';
import deleteContact from '../../context/actions/contacts/deleteContact';
import {navigate} from '../../navigations/SideMenu/RootNavigation';
import {CONTACT_LIST} from '../../constants/routeNames';
const ContactDetails = () => {
  const {params: {item = {}} = {}} = useRoute();
  const {
    contactsDispatch,
    contactsState: {
      deleteContact: {loading},
    },
  } = useContext(GlobalContext);
  const {setOptions} = useNavigation();
  useEffect(() => {
    if (item) {
      setOptions({
        title: item.first_name + ' ' + item.last_name,
        headerRight: () => {
          return (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
              <TouchableOpacity>
                <MaterialIcons
                  color={colors.grey}
                  name={item.is_favorite ? 'star' : 'star-border'}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => {
                  Alert.alert(
                    'Delete!',
                    'Are you sure you want to remove' +
                      ' ' +
                      item.first_name +
                      ' ' +
                      '?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },
                      {
                        text: 'Ok',
                        onPress: () => {
                          deleteContact(item.id)(contactsDispatch)(() => {
                            navigate(CONTACT_LIST);
                          });
                        },
                      },
                    ],
                  );
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <MaterialIcons color={colors.grey} name="delete" size={25} />
                )}
              </TouchableOpacity>
            </View>
          );
        },
      });
    }
  }, [item, loading]);
  return <ContactDetailsComponent contact={item} />;
};

export default ContactDetails;
