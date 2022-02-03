import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text} from 'react-native';
import RegisterComponent from '../../components/common/Signup';
import {LOGIN} from '../../constants/routeNames';
import register, {clearAuthState} from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';
import axiosInstance from '../../helpers/axiosInterceptor';

const SignUp = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);
  const {navigate} = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
    if (value !== '') {
      if (name === 'Password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {...prev, [name]: 'this field needs min 6 characters'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'this field is required'};
      });
    }
  };
  const OnSubmit = () => {
    if (!form.Username) {
      setErrors(prev => {
        return {...prev, Username: 'Please add a username'};
      });
    }
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please add a Firstname'};
      });
    }
    if (!form.lastName) {
      setErrors(prev => {
        return {...prev, lastName: 'Please add a Lastname'};
      });
    }
    if (!form.Email) {
      setErrors(prev => {
        return {...prev, Email: 'Please add an Email'};
      });
    }
    if (!form.Password) {
      setErrors(prev => {
        return {...prev, Password: 'Please add a Password'};
      });
    }
    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      register(form)(authDispatch)(response => {
        navigate(LOGIN, {data: response});
      });
    }
  };
  return (
    <RegisterComponent
      OnSubmit={OnSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
  );
};
export default SignUp;
