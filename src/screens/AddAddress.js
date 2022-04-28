import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ButtonIcon, Container, ErrorModal, FInput, FText, Header, LoadingIndicatorModal, Padding } from '../components';
import { isAndroid, setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../constants/colors';
import { CheckSvg, ChevronRightSvg } from '../assets/svg';
import Animated, { BounceIn } from 'react-native-reanimated';
import { UserActions } from '../actions';
import { userStore } from '../stores';

const AddAddress = ({ navigation, route }) => {
  const isEdit = !!route.params?.isEdit && !!route.params?.address;
  const editAddress = route.params?.address;
  const state = useLocalObservable(() => ({
    name: isEdit ? editAddress.name : '',
    street: isEdit ? editAddress.street : '',
    district: isEdit ? editAddress.district : '',
    province: isEdit ? editAddress.province : '',
    district_id: '',
    province_id: '',
    phone_number: isEdit ? editAddress.phone_number : '',
    selected: isEdit ? editAddress.selected : false,
    setName: name => (state.name = name),
    setStreet: street => (state.street = street),
    setDistrict: district => (state.district = district),
    setProvince: province => (state.province = province),
    setPhoneNumber: phone_number => (state.phone_number = phone_number),
    setDistrictId: district_id => (state.district_id = district_id),
    setProvinceId: province_id => (state.province_id = province_id),
    toggleSelected: () => (state.selected = !state.selected),
    get disabled() {
      return !(state.name && state.street && state.district && state.province && state.phone_number);
    }
  }));
  const onBackPress = () => navigation.goBack();
  const onLocationPress = () =>
    navigation.navigate('AddressProvinceAndDistrict', {
      province_id: state.province_id,
      district_id: state.district_id,
      callback: (province, district) => {
        state.setProvince(province.name);
        state.setDistrict(district.name);
        state.setProvinceId(province.code);
        state.setDistrictId(district.code);
      }
    });
  const onSavePress = () => {
    if (!state.name || !state.street || !state.district || !state.province || !state.phone_number) {
      return;
    }
    if (isEdit) {
      UserActions.updateAddress({
        address: {
          id: editAddress.id,
          name: state.name,
          street: state.street,
          district: state.district,
          province: state.province,
          phone_number: state.phone_number
        }
      });
    } else {
      UserActions.addAddress({
        address: {
          name: state.name,
          street: state.street,
          district: state.district,
          province: state.province,
          phone_number: state.phone_number,
          selected: state.selected
        }
      });
    }
  };
  return (
    <Container>
      <Header title="New Address" onLeftPress={onBackPress} />
      <KeyboardAwareScrollView style={styles.container}>
        <Observer>
          {() => (
            <FInput
              fontSize={15}
              value={state.name}
              onChangeText={e => state.setName(e)}
              containerStyle={styles.inputContainer}
              title="Full name"
              placeholder="Enter full name"
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <FInput
              fontSize={15}
              value={state.phone_number}
              onChangeText={e => state.setPhoneNumber(e)}
              containerStyle={styles.inputContainer}
              title="Mobile number"
              placeholder="Enter mobile number"
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <FInput
              fontSize={15}
              value={state.street}
              onChangeText={e => state.setStreet(e)}
              containerStyle={styles.inputContainer}
              title="Street"
              placeholder="Enter street (include house number)"
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <View style={styles.inputContainer}>
              <FText color={Colors.typography_60}>District & Province</FText>
              <Padding paddingBottom={10} />
              <TouchableOpacity onPress={onLocationPress} style={styles.btnLocation}>
                <FText size={15} color={Colors.typography_60}>
                  {state.district && state.province ? state.district + ', ' + state.province : 'Select District/Province'}
                </FText>
                <Padding paddingRight={7} />
                <ChevronRightSvg size={14} color={Colors.typography_60} />
              </TouchableOpacity>
            </View>
          )}
        </Observer>

        {!isEdit && (
          <Pressable onPress={() => state.toggleSelected()} style={styles.btnSetDefault}>
            <FText size={15} color={Colors.typography_60}>
              Set as default address
            </FText>
            <View style={styles.checkBox}>
              <Observer>
                {() =>
                  state.selected && (
                    <Animated.View entering={BounceIn} style={styles.checkedBox}>
                      <CheckSvg color={Colors.white} size={10} />
                    </Animated.View>
                  )
                }
              </Observer>
            </View>
          </Pressable>
        )}

        <Padding paddingTop={30} paddingBottom={isAndroid ? 15 : 0}>
          <Observer>{() => <ButtonIcon disabled={state.disabled} onPress={onSavePress} text="Save" />}</Observer>
        </Padding>
      </KeyboardAwareScrollView>
      <Observer>{() => userStore.addingAddress && <LoadingIndicatorModal />}</Observer>
      <Observer>
        {() =>
          !!userStore.addAddressError && (
            <ErrorModal onRequestClose={() => userStore.setAddAddressError(null)} error={userStore.addAddressError} />
          )
        }
      </Observer>
    </Container>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    paddingTop: setYAxisValue(34),
    paddingHorizontal: setXAxisValue(26)
  },
  inputContainer: {
    marginTop: setYAxisValue(25)
  },
  btnLocation: {
    height: setYAxisValue(65),
    borderRadius: setValue(10),
    borderColor: Colors.border,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(20)
  },
  btnSetDefault: {
    marginTop: setYAxisValue(15),
    paddingVertical: setYAxisValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkBox: {
    width: setValue(20),
    height: setValue(20),
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: setValue(2)
  },
  checkedBox: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
