import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useRef} from 'react';
import {CONTACT_LIST} from '../../constants/routeNames';
import CreateContactComponent from '../../components/common/CreateContactComponent';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
const CreateContact = () => {
  const {navigate} = useNavigation();
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error, data},
    },
  } = useContext(GlobalContext);
  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);
  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const [localFile, setLocalFile] = useState(null);
  const onSubmit = () => {
    if (localFile?.size) {
      setIsUploading(true);
      uploadImage(localFile)(url => {
        setIsUploading(false);
        createContact({...form, contactPicture: url})(contactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      })(error => {
        console.log('err', error);
        setIsUploading(false);
      });
    } else {
      createContact(form)(contactsDispatch)(() => {
        navigate(CONTACT_LIST);
      });
    }
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
  };
  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading || uploading}
      error={error}
      toggleValueChange={toggleValueChange}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
