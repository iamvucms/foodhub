import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { BackButton, Container, FoodCard, FText, Padding } from '../components';
import { FoodCategories, SortTypes } from '../constants/data';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import { Layout } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDecay, withDelay, withTiming } from 'react-native-reanimated';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { DiscoverActions } from '../actions';
import { discoverStore } from '../stores';
import { autorun } from 'mobx';
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
    options: []
  }
];
const sortTypes = Object.values(SortTypes);
const SortTypeListHeight = setYAxisValue(90);
const CategoryDetail = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const category = FoodCategories.find(category => category.id === categoryId);
  if (!category) {
    return null;
  }
  const state = useLocalObservable(() => ({
    sortType: SortTypes.Popular,
    setSortType: value => {
      state.sortType = value;
    }
  }));
  const sortTypeAnim = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();
  useEffect(() => {
    DiscoverActions.fetchCategoryProducts(categoryId);
    let to = null;
    autorun(() => {
      const { orderBy, orderType } = state.sortType;
      clearTimeout(to);
      to = setTimeout(() => {
        DiscoverActions.fetchCategoryProducts(categoryId, false, orderBy, orderType);
      }, 300);
    });
  }, []);
  const sortTypeListStyle = useAnimatedStyle(() => ({
    height: interpolate(sortTypeAnim.value, [0, 1], [0, SortTypeListHeight])
  }));
  const toggleShowTypeList = () => {
    sortTypeAnim.value = withTiming(sortTypeAnim.value === 1 ? 0 : 1);
  };
  const onItemPress = React.useCallback((item, image) => {
    navigation.navigate('FoodDetail', { data: item, image });
  }, []);
  const renderFoodItem = ({ item }) => (
    <FoodCard onPress={onItemPress} bannerStyle={styles.foodCardBanner} containerStyle={styles.foodCard} item={item} />
  );
  const renderSortTypeItem = item => (
    <Observer key={item.name}>
      {() => {
        const onPress = () => {
          state.setSortType(item);
          sortTypeAnim.value = withDelay(200, withTiming(0));
        };
        const isSelected = item.name === state.sortType.name;
        return (
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.sortTypeItem,
              isSelected && {
                backgroundColor: Colors.primary
              }
            ]}>
            <FText color={isSelected ? Colors.white : Colors.typography_60} fontSize="small" lineHeight={14}>
              {item.name}
            </FText>
          </TouchableOpacity>
        );
      }}
    </Observer>
  );
  const renderListHeader = () => (
    <React.Fragment>
      <View style={styles.header}>
        <FText color={Colors.primary} fontSize={50} fontWeight={700} lineHeightRatio={1.1}>
          {category.name}
        </FText>
        <Padding paddingTop={19} />
        <Observer>
          {() => (
            <FText color={Colors.grey_suit} fontSize={19} lineHeightRatio={1.2}>
              {discoverStore.categoryProducts.length} results of {category.name}
            </FText>
          )}
        </Observer>
        <View style={styles.bannerContainer}>
          <Image style={styles.banner} source={category.banner} />
        </View>
      </View>
      <Padding paddingTop={40} />
      <View style={styles.categoryFilter}>
        <View style={styles.sortBy}>
          <FText fontSize="small" lineHeight={14}>
            Sort By:
          </FText>

          <TouchableOpacity onPress={toggleShowTypeList} style={styles.sortByType}>
            <Padding paddingRight={10} />
            <Observer>
              {() => (
                <FText color={Colors.primary} fontSize="small" lineHeight={14}>
                  {state.sortType.name}{' '}
                </FText>
              )}
            </Observer>
            <Image style={styles.sortByArrow} source={require('../assets/images/chevron-down.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnFilter}>
          <Image style={styles.filterIcon} source={require('../assets/images/filter.png')} />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.sortTypeList, sortTypeListStyle]}>{sortTypes.map(renderSortTypeItem)}</Animated.View>
      <Padding paddingTop={30} />
    </React.Fragment>
  );
  const renderListFooter = () => <Padding paddingBottom={bottom} />;
  return (
    <Container disableLast disableFirst>
      <BackButton />
      <View style={styles.mainContainer}>
        <Observer>
          {() => (
            <FlatList
              ListHeaderComponent={renderListHeader}
              renderItem={renderFoodItem}
              data={discoverStore.categoryProducts.slice()}
              ListFooterComponent={renderListFooter}
              keyExtractor={item => item.id}
            />
          )}
        </Observer>
      </View>
    </Container>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  header: {
    paddingTop: setYAxisValue(150),
    paddingHorizontal: setXAxisValue(26)
  },
  bannerContainer: {
    position: 'absolute',
    right: 0,
    zIndex: 99
  },
  banner: {
    height: setValue(320),
    width: setValue(320)
  },
  foodCardBanner: {
    height: setYAxisValue(165)
  },
  mainContainer: {
    flex: 1
  },
  categoryFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(26),
    zIndex: 99
  },
  sortBy: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sortByType: { flexDirection: 'row', alignItems: 'center' },
  sortByArrow: {
    width: setXAxisValue(6),
    height: setYAxisValue(3)
  },
  btnFilter: {
    padding: setValue(7)
  },
  filterIcon: {
    width: setValue(18),
    height: setValue(18)
  },
  foodCard: {
    width: Layout.window.width - setXAxisValue(52),
    marginHorizontal: setXAxisValue(26),
    marginBottom: setYAxisValue(20)
  },
  sortTypeList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(26),
    height: SortTypeListHeight,
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  sortTypeItem: {
    paddingHorizontal: setXAxisValue(10),
    paddingVertical: setYAxisValue(7),
    marginRight: setXAxisValue(10),
    marginBottom: setYAxisValue(10),
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white
  }
});
