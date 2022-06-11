import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue, toCorrectImageUri } from '../utils';
import { Colors } from '../constants/colors';
import { Layout } from '../constants';
import { HeartSvg } from '../assets/svg';
import FText from './FText';
import Padding from './Padding';
const { width } = Layout.window;
const RestaurantMiniCard = ({ data, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerInfor}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: toCorrectImageUri(data.logo)
            }}
          />
          <View style={styles.rating}>
            <FText color={Colors.white} fontSize={10}>
              {data.avg_rating || '--'}
            </FText>
          </View>
        </View>
        <TouchableOpacity style={styles.btnFav}>
          <HeartSvg color={Colors.white} size={15} />
        </TouchableOpacity>
      </View>
      <Padding paddingTop={15} />
      <View>
        <FText fontWeight={700}>{data.name}</FText>
        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryInfoLine}>
            <Image style={styles.deliveryIcon} source={require('../assets/images/delivery.png')} />
            <FText color={Colors.gray_80} fontSize={12} lineHeight={14}>
              {data.delivery_fee === 0 ? 'Free Delivery' : `$${data.delivery_fee}/order`}
            </FText>
          </View>
        </View>
        <View style={styles.foodCategories}>
          {data.food_categories.slice(0, 3).map((category, index) => (
            <View key={category.id} style={styles.categoryItem}>
              <FText color={Colors.typography_40} fontSize={12} lineHeight={12}>
                {category.name.toUpperCase()}
              </FText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default RestaurantMiniCard;

const styles = StyleSheet.create({
  container: {
    width: (width - setXAxisValue(52 + 15)) / 2,
    padding: setValue(18),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: setValue(18),
    marginBottom: setYAxisValue(15)
  },
  headerInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logoContainer: {
    width: setValue(50),
    height: setValue(50),
    backgroundColor: Colors.white,
    padding: setValue(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: setValue(5)
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: setValue(5)
  },
  btnFav: {
    height: setValue(26),
    width: setValue(26),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: Colors.primary
  },
  deliveryIcon: {
    width: setXAxisValue(13.78),
    height: setYAxisValue(11.43),
    marginRight: setXAxisValue(6)
  },
  timerIcon: {
    width: setXAxisValue(10.68),
    height: setYAxisValue(12.09),
    marginRight: setXAxisValue(6)
  },
  deliveryInfo: {
    marginTop: setYAxisValue(6),
    marginBottom: setYAxisValue(10)
  },
  deliveryInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: setXAxisValue(10)
  },
  foodCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryItem: {
    paddingHorizontal: setXAxisValue(6),
    paddingVertical: setYAxisValue(4),
    backgroundColor: Colors.lighter_border,
    marginRight: setXAxisValue(8),
    borderRadius: setValue(6),
    marginBottom: setYAxisValue(8)
  },
  rating: {
    position: 'absolute',
    height: setValue(20),
    width: setValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: setValue(7),
    top: setValue(-5),
    right: setValue(-5)
  }
});
