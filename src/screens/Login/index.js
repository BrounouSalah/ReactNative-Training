import React, {useState, useContext} from 'react';
import LoginComponent from '../../components/common/Login';
import {GlobalContext} from '../../context/Provider';
import loginUser from '../../context/actions/auth/loginUser';
import {useRoute} from '@react-navigation/native';

const SignIn = () => {
  const [form, setForm] = useState({});
  const [justSignedUp, setJustSignedUp] = useState(false);
  const {params} = useRoute();
  React.useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      setForm({...form, Username: params.data.username});
    }
  }, [params]);

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);
  const onSubmit = () => {
    if (form.Username && form.Password) {
      loginUser(form)(authDispatch);
    }
  };
  const onChange = ({name, value}) => {
    setJustSignedUp(false);
    setForm({...form, [name]: value});
  };
  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loading={loading}
      justSignedUp={justSignedUp}
    />
  );
};

export default SignIn;
