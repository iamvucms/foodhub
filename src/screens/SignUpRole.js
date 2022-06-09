import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { BackButton, Container, ErrorModal, FText, LoadingIndicatorModal } from '../components';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { userStore } from '../stores';

const SignUpRole = ({ navigation, route }) => {
  const { user } = route.params || {};
  const state = useLocalObservable(() => ({
    role: 'customer',
    setRole: e => (state.role = e),
    get isCustomer() {
      return this.role === 'customer';
    }
  }));
  const onSignUpRolePress = React.useCallback(() => {
    if (state.isCustomer) {
      userStore.setLogined(true);
    } else {
      navigation.navigate('SignUpRestaurant', { user });
    }
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
      <View keyboardShouldPersistTaps="handled" style={{ flex: 1 }} scrollEnabled={false}>
        <View style={styles.mainContainer}>
          <FText fontWeight="800" fontSize="h4" lineHeightRatio={1.2}>
            Choose Your Role
          </FText>
          <Observer>
            {() => (
              <View
                style={[
                  styles.roleContainer,
                  {
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }
                ]}>
                <FText align="center">Select your role to continue. You can always change your role later.</FText>
                <View
                  style={[
                    styles.roleContainer,
                    {
                      flex: 0,
                      width: '100%',
                      marginTop: setYAxisValue(20)
                    }
                  ]}>
                  <TouchableOpacity
                    onPress={() => state.setRole('customer')}
                    style={[
                      styles.roleItem,
                      state.isCustomer && {
                        backgroundColor: Colors.primary
                      }
                    ]}>
                    <Image source={require('../assets/images/customer-review.png')} style={styles.roleImage} />
                    <FText color={state.isCustomer ? Colors.white : Colors.primary}>Customer</FText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => state.setRole('restaurant')}
                    style={[
                      styles.roleItem,
                      !state.isCustomer && {
                        backgroundColor: Colors.primary
                      }
                    ]}>
                    <Image source={require('../assets/images/store.png')} style={styles.roleImage} />
                    <FText color={!state.isCustomer ? Colors.white : Colors.primary}>Restaurant</FText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Observer>
        </View>
        <TouchableOpacity onPress={onSignUpRolePress} style={styles.btnSignUpRole}>
          <FText color={Colors.white} fontWeight="700">
            SELECT
          </FText>
        </TouchableOpacity>
      </View>
      <Observer>{() => userStore.signingUp && <LoadingIndicatorModal />}</Observer>
      <Observer>
        {() =>
          !!userStore.signUpError && <ErrorModal error={userStore.signUpError} onRequestClose={() => userStore.setSignUpRoleError(null)} />
        }
      </Observer>
    </Container>
  );
};

export default SignUpRole;

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
    paddingHorizontal: setXAxisValue(26),
    flex: 1
  },

  btnSignUpRole: {
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

  signInSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: setYAxisValue(30),
    flex: 1
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1
  },
  roleItem: {
    backgroundColor: Colors.gray_40,
    padding: setValue(15),
    borderRadius: setValue(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  roleImage: {
    width: setValue(60),
    height: setValue(60),
    marginBottom: setYAxisValue(10)
  }
});
