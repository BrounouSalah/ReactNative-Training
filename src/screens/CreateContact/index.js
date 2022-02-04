import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {CONTACT_LIST} from '../../constants/routeNames';
import CreateContactComponent from '../../components/common/CreateContactComponent';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';
const CreateContact = () => {
  const {navigate} = useNavigation();
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error, data},
    },
  } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    createContact(form)(contactsDispatch)(() => {
      navigate(CONTACT_LIST);
    });
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading}
      error={error}
      toggleValueChange={toggleValueChange}
    />
  );
};

export default CreateContact;
