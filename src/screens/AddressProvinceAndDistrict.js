import { autorun, toJS } from 'mobx';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ArrowLeftSvg, CheckSvg, SearchSvg } from '../assets/svg';
import { Container } from '../components';
import FText, { FontWeights } from '../components/FText';
import { Colors } from '../constants/colors';
import vnAddress from '../constants/vn_address.json';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
const stepHeight = setYAxisValue(44);
const AddressProvinceAndDistrict = ({ navigation, route }) => {
  const { province_id, district_id, callback } = route.params;
  const animStep = useSharedValue(0);
  const state = useLocalObservable(() => ({
    keyword: '',
    province: vnAddress.find(item => item.code === province_id) || null,
    district: vnAddress.find(item => item.code === province_id)?.districts?.find?.(item => item.code === district_id) || null,
    type: 'province',
    get provinces() {
      return vnAddress
        .filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase()))
        .map(item => {
          item.selected = item.code === this.province?.code;
          return item;
        });
    },
    get districts() {
      if (!state.province) {
        return [];
      }
      const province = vnAddress.find(item => item.code === this.province.code);
      return province.districts
        .filter(item => item.name.toLowerCase().includes(this.keyword.toLowerCase()))
        .map(item => {
          item.selected = item.code === this.district?.code;
          return item;
        });
    },
    get currentData() {
      if (this.type === 'province') {
        return this.provinces;
      }
      return this.districts;
    },
    setType: type => (state.type = type),
    setProvince: province => (state.province = province),
    setDistrict: district => (state.district = district),
    setKeyword: keyword => (state.keyword = keyword)
  }));
  useEffect(() => {
    autorun(() => {
      if (state.type === 'province') {
        animStep.value = withTiming(0);
      } else {
        animStep.value = withTiming(1);
      }
    });
  }, []);
  const onBackPress = () => {
    navigation.goBack();
    if (callback && state.district && state.province) {
      callback(toJS(state.province), toJS(state.district));
    }
  };
  const activeStepStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: animStep.value * stepHeight
      }
    ]
  }));
  const renderLocationItem = React.useCallback(({ item }) => {
    const onPress = () => {
      if (state.type === 'province') {
        state.setProvince(item);
        state.setDistrict(null);
        state.setType('district');
      } else {
        state.setDistrict(item);
      }
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.locationItem}>
        <FText fontSize={15} color={Colors.selec}>
          {item.name}
        </FText>
        <Observer>{() => item.selected && <CheckSvg size={14} color={Colors.primary} />}</Observer>
      </TouchableOpacity>
    );
  }, []);
  const renderListHeader = () => {
    const onResetPress = () => {
      state.setKeyword('');
      state.setProvince(null);
      state.setDistrict(null);
      state.setType('province');
    };
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <FText fontSize={15} color={Colors.typography_40}>
            Selected Location
          </FText>
          <TouchableOpacity onPress={onResetPress}>
            <FText fontSize={15} color={Colors.primary}>
              Reset
            </FText>
          </TouchableOpacity>
        </View>
        <View style={styles.stepList}>
          <View style={styles.stepBar}>
            <View style={styles.stepPoint} />
            <View style={styles.stepLine} />
            <View style={styles.stepPoint} />
          </View>
          <View>
            <Pressable onPress={() => state.setType('province')} style={styles.stepItem}>
              <Observer>{() => <FText fontSize={15}>{state.province ? state.province.name : 'Select Province'}</FText>}</Observer>
            </Pressable>
            <Pressable onPress={() => !!state.province && state.setType('district')} style={styles.stepItem}>
              <Observer>{() => <FText fontSize={15}>{state.district ? state.district.name : 'Select District'}</FText>}</Observer>
            </Pressable>
          </View>
          <Animated.View style={[styles.activeStep, activeStepStyle]}>
            <View style={styles.activePointContainer}>
              <View style={styles.activePoint}>
                <View style={styles.activePointInner} />
              </View>
            </View>
            <Observer>
              {() =>
                state.type === 'province' ? (
                  <Animated.View entering={FadeIn}>
                    <FText fontSize={15} color={Colors.primary}>
                      {state.province ? state.province.name : 'Select Province'}
                    </FText>
                  </Animated.View>
                ) : (
                  <Animated.View entering={FadeIn}>
                    <FText fontSize={15} color={Colors.primary}>
                      {state.district ? state.district.name : 'Select District'}
                    </FText>
                  </Animated.View>
                )
              }
            </Observer>
          </Animated.View>
        </View>
        <View style={styles.listTitleContainer}>
          <Observer>{() => <FText fontSize={15}>{state.type === 'province' ? 'Province' : 'District'}</FText>}</Observer>
        </View>
      </View>
    );
  };
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={styles.btnBack}>
            <ArrowLeftSvg />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon}>
              <SearchSvg color={Colors.typography_20} />
            </View>
            <Observer>
              {() => (
                <TextInput
                  value={state.keyword}
                  onChangeText={e => state.setKeyword(e)}
                  style={styles.searchInput}
                  placeholderTextColor={Colors.typography_20}
                  placeholder="Search for District/Province"
                />
              )}
            </Observer>
          </View>
        </View>
        <View style={styles.listContainer}>
          {renderListHeader()}
          <View style={{ flex: 1 }}>
            <Observer>
              {() => (
                <FlatList
                  style={{
                    backgroundColor: Colors.white
                  }}
                  data={state.provinces}
                  renderItem={renderLocationItem}
                />
              )}
            </Observer>
            <Observer>
              {() => (
                <View
                  style={[
                    styles.districtList,
                    state.type === 'district' && {
                      zIndex: 99
                    }
                  ]}>
                  <FlatList data={state.districts} renderItem={renderLocationItem} />
                </View>
              )}
            </Observer>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default AddressProvinceAndDistrict;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: setYAxisValue(48),
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnBack: {
    height: '100%',
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: Colors.border,
    marginRight: setXAxisValue(26),
    borderRadius: setValue(5),
    paddingRight: setXAxisValue(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    fontFamily: FontWeights[400],
    fontSize: setYAxisValue(15),
    flex: 1
  },
  searchIcon: {
    height: '100%',
    aspectRatio: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    paddingTop: setYAxisValue(24)
  },
  stepContainer: {},
  stepHeader: {
    paddingHorizontal: setXAxisValue(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  stepItem: {
    height: stepHeight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepList: {
    marginTop: setYAxisValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(26)
  },
  stepBar: {
    width: setValue(44),
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepPoint: {
    width: setValue(8),
    height: setValue(8),
    borderRadius: 99,
    backgroundColor: Colors.gray_40
  },
  stepLine: {
    height: stepHeight - setValue(16),
    marginVertical: setYAxisValue(5),
    width: 1,
    backgroundColor: Colors.gray_40
  },
  activeStep: {
    position: 'absolute',
    height: stepHeight,
    flexDirection: 'row',
    alignItems: 'center',
    left: setXAxisValue(26),
    right: setXAxisValue(26),
    top: 0,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.white
  },
  activePointContainer: {
    width: setValue(44),
    height: setValue(44),
    justifyContent: 'center',
    alignItems: 'center'
  },
  activePoint: {
    padding: setValue(3),
    borderRadius: 99,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  activePointInner: {
    width: setValue(10),
    height: setValue(10),
    borderRadius: 99,
    backgroundColor: Colors.primary
  },
  listTitleContainer: {
    paddingHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(15),
    backgroundColor: Colors.border,
    marginTop: setYAxisValue(7.5)
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(14),
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5
  },
  districtList: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white,
    zIndex: -99
  }
});
