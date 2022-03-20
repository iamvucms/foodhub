import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Container, FInput, FText } from '../components';
import { Colors } from '../constants/colors';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInRight, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Onboarding = () => {
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onSignUpPress = React.useCallback(() => {
    navigation.navigate('SignUp');
  }, []);
  const onLoginPress = React.useCallback(() => {
    navigation.navigate('Login');
  });
  const anim = useSharedValue(0);
  React.useEffect(() => {
    anim.value = withSpring(1);
  }, []);
  const styles2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(anim.value, [0, 1], [-setYAxisValue(100), 0])
        }
      ],
      opacity: anim.value
    };
  }, []);
  const { bottom } = useSafeAreaInsets();
  return (
    <Container disableFirst disableLast>
      <View style={styles.backgroundContainer}>
        <Image style={styles.bgImage} source={require('../assets/images/welcome.web.jpeg')} />
        <LinearGradient style={styles.gradientBg} colors={['rgba(0,0,0,0.25)', '#191B2F']} />
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.leftContainer}>
          <Animated.View style={styles2}>
            <FText style={styles.welcomeTxt} color={Colors.white} fontSize={100} fontWeight="800">
              Welcome to
            </FText>
            <FText style={styles.welcomeTxt} fontSize={100} fontWeight="800" color={Colors.primary}>
              FoodHub
            </FText>
            <View style={styles.slogan}>
              <FText fontSize="h6" color={Colors.white}>
                Your favourite foods delivered
              </FText>
              <FText fontSize="h6" color={Colors.white}>
                fast at your door.
              </FText>
            </View>
          </Animated.View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.loginContainer}>
            <FText color={Colors.white} fontSize={50} fontWeight={500}>
              Login
            </FText>
            <FInput
              color={Colors.white}
              titleColor={Colors.white}
              onChangeText={setUsername}
              value={username}
              containerStyle={styles.inputContainer}
              title="E-mail"
              placeholder="Your email or phone"
            />
            <FInput
              color={Colors.white}
              titleColor={Colors.white}
              onChangeText={setPassword}
              value={password}
              containerStyle={styles.inputContainer}
              isPassword
              title="Password"
              placeholder="Enter your password"
            />
            <View>
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
          </View>
        </View>
      </View>
      {/*  */}
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
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    width: setXAxisValue(400)
  },
  welcomeTxt: {
    lineHeight: setYAxisValue(100) * 1.28
  },
  slogan: {
    marginTop: setYAxisValue(20)
  },
  signInSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: setYAxisValue(20)
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
  },
  inputContainer: {
    marginTop: setYAxisValue(20)
  }
});
