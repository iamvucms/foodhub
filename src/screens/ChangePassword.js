import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { Container, FText, Header, Padding } from '../components';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isAndroid } from '../utils';
import { Colors } from '../constants/colors';
import { userStore } from '../stores';
import md5 from 'md5';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { UserActions } from '../actions';
const ChangePassword = ({ navigation }) => {
  const state = useLocalObservable(() => ({
    type: 'password',
    error: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    setInputValue: value => {
      state.error = '';
      state[state.type] = value;
    },
    switchType: async () => {
      if (state.type === 'password') {
        if (md5(state.password) === userStore.user.password) {
          state.type = 'newPassword';
        } else {
          state.error = 'Wrong password';
        }
      } else if (state.type === 'newPassword') {
        if (state.newPassword.trim().length < 6) {
          state.error = 'Password must be at least 6 characters';
        } else {
          state.type = 'confirmPassword';
        }
      } else {
        if (state.newPassword !== state.confirmPassword) {
          state.error = 'Password does not match';
        } else {
          await UserActions.updateUserInformation({
            password: state.newPassword
          });
          navigation.goBack();
        }
      }
    },
    get value() {
      return this[this.type];
    },
    get isError() {
      return this.error !== '';
    },
    get title() {
      return this.type === 'password'
        ? 'Enter your password'
        : state.type === 'newPassword'
        ? 'Enter new password'
        : 'Confirm new password';
    }
  }));
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <Container>
      <Header title="Change Your Password" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <View style={styles.passwordContainer}>
          <Observer>{() => <FText>{state.title}</FText>}</Observer>
          <View style={styles.inputContainer}>
            <Observer>
              {() => (
                <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
                  <TextInput
                    autoFocus
                    onEndEditing={() => state.switchType()}
                    value={state.value}
                    onChangeText={txt => state.setInputValue(txt)}
                    secureTextEntry
                    style={[styles.input, state.isError && styles.errorInput]}
                  />
                </ScrollView>
              )}
            </Observer>
          </View>
          <Observer>
            {() =>
              state.isError && (
                <Animated.View entering={FadeInLeft}>
                  <Padding paddingTop={10}>
                    <FText fontSize={14} color={Colors.danger}>
                      {state.error}
                    </FText>
                  </Padding>
                </Animated.View>
              )
            }
          </Observer>
        </View>
      </View>
      {!isAndroid && <KeyboardSpacer />}
    </Container>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  passwordContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    height: 40,
    marginTop: 10,
    minWidth: 200
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20
  },
  errorInput: {
    color: Colors.danger
  }
});
