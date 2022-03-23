import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';
import { BackButton, Container, FText } from '../components';
import FInput from '../components/FInput';
import { Colors } from '../constants/colors';
import { isAndroid, setValue, setXAxisValue, setYAxisValue } from '../utils';

const OTPVerification = ({ navigation, route }) => {
  const { username } = route.params || {};
  const [otp, setOTP] = React.useState('');
  const inputRef = React.useRef();
  const onResendCodePress = React.useCallback(() => {
    //resend code
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
      <View style={styles.container} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
        <View style={styles.mainContainer}>
          <FText fontWeight="800" fontSize="h4" lineHeightRatio={1.2}>
            Verification Code
          </FText>
          <FText fontWeight={300} fontSize="small">
            Please type the verification code sent to {username}
          </FText>
        </View>
        <FInput
          autoFocus
          keyboardType="numeric"
          value={otp}
          onChangeText={code => code.length <= 4 && setOTP(code)}
          ref={inputRef}
          containerStyle={styles.hiddenInput}
        />
        <View style={styles.codeInputContainer}>
          {new Array(4).fill(1).map((_, index) => (
            <Pressable
              onPress={() => inputRef.current?.focus?.()}
              key={index}
              style={[styles.codeInput, index === otp.length && styles.highlight]}>
              {otp[index] && (
                <Animated.View entering={BounceIn}>
                  <FText color={Colors.primary} lineHeightRatio={1.25} fontSize={28}>
                    {otp[index]}
                  </FText>
                </Animated.View>
              )}
            </Pressable>
          ))}
        </View>
        <View style={styles.alreadyHaveAccount}>
          <FText fontSize={14}>
            I don't receive the code!{' '}
            <FText fontSize={14} color={Colors.primary} onPress={onResendCodePress}>
              Please resend
            </FText>
          </FText>
        </View>
        <TouchableOpacity style={styles.btnLogin}>
          <FText color={Colors.white} fontWeight="700">
            VERIFY
          </FText>
        </TouchableOpacity>
        {!isAndroid && <KeyboardSpacer />}
      </View>
    </Container>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  topDecorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -setYAxisValue(20)
  },
  container: {
    flex: 1,
    justifyContent: 'center'
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
  btnLogin: {
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
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(26),
    justifyContent: 'space-between',
    marginTop: setYAxisValue(25)
  },
  codeInput: {
    width: setValue(65),
    height: setValue(65),
    borderRadius: setValue(10),
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hiddenInput: {
    width: 0,
    height: 0,
    overflow: 'hidden'
  },
  highlight: {
    borderColor: Colors.primary,
    borderWidth: 1
  }
});
