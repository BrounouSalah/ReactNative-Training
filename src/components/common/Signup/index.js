import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Container from '../Container/index';
import CustomButton from '../CustomButton/index';
import Input from '../Input/index';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../../constants/routeNames';
import styles from './styles';
import Message from '../Message';

const RegisterComponent = ({
  OnSubmit,
  onChange,
  form,
  errors,
  loading,
  error,
}) => {
  const {navigate} = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={require('../../../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to My App</Text>
        <Text style={styles.subTitle}>Create an Account</Text>
        <View style={styles.form}>
          {error?.error && (
            <Message danger message={error?.error} retry retryFn={() => {}} />
          )}
          <Input
            label="Username"
            placeholder="Enter Username"
            onChangeText={value => {
              onChange({name: 'Username', value});
            }}
            error={errors.Username || error?.username?.[0]}
          />
          <Input
            label="First name"
            onChangeText={value => {
              onChange({name: 'firstName', value});
            }}
            error={errors.firstName || error?.first_name?.[0]}
            placeholder="Enter First name"
          />
          <Input
            label="Last name"
            placeholder="Enter Last name"
            onChangeText={value => {
              onChange({name: 'lastName', value});
            }}
            error={errors.lastName || error?.last_name?.[0]}
          />
          <Input
            label="Email"
            placeholder="Enter Email"
            onChangeText={value => {
              onChange({name: 'Email', value});
            }}
            error={errors.Email || error?.email?.[0]}
          />
          <Input
            label="Password"
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            placeholder="Enter Password"
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'Password', value});
            }}
            error={errors.Password || error?.password?.[0]}
          />
          <CustomButton
            loading={loading}
            disabled={loading}
            secondary
            title="Submit"
            OnPress={OnSubmit}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Already have an account ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(LOGIN);
              }}>
              <Text style={styles.linkBtn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default RegisterComponent;
