import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { BackButton, Container, FText } from '../components';
import { Layout } from '../constants';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import FInput from '../components/FInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const onLoginPress = React.useCallback(() => {
    navigation.navigate('Login');
  }, []);
  return (
    <Container disableFirst>
      <View style={styles.topDecorContainer}>
        <View style={styles.shape} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]}>
          <View style={styles.innerShape} />
        </View>
      </View>
      <BackButton />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }} scrollEnabled={false}>
        <View style={styles.mainContainer}>
          <FText fontWeight="800" fontSize="h4" lineHeightRatio={1.2}>
            Sign Up
          </FText>
          <FInput
            onChangeText={setFullname}
            value={fullname}
            containerStyle={styles.inputContainer}
            title="Full name"
            placeholder="Enter your full name"
          />
          <FInput
            onChangeText={setEmail}
            value={email}
            containerStyle={styles.inputContainer}
            title="E-mail"
            placeholder="Enter your E-mail"
          />
          <FInput
            onChangeText={setPassword}
            value={password}
            containerStyle={styles.inputContainer}
            isPassword
            title="Password"
            placeholder="Enter your password"
          />
        </View>
        <TouchableOpacity style={styles.btnSignUp}>
          <FText color={Colors.white} fontWeight="700">
            SIGN UP
          </FText>
        </TouchableOpacity>
        <View style={styles.alreadyHaveAccount}>
          <FText fontSize={14}>
            Already have an account?
            <FText fontSize={14} color={Colors.primary} onPress={onLoginPress}>
              {' '}
              Login{' '}
            </FText>
          </FText>
        </View>
        <View style={styles.signInSection}>
          <View style={styles.grayLine} />
          <FText style={styles.signInTxt} fontSize="small" color={Colors.typography_80}>
            sign in with
          </FText>
          <View style={styles.grayLine} />
        </View>
        <View style={styles.loginWithGroupBtn}>
          <TouchableOpacity style={styles.loginWithBtn}>
            <Image style={styles.brandIcon} source={require('../assets/images/facebook-circle.png')} />
            <FText fontSize={13}>FACEBOOK</FText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginWithBtn}>
            <Image style={styles.brandIcon} source={require('../assets/images/google-circle.png')} />
            <FText fontSize={13}>GOOGLE</FText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  topDecorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -setYAxisValue(20)
  },
  shape: {
    position: 'absolute',
    height: setValue(181),
    width: setValue(181),
    borderRadius: setValue(90),
    backgroundColor: Colors.primary,
    top: -setValue(90),
    right: -setValue(90)
  },
  shape2: {
    top: setValue(-90),
    left: 0,
    backgroundColor: Colors.primary_40
  },
  shape3: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -setValue(80),
    left: -setValue(90),
    zIndex: -1
  },
  innerShape: {
    height: setValue(90),
    width: setValue(90),
    borderRadius: setValue(45),
    backgroundColor: Colors.white
  },
  mainContainer: {
    marginTop: setYAxisValue(98),
    paddingHorizontal: setXAxisValue(26)
  },
  inputContainer: {
    marginTop: setYAxisValue(25)
  },
  btnSignUp: {
    alignSelf: 'center',
    marginTop: setYAxisValue(30),
    height: setYAxisValue(60),
    width: setXAxisValue(248),
    borderRadius: setYAxisValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  alreadyHaveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: setYAxisValue(25)
  },
  signInSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: setYAxisValue(30),
    flex: 1
  },
  grayLine: {
    width: setXAxisValue(84),
    height: 1,
    backgroundColor: Colors.typography_20
  },
  signInTxt: {
    lineHeight: setYAxisValue(16),
    marginHorizontal: setXAxisValue(15)
  },
  loginWithBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: setXAxisValue(139),
    height: setYAxisValue(54),
    borderRadius: setXAxisValue(27),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  brandIcon: {
    height: setValue(28),
    width: setValue(28),
    marginLeft: setXAxisValue(13),
    marginRight: setXAxisValue(10)
  },
  loginWithGroupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: setYAxisValue(20)
  }
});
