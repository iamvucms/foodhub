import { useBackHandler } from '@react-native-community/hooks';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartSvg, HeartSvg, StarSvg } from '../assets/svg';
import { AmountInput, ButtonIcon, Container, FText, Padding } from '../components';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { cartStore, homeStore } from '../stores';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { uid } from 'uid';
import { observer, Observer, useLocalObservable } from 'mobx-react-lite';
import { UserActions } from '../actions';
const bannerHeight = setYAxisValue(206);
const bannerWidth = Layout.window.width - setXAxisValue(52);
const bannerRadius = setValue(10);
const targetX = 0;
const targetY = 0;
const paddingLeft = setXAxisValue(26);
const FoodDetail = ({ route, navigation }) => {
  const {
    data,
    image: { x, y, width: imgWidth, height: imgHeight }
  } = route.params;
  const { top } = useSafeAreaInsets();
  const anim = useSharedValue(0);
  const isFocused = useIsFocused();
  const localState = useLocalObservable(() => ({
    addOns: [],
    amount: 1,
    onAmountChange(value) {
      this.amount = value;
    },
    toggleAddOn(index) {
      const option = data.options[index];
      if (!option) {
        return;
      }
      const idx = this.addOns.findIndex(item => item.id === option.id);
      if (idx > -1) {
        this.addOns.splice(idx, 1);
      } else {
        this.addOns.push(option);
      }
    },
    reset() {
      this.addOns.splice(0, this.addOns.length);
      this.amount = 1;
    },
    get totalPrice() {
      return this.amount * data.price + this.addOns.reduce((acc, item) => acc + item.price, 0);
    }
  }));
  useEffect(() => {
    anim.value = 0;
    anim.value = withTiming(1);
  }, []);
  const headerStyle = useAnimatedStyle(() => {
    return {
      left: interpolate(anim.value, [0, 1], [x - paddingLeft, targetX]),
      top: interpolate(anim.value, [0, 1], [y - top, targetY]),
      width: interpolate(anim.value, [0, 1], [imgWidth, bannerWidth]),
      height: interpolate(anim.value, [0, 1], [imgHeight, bannerHeight]),
      borderRadius: bannerRadius,
      borderBottomLeftRadius: interpolate(anim.value, [0, 1], [0, bannerRadius]),
      borderBottomRightRadius: interpolate(anim.value, [0, 1], [0, bannerRadius])
    };
  });
  const informationContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: anim.value
    };
  });
  const onAddToCard = React.useCallback(() => {
    cartStore.addCartItem({
      ...data,
      id: uid(),
      product_id: data.id,
      amount: localState.amount,
      options: localState.addOns.slice() // remove reference
    });
    localState.reset();
  }, [localState.amount, data, localState.addOns]);
  const onBackPress = () => {
    const callback = () => navigation.goBack();
    anim.value = withTiming(0, {}, () => runOnJS(callback)());
  };
  useBackHandler(() => {
    isFocused && onBackPress();
    return true;
  });
  return (
    <Container>
      <View style={styles.container}>
        <Animated.View style={[styles.header, headerStyle]}>
          <Image
            source={{
              uri: data.image
            }}
            style={styles.banner}
          />
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={onBackPress} style={styles.btnBack}>
              <Image style={styles.backIcon} source={require('../assets/images/chevron-left.png')} />
            </TouchableOpacity>
            <Observer>
              {() => {
                const obserabledData = homeStore.getProduct(data.id);
                const isFavorite = !!obserabledData.favorite;
                const onPress = () => {
                  UserActions.toggleFavoriteProduct({
                    productId: obserabledData.id
                  });
                };
                return (
                  <TouchableOpacity
                    onPress={onPress}
                    style={[
                      styles.btnFav,
                      isFavorite && {
                        backgroundColor: Colors.primary
                      }
                    ]}>
                    <HeartSvg color={Colors.white} size={15} />
                  </TouchableOpacity>
                );
              }}
            </Observer>
          </View>
        </Animated.View>
        <Animated.View style={[styles.foodInformation, informationContainerStyle]}>
          <FText fontSize={28} fontWeight={600} lineHeightRatio={1.15}>
            {data.name}
          </FText>
          <View style={styles.reviewInfo}>
            <View style={{ transform: [{ translateY: setYAxisValue(-2) }] }}>
              <StarSvg size={17} color={Colors.secondary} />
            </View>
            <Padding paddingRight={8} />
            <FText fontSize={14} lineHeight={14}>
              {data.avg_rating}
            </FText>
            <Padding paddingRight={5} />
            <FText color={Colors.grey_suit} fontSize={14} lineHeight={14}>
              ({data.total_reviews})
            </FText>
            <Padding paddingRight={9} />
            <TouchableOpacity>
              <FText fontSize={13} lineHeight={13} color={Colors.primary}>
                See Review
              </FText>
            </TouchableOpacity>
          </View>
          <View style={styles.priceAndAmount}>
            <FText color={Colors.primary}>
              $
              <FText fontWeight={600} color={Colors.primary} fontSize={28}>
                {data.price}
              </FText>
            </FText>
            <Observer>{() => <AmountInput value={localState.amount} onChangeValue={localState.onAmountChange} />}</Observer>
          </View>
          <FText fontSize={15} lineHeightRatio={1.57} color={Colors.aslo_gray}>
            {data.description}
          </FText>
          <Padding paddingTop={22} />
          <FText size={18} lineHeight={18} fontWeight={600}>
            Choice of Add On
          </FText>
          <AddonList options={data.options} addOns={localState.addOns} toggleAddOn={localState.toggleAddOn} />
          <Observer>{() => <ButtonIcon onPress={onAddToCard} icon={CartSvg} text={`ADD TO CART ($${localState.totalPrice})`} />}</Observer>
        </Animated.View>
      </View>
    </Container>
  );
};

export default React.memo(FoodDetail);
const AddonList = observer(({ options, addOns, toggleAddOn }) => (
  <ScrollView style={styles.addonContainer}>
    {options.map((item, index) => (
      <Observer key={item.id}>
        {() => (
          <Pressable onPress={() => toggleAddOn(index)} style={styles.addonItem}>
            <Image
              style={styles.addonImage}
              source={{
                uri: item.image
              }}
            />
            <Padding paddingRight={15} />
            <View style={styles.addonText}>
              <FText fontSize={14} lineHeight={17}>
                {item.name}
              </FText>
            </View>
            <FText fontSize={14} lineHeight={17}>
              +${item.price}
            </FText>
            <View style={styles.checkContainer}>{addOns.find(opt => opt.id === item.id) && <View style={styles.checkInner} />}</View>
          </Pressable>
        )}
      </Observer>
    ))}
  </ScrollView>
));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: setXAxisValue(26)
  },
  header: {
    height: bannerHeight,
    width: '100%',
    borderRadius: bannerRadius,
    overflow: 'hidden'
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  headerBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: setValue(12),
    right: setValue(12),
    top: setValue(12)
  },
  btnFav: {
    height: setValue(34),
    width: setValue(34),
    borderRadius: setValue(17),
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnBack: {
    height: setValue(38),
    width: setValue(38),
    borderRadius: setValue(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  backIcon: {
    width: setXAxisValue(5),
    height: setYAxisValue(9.5)
  },
  foodInformation: {
    marginTop: setYAxisValue(22),
    flex: 1
  },
  reviewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setYAxisValue(13),
    marginBottom: setYAxisValue(16)
  },
  priceAndAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: setYAxisValue(22.4)
  },
  addonContainer: {
    flex: 1,
    marginTop: setYAxisValue(10)
  },
  addonItem: {
    height: setYAxisValue(40),
    marginBottom: setYAxisValue(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  addonImage: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: setValue(6)
  },
  addonText: {
    flex: 1
  },
  checkContainer: {
    height: setValue(21.5),
    width: setValue(21.5),
    borderRadius: setValue(10.75),
    borderWidth: 1,
    borderColor: Colors.primary,
    marginLeft: setXAxisValue(13),
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkInner: {
    width: setValue(13),
    height: setValue(13),
    borderRadius: setValue(6.5),
    backgroundColor: Colors.primary
  }
});
