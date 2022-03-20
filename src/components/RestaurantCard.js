import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import FText from './FText';
import { Colors } from '../constants/colors';
import { CircleHeartSvg, HeartSvg, StarSvg } from '../assets/svg';
const data = {
  id: 1,
  name: 'MC Donalds',
  delivery_time: '30-45 min',
  avgRate: 4.5,
  totalReviews: 25,
  cover_image: 'https://res.edu.vn/wp-content/uploads/2021/12/unit-46-topic-food.jpeg',
  food_categories: ['Burger', 'Pizza', 'Donut'],
  delivery_fee: 0,
  verifed: true
};
const RestaurantCard = ({ item = data, onPress }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={{ uri: item.cover_image }} />
      <View style={styles.headerInfo}>
        <View style={styles.reviewInfo}>
          <FText fontSize={12} lineHeight={12}>
            4.5{' '}
          </FText>
          <StarSvg color={Colors.secondary} />
          <FText color={Colors.typography_20} fontSize={8.5} lineHeight={10}>
            {' '}
            ({`${item.totalReviews}+`})
          </FText>
        </View>
        <TouchableOpacity style={styles.btnFav}>
          <HeartSvg color={Colors.white} size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <FText fontWeight={600} fontSize={15} lineHeightRatio={1}>
          {item.name}
        </FText>
        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryInfoLine}>
            <Image style={styles.deliveryIcon} source={require('../assets/images/delivery.png')} />
            <FText color={Colors.gray_80} fontSize={12} lineHeight={14}>
              {item.delivery_fee === 0 ? 'Free Delivery' : `$${item.delivery_fee}/km`}
            </FText>
          </View>
          <View style={styles.deliveryInfoLine}>
            <Image style={styles.timerIcon} source={require('../assets/images/timer.png')} />
            <FText color={Colors.gray_80} fontSize={12} lineHeight={14}>
              {item.delivery_time}
            </FText>
          </View>
        </View>
        <View style={styles.foodCategories}>
          {item.food_categories.map((category, index) => (
            <View key={category} style={styles.categoryItem}>
              <FText color={Colors.typography_40} fontSize={12} lineHeight={12}>
                {category.toUpperCase()}
              </FText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: setValue(15),
    width: setXAxisValue(266),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginRight: setXAxisValue(15),
    marginBottom: setYAxisValue(15)
  },
  headerInfo: {
    position: 'absolute',
    left: setXAxisValue(11),
    right: setXAxisValue(11),
    top: setYAxisValue(10),
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnFav: {
    height: setValue(28),
    width: setValue(28),
    borderRadius: setValue(14),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(7),
    paddingVertical: setYAxisValue(7),
    borderRadius: 99,
    backgroundColor: Colors.white
  },
  banner: {
    borderTopRightRadius: setValue(15),
    borderTopLeftRadius: setValue(15),
    height: setYAxisValue(136),
    width: setXAxisValue(266)
  },
  infoContainer: {
    padding: setValue(13)
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
    marginBottom: setYAxisValue(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  deliveryInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: setXAxisValue(10)
  },
  foodCategories: {
    flexDirection: 'row'
  },
  categoryItem: {
    paddingHorizontal: setXAxisValue(6),
    paddingVertical: setYAxisValue(4),
    backgroundColor: Colors.lighter_border,
    marginRight: setXAxisValue(8),
    borderRadius: setValue(6)
  }
});
