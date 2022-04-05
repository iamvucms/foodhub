import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Container, FoodCard, FoodCarousel, FText, ListPicker, Padding } from '../components';
import Animated, { BounceIn, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Layout } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { StarSvg } from '../assets/svg';
import { Observer, useLocalObservable } from 'mobx-react-lite';
const foodData = [
  {
    id: 1,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    tag: ['Burger'],
    options: [
      {
        id: 1,
        name: 'Pepper Julienned',
        price: 2.5,
        image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg'
      },
      {
        id: 2,
        name: 'Baby Spinach',
        price: 4.5,
        image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg'
      },
      {
        id: 3,
        name: 'Masroom',
        price: 4.5,
        image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    tag: ['Pizza'],
    options: []
  },
  {
    id: 3,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    tag: ['Pizza', 'Donut'],
    options: []
  },
  {
    id: 4,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    tag: ['Pizza', 'Donut'],
    options: []
  },
  {
    id: 5,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: 'https://www.kitchensanctuary.com/wp-content/uploads/2020/07/Chicken-Tikka-Skewers-square-FS-77.jpg',
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    tag: ['Pizza', 'Donut', 'Burger'],
    options: []
  }
];
const bannerHeight = setYAxisValue(156);
const bannerWidth = Layout.window.width - setXAxisValue(52);
const bannerRadius = setValue(10);
const targetX = 0;
const targetY = 0;
const paddingLeft = setXAxisValue(26);
const RestaurantDetail = ({ navigation, route }) => {
  const {
    data,
    image: { x, y, width: imgWidth, height: imgHeight }
  } = route.params;
  const { top } = useSafeAreaInsets();
  const animHeader = useSharedValue(0);
  const localState = useLocalObservable(() => ({
    category: 'All',
    setCategory: category => {
      localState.category = category;
    },
    get filterdFoodItems() {
      return foodData.filter(item => {
        if (localState.category === 'All') {
          return true;
        }
        return item.tag.includes(localState.category);
      });
    }
  }));
  useEffect(() => {
    animHeader.value = 0;
    animHeader.value = withTiming(1);
  }, []);
  const onBackPress = () => {
    const callback = () => navigation.goBack();
    animHeader.value = withTiming(0, {}, isFinished => isFinished && runOnJS(callback)());
  };
  const onSeeReviewPress = () =>
    navigation.navigate('RestaurantReviews', {
      data
    });
  const headerStyle = useAnimatedStyle(
    () => ({
      left: interpolate(animHeader.value, [0, 1], [x, targetX + paddingLeft]),
      top: interpolate(animHeader.value, [0, 1], [y - top, targetY]),
      width: interpolate(animHeader.value, [0, 1], [imgWidth, bannerWidth]),
      height: interpolate(animHeader.value, [0, 1], [imgHeight, bannerHeight]),
      borderRadius: bannerRadius,
      borderBottomLeftRadius: interpolate(animHeader.value, [0, 1], [0, bannerRadius]),
      borderBottomRightRadius: interpolate(animHeader.value, [0, 1], [0, bannerRadius])
    }),
    []
  );
  const inforContainerStyle = useAnimatedStyle(() => ({
    opacity: animHeader.value
  }));
  const renderFoodCategoryItem = category => {
    return (
      <View key={`cat_${category}`} style={styles.foodCategory}>
        <FText color={Colors.typography_40} fontSize={12} fontWeight={700}>
          {category.toUpperCase()}
        </FText>
      </View>
    );
  };
  const onFoodCardItemPress = (item, image) => {
    navigation.navigate('FoodDetail', {
      data: item,
      image
    });
  };
  const renderFoodItem = ({ item, index }) => {
    const marginRight = index % 2 === 0 ? setXAxisValue(15) : 0;
    return <FoodCard onPress={onFoodCardItemPress} item={item} containerStyle={[styles.miniFoodCard, { marginRight }]} />;
  };
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.headerContainer}>
          <Animated.View style={[styles.header, headerStyle]}>
            <Image
              source={{
                uri: data.cover_image
              }}
              style={styles.banner}
            />
            <TouchableOpacity onPress={onBackPress} style={styles.btnBack}>
              <Image style={styles.backIcon} source={require('../assets/images/chevron-left.png')} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={BounceIn}>
            <View style={styles.logoContainer}>
              <Image source={{ uri: data.logo }} style={styles.logo} />
            </View>
          </Animated.View>
        </View>
        <Animated.View style={[styles.restaurantInfo, inforContainerStyle]}>
          <FText fontWeight={700} fontSize="h6">
            {data.name}
          </FText>
          <Padding paddingTop={10} />
          <FText fontSize={14} color={Colors.grey_suit}>
            {data.address}
          </FText>
          <View style={styles.foodCategories}>{data.food_categories.map(renderFoodCategoryItem)}</View>
          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryInfoLine}>
              <Image style={styles.deliveryIcon} source={require('../assets/images/delivery.png')} />
              <FText color={Colors.gray_80} fontSize={14} lineHeight={14}>
                {data.delivery_fee === 0 ? 'Free Delivery' : `$${data.delivery_fee}/km`}
              </FText>
            </View>
            <View style={styles.deliveryInfoLine}>
              <Image style={styles.timerIcon} source={require('../assets/images/timer.png')} />
              <FText color={Colors.gray_80} fontSize={14} lineHeight={14}>
                {data.delivery_time}
              </FText>
            </View>
          </View>
          <View style={styles.reviewInfo}>
            <StarSvg size={24} color={Colors.secondary} />
            <Padding paddingRight={5} />
            <FText fontSize={14} lineHeight={14}>
              {data.avgRate}{' '}
              <FText color={Colors.grey_suit} fontSize={14} lineHeight={14}>
                ({data.totalReviews}+){' '}
              </FText>
            </FText>
            <TouchableOpacity onPress={onSeeReviewPress}>
              <FText color={Colors.primary} fontSize={14} lineHeight={14}>
                See Reviews
              </FText>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={[styles.foodItems, inforContainerStyle]}>
          <FText fontSize="large" fontWeight={700}>
            Featured Items
          </FText>
          <Padding paddingTop={10} />
          <FoodCarousel cardStyle={styles.foodCard} data={foodData} />
        </Animated.View>
        <Animated.View style={[styles.categoryList, inforContainerStyle]}>
          <Observer>
            {() => (
              <ListPicker
                data={['All', ...data.food_categories]}
                value={localState.category}
                onChange={category => localState.setCategory(category)}
              />
            )}
          </Observer>
          <Padding paddingTop={10} />
          <Observer>
            {() => <FlatList scrollEnabled={false} numColumns={2} data={localState.filterdFoodItems.slice()} renderItem={renderFoodItem} />}
          </Observer>
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    overflow: 'hidden'
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  btnBack: {
    position: 'absolute',
    left: setValue(15),
    top: setValue(15),
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
  logoContainer: {
    position: 'absolute',
    zIndex: 99,
    height: setValue(100),
    width: setValue(100),
    borderRadius: 99,
    backgroundColor: Colors.white,
    bottom: setValue(-50),
    alignSelf: 'center',
    padding: setValue(10)
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 99
  },
  headerContainer: {
    paddingBottom: setYAxisValue(65)
  },
  restaurantInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodCategories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setYAxisValue(15)
  },
  foodCategory: {
    padding: setValue(4),
    borderRadius: setValue(4),
    marginHorizontal: setXAxisValue(5),
    backgroundColor: Colors.lighter_border
  },
  deliveryIcon: {
    width: setXAxisValue(15),
    height: setYAxisValue(13),
    marginRight: setXAxisValue(6)
  },
  timerIcon: {
    width: setXAxisValue(13),
    height: setYAxisValue(15),
    marginRight: setXAxisValue(6)
  },
  deliveryInfo: {
    marginTop: setYAxisValue(10),
    marginBottom: setYAxisValue(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  deliveryInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: setXAxisValue(10)
  },
  reviewInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  foodItems: {
    paddingTop: setYAxisValue(30),
    paddingHorizontal: setXAxisValue(26)
  },
  foodCard: {
    width: setValue(266)
  },
  categoryList: {
    marginHorizontal: setXAxisValue(26),
    marginTop: setYAxisValue(30)
  },
  miniFoodCard: {
    width: (Layout.window.width - setXAxisValue(52 + 15)) / 2
  }
});
