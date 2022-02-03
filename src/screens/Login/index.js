import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';

const SignIn = () => {
  const [userName, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <Container>
      <Text>Hi from SignIn</Text>
      <Input
        label="Username"
        onChangeText={onChangeUsername}
        value={userName}
        error={userName === '' ? 'This field is required' : false}
      />
      <Input
        label="Password"
        onChangeText={onChangePassword}
        value={password}
        icon={<Text>HIDE</Text>}
        iconPosition="right"
        error={password === '' ? 'This field is required' : false}
      />
    </Container>
  );
};

export default SignIn;
