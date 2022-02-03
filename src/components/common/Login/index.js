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
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {REGISTER} from '../../../constants/routeNames';
import Message from '../Message';

const LoginComponent = ({
  onSubmit,
  justSignedUp,
  onChange,
  form,
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
        <Text style={styles.subTitle}>Please Login to Continue</Text>
        {error && (
          <Message onDismiss={() => {}} danger message="Invalid Credentials" />
        )}
        <View style={styles.form}>
          {justSignedUp && (
            <Message
              onDismiss={() => {}}
              success
              message="Account created successfully"
            />
          )}
          <Input
            label="Username"
            placeholder="Enter Username"
            value={form.Username || null}
            onChangeText={value => {
              onChange({name: 'Username', value});
            }}
            error={error?.username?.[0]}
          />
          <Input
            label="Password"
            onChangeText={value => {
              onChange({name: 'Password', value});
            }}
            error={error?.password?.[0]}
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            placeholder="Enter Password"
            //error={password === '' ? 'This field is required' : false}
          />
          <CustomButton
            disabled={loading}
            loading={loading}
            secondary
            title="Submit"
            OnPress={onSubmit}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new account ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigate(REGISTER);
              }}>
              <Text style={styles.linkBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default LoginComponent;
