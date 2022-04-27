import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Container, FText } from '../components';
import { Colors } from '../constants/colors';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '../constants';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { autorun } from 'mobx';
import { userStore } from '../stores';

const Onboarding = () => {
  const navigation = useNavigation();
  useEffect(() => {
    autorun(() => {
      if (userStore.logined) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'HomeStack'
              }
            ]
          })
        );
      }
    });
  }, []);
  const onSignUpPress = React.useCallback(() => {
    navigation.navigate('SignUp');
  }, []);
  const onLoginPress = React.useCallback(() => {
    navigation.navigate('Login');
  });
  const { bottom } = useSafeAreaInsets();
  return (
    <Container disableFirst disableLast>
      <View style={styles.backgroundContainer}>
        <Image style={styles.bgImage} source={require('../assets/images/welcome.png')} />
        <LinearGradient style={styles.gradientBg} colors={['rgba(0,0,0,0)', '#191B2F']} />
      </View>
      <View style={styles.centerContainer}>
        <FText style={styles.welcomeTxt} fontSize="h1" fontWeight="800">
          Welcome to
        </FText>
        <FText style={styles.welcomeTxt} fontSize="h1" fontWeight="800" color={Colors.primary}>
          FoodHub
        </FText>
        <View style={styles.slogan}>
          <FText color={Colors.typography_80}>Your favourite foods delivered</FText>
          <FText color={Colors.typography_80}>fast at your door.</FText>
        </View>
      </View>
      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: bottom > 0 ? bottom : setYAxisValue(20)
          }
        ]}>
        <View style={styles.signInSection}>
          <View style={styles.whiteLine} />
          <FText style={styles.signInTxt} color={Colors.white}>
            sign in with
          </FText>
          <View style={styles.whiteLine} />
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
        <TouchableOpacity onPress={onSignUpPress} style={styles.btnSignUp}>
          <FText color={Colors.white}>Start with email or phone</FText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLoginPress} style={styles.signInBtn}>
          <FText color={Colors.white}>Sign In</FText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  },
  bgImage: {
    height: '100%',
    width: '100%'
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: setXAxisValue(28)
  },
  welcomeTxt: {
    lineHeight: setYAxisValue(40) * 1.28
  },
  slogan: {
    marginTop: setYAxisValue(20)
  },
  signInSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteLine: {
    width: setXAxisValue(84),
    height: 1,
    backgroundColor: Colors.white
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
    backgroundColor: Colors.white
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
    marginTop: setYAxisValue(20)
  },
  btnSignUp: {
    height: setYAxisValue(54),
    width: setXAxisValue(315),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: setYAxisValue(20),
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: setXAxisValue(27)
  },
  signInBtn: {
    marginTop: setYAxisValue(20),
    alignSelf: 'flex-end',
    marginRight: (Layout.window.width - setXAxisValue(319)) / 2 + setYAxisValue(27),
    borderBottomColor: Colors.white,
    borderBottomWidth: 1
  }
});
