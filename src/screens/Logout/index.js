import {ActivityIndicator} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {GlobalContext} from '../../context/Provider';
import logoutUser from '../../context/actions/auth/logoutUser';

const Logout = () => {
  const {authDispatch} = useContext(GlobalContext);
  useEffect(() => {
    logoutUser()(authDispatch);
  }, []);
  return <ActivityIndicator />;
};

export default Logout;
