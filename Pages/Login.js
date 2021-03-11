import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../Hooks/Api';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalStyles from '../utils/GlobalStyle';

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(true);
  console.log('isLoggedIn?', isLoggedIn);
  const { checkToken } = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setUser(userData);
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } catch (error) {
        console.log('token check failed', error.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView style={styles.main}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={'padding'}
          enabled
        >
          <TouchableWithoutFeedback
            onPress={Platform.OS == 'web' ? undefined : Keyboard.dismiss}
          >
            <View style={styles.inner}>
              <View style={styles.appName}>
                <Text style={styles.name} h1>
                  Handcrafted Items
                </Text>
              </View>
              <View style={styles.form}>
                <Card>
                  {formToggle ? (
                    <>
                      <Card.Title h4>Login</Card.Title>
                      <Card.Divider />
                      <LoginForm />
                    </>
                  ) : (
                    <>
                      <Card.Title h4>Register</Card.Title>
                      <Card.Divider />
                      <RegisterForm />
                    </>
                  )}
                  <ListItem
                    onPress={() => {
                      setFormToggle(!formToggle);
                    }}
                  >
                    <ListItem.Content>
                      <Text style={styles.text}>
                        {formToggle
                          ? 'No account? Please register.'
                          : 'Already registered. Login here.'}
                      </Text>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </Card>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: 'lightblue',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  form: {
    flex: 2,
  },
  appName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    padding: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
