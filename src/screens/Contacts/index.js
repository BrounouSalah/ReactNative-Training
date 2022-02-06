import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {GlobalContext} from '../../context/Provider';
import ContactsComponent from '../../components/common/ContactsComponent';
import getContacts from '../../context/actions/contacts/getContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../navigations/SideMenu/RootNavigation';
import {CONTACT_DETAIL} from '../../constants/routeNames';

const Contacts = () => {
  const [sortBy, setSortBy] = useState(null);
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    contactsDispatch,
    contactsState: {
      getContacts: {data, loading, error},
    },
  } = useContext(GlobalContext);
  const contactRef = useRef([]);
  useEffect(() => {
    getContacts()(contactsDispatch);
  }, []);
  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getSettings();
      return () => {};
    }, []),
  );
  useEffect(() => {
    const prev = contactRef.current;
    contactRef.current = data;
    const newList = contactRef.current;
    if (newList.length - prev.length === 1) {
      const newContact = newList.find(x => !prev.map(i => i.id).includes(x.id));

      navigate(CONTACT_DETAIL, {item: newContact});
    }
  }, [data]);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <MaterialIcon style={{padding: 10}} size={25} name="menu" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <ContactsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      loading={loading}
      data={data}
      sortBy={sortBy}
    />
  );
};

export default Contacts;
