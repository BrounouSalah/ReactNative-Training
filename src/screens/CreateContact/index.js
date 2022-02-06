import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useContext, useRef, useEffect} from 'react';
import {CONTACT_LIST} from '../../constants/routeNames';
import CreateContactComponent from '../../components/common/CreateContactComponent';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';
const CreateContact = () => {
  const {navigate} = useNavigation();
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error, data},
    },
  } = useContext(GlobalContext);
  const [localFile, setLocalFile] = useState(null);
  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);
  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const {params} = useRoute();
  useEffect(() => {
    if (params?.contact) {
      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;
      setForm(prev => {
        return {
          ...prev,
          firstName,
          lastName,
          phoneNumber,
          isFavorite,
          countryCode,
        };
      });
      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });
      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }
      if (params?.contact.contact_picture) {
        setLocalFile(params?.contact.contact_picture);
      }
    }
  }, []);

  const onSubmit = () => {
    if (params?.contact) {
      if (localFile) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(error => {
          console.log('err', error);
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      }
    } else {
      if (localFile) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACT_LIST);
            },
          );
        })(error => {
          console.log('err', error);
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACT_LIST);
        });
      }
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
