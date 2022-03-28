import React, { useRef } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeartSvg, StarSvg } from '../assets/svg';
import { Colors } from '../constants/colors';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import FText from './FText';
import Padding from './Padding';
const FoodCard = ({ item = data, containerStyle, bannerStyle, onPress }) => {
  const imageRef = useRef();
  const onCardPress = React.useCallback(() => {
    imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onPress &&
        onPress(item, {
          x: pageX,
          y: pageY,
          width,
          height
        });
    });
  }, []);
  return (
    <Pressable onPress={onCardPress} style={[styles.container, containerStyle]}>
      <Image ref={imageRef} style={[styles.banner, bannerStyle]} source={{ uri: item.image }} />
      <View style={styles.headerInfo}>
        <View style={styles.priceInfo}>
          <FText fontSize={15} lineHeight={15}>
            <FText color={Colors.primary} fontSize={15} lineHeight={15}>
              $
            </FText>
            {item.price}
          </FText>
        </View>
        <TouchableOpacity style={styles.btnFav}>
          <HeartSvg color={Colors.white} size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.reviewInfo}>
        <FText fontSize={12} lineHeight={12}>
          {item.avgRate}{' '}
        </FText>
        <StarSvg color={Colors.secondary} />
        <FText color={Colors.typography_20} fontSize={8.5} lineHeight={10}>
          {'  '}({`${item.totalReviews}+`})
        </FText>
      </View>
      <View style={styles.infoContainer}>
        <FText fontWeight={600} fontSize={15} lineHeightRatio={1}>
          {item.name}
        </FText>
        <Padding paddingTop={5} />
        <FText fontSize={13} color={Colors.smoky}>
          {item.short_description}
        </FText>
      </View>
    </Pressable>
  );
};

export default FoodCard;

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
    height: setValue(34),
    width: setValue(34),
    borderRadius: setValue(17),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(10),
    paddingVertical: setYAxisValue(9),
    borderRadius: 99,
    backgroundColor: Colors.white
  },
  reviewInfo: {
    height: setYAxisValue(29),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(8.5),
    borderRadius: 99,
    backgroundColor: Colors.white,
    marginLeft: setXAxisValue(13),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'flex-start',
    transform: [
      {
        translateY: setYAxisValue(-14.5)
      }
    ]
  },
  banner: {
    borderTopRightRadius: setValue(15),
    borderTopLeftRadius: setValue(15),
    height: setYAxisValue(136),
    width: '100%'
  },
  infoContainer: {
    padding: setValue(13),
    paddingTop: setYAxisValue(-14.5)
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
  }
});
