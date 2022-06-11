import { StyleSheet, TouchableOpacity, View, Image, ScrollView, Pressable } from 'react-native';
import React, { useRef } from 'react';
import { BackButton, Container, ErrorModal, FInput, FText, LoadingIndicatorModal } from '../components';
import { setValue, setXAxisValue, setYAxisValue, standardizeImageType, toCorrectImageUri } from '../utils';
import { Colors } from '../constants/colors';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { userStore } from '../stores';
import { Layout } from '../constants';
import { launchImageLibrary } from 'react-native-image-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import userActions from '../actions/userActions';
import { toJS } from 'mobx';

const SignUpRestaurant = ({ navigation, route }) => {
  const listRef = useRef();
  const state = useLocalObservable(() => ({
    logo: {},
    cover: {},
    name: '',
    address: '',
    deliveryFee: 0,
    currentPage: 0,
    setLogo: e => (state.logo = e),
    setCover: e => (state.cover = e),
    setName: e => (state.name = e),
    setAddress: e => (state.address = e),
    setDeliveryFee: e => (state.deliveryFee = e),
    setCurrentPage: e => (state.currentPage = e),
    get isEnd() {
      return this.currentPage === 2;
    },
    get isAllValid() {
      return !!this.name.trim() && !!this.address.trim() && !isNaN(this.deliveryFee) && !!this.logo?.uri && !!this.cover?.uri;
    }
  }));
  const onAvatarPress = React.useCallback(async () => {
    const response = await launchImageLibrary();
    const avatar = response.assets[0];
    if (avatar) {
      state.setLogo(avatar);
    }
  }, []);
  const onCoverPress = React.useCallback(async () => {
    const response = await launchImageLibrary();
    const cover = response.assets[0];
    if (cover) {
      state.setCover(cover);
    }
  }, []);
  const onNextPress = React.useCallback(async () => {
    if (state.currentPage < 2) {
      state.setCurrentPage(state.currentPage + 1);
      listRef.current.scrollTo({
        x: Layout.window.width * state.currentPage,
        animated: true
      });
    } else {
      if (state.isAllValid) {
        userActions.createRestaurant({
          name: state.name,
          address: state.address,
          delivery_fee: parseFloat(state.deliveryFee),
          logo: toJS(state.logo),
          cover_image: toJS(state.cover)
        });
      }
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
      <KeyboardAwareScrollView>
        <ScrollView
          onMomentumScrollEnd={e => state.setCurrentPage(Math.round(e.nativeEvent.contentOffset.x / Layout.window.width))}
          ref={listRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}>
          <View style={styles.mainContainer}>
            <FText fontWeight="800" fontSize="h4" lineHeightRatio={1.2}>
              Upload Your Restaurant Logo
            </FText>
            <View style={styles.informationContainer}>
              <Pressable onPress={onAvatarPress}>
                <Observer>
                  {() => (
                    <Image
                      style={styles.logo}
                      source={{
                        uri: toCorrectImageUri(state.logo?.uri)
                      }}
                    />
                  )}
                </Observer>
              </Pressable>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <FText fontWeight="800" fontSize="h4" lineHeightRatio={1.2}>
              Upload Your Restaurant Cover
            </FText>
            <View style={styles.informationContainer}>
              <Pressable onPress={onCoverPress}>
                <Observer>
                  {() => (
                    <Image
                      style={styles.cover}
                      source={{
                        uri: toCorrectImageUri(state.cover?.uri)
                      }}
                    />
                  )}
                </Observer>
              </Pressable>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <FText fontWeight="800" fontSize="h4" lineHeightRatio={1.2}>
              Restaurant Information
            </FText>
            <View style={styles.informationContainer}>
              <Observer>
                {() => (
                  <FInput
                    value={state.name}
                    onChangeText={txt => state.setName(txt)}
                    containerStyle={styles.inputContainer}
                    title="Restaurant Name"
                    placeholder="Enter restaurant name"
                  />
                )}
              </Observer>
              <Observer>
                {() => (
                  <FInput
                    value={state.address}
                    onChangeText={txt => state.setAddress(txt)}
                    containerStyle={styles.inputContainer}
                    title="Restaurant Address"
                    placeholder="Enter restaurant address"
                  />
                )}
              </Observer>
              <Observer>
                {() => (
                  <FInput
                    keyboardType="numeric"
                    value={`${state.deliveryFee}`}
                    onChangeText={txt => state.setDeliveryFee(txt)}
                    containerStyle={styles.inputContainer}
                    title="Delivery Fee (per order)"
                    placeholder="Enter delivery fee"
                  />
                )}
              </Observer>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <Observer>
        {() => (
          <TouchableOpacity disabled={state.isEnd && !state.isAllValid} onPress={onNextPress} style={styles.btnSignUpRestaurant}>
            <FText color={Colors.white} fontWeight="700">
              {state.isEnd ? (state.isAllValid ? 'Finish' : 'Please fill all fields') : 'Next'}
            </FText>
          </TouchableOpacity>
        )}
      </Observer>
      <Observer>{() => userStore.creatingRestaurant && <LoadingIndicatorModal />}</Observer>
    </Container>
  );
};

export default SignUpRestaurant;

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
    width: Layout.window.width,
    height: '100%'
  },

  btnSignUpRestaurant: {
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
  informationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: setYAxisValue(100)
  },
  logo: {
    height: setValue(150),
    width: setValue(150),
    borderRadius: setValue(75),
    backgroundColor: Colors.gray_60
  },
  cover: {
    height: setYAxisValue(156),
    width: Layout.window.width - setXAxisValue(52),
    borderRadius: setValue(10),
    backgroundColor: Colors.gray_60
  },
  inputContainer: {
    width: Layout.window.width - setXAxisValue(40),
    marginTop: setYAxisValue(25)
  }
});
