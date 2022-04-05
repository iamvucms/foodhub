import { StyleSheet, Image, View, TouchableOpacity, Pressable } from 'react-native';
import React, { useRef } from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import FText from './FText';
import { Colors } from '../constants/colors';
import { CircleHeartSvg, HeartSvg, StarSvg } from '../assets/svg';
const data = {
  id: 1,
  name: 'MC Donalds',
  logo: 'data:image/png;base64,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',
  delivery_time: '30-45 min',
  avgRate: 4.5,
  address: '123 Main St, New York, NY 10001',
  totalReviews: 25,
  cover_image: 'https://res.edu.vn/wp-content/uploads/2021/12/unit-46-topic-food.jpeg',
  food_categories: ['Burger', 'Pizza', 'Donut'],
  delivery_fee: 0,
  verifed: true
};
const RestaurantCard = ({ item = data, onPress }) => {
  const imageRef = useRef();
  const onCardPress = React.useCallback(() => {
    imageRef.current?.measure?.((x, y, width, height, pageX, pageY) => {
      onPress && onPress(item, { x: pageX, y: pageY, width, height }); //cover photo position and size
    });
  }, []);
  return (
    <Pressable onPress={onCardPress} style={styles.container}>
      <Image ref={imageRef} style={styles.banner} source={{ uri: item.cover_image }} />
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
    </Pressable>
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
