import { StyleSheet, TouchableOpacity, Image, View, ScrollView, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { Container, FInput, FoodCarousel, FoodCategoryList, FText, RestaurantCarousel } from '../components';
import { setValue, setXAxisValue, setYAxisValue, toCorrectImageUri } from '../utils';
import { Colors } from '../constants/colors';
import { ChevronRightSvg, SearchSvg } from '../assets/svg';
import { appStore, cartStore, homeStore, orderStore, userStore, useStore } from '../stores';
import { Observer, observer } from 'mobx-react-lite';
import { autorun, runInAction } from 'mobx';
import { CommonActions } from '@react-navigation/native';
import userActions from '../actions/userActions';
import homeActions from '../actions/homeActions';
import orderActions from '../actions/orderActions';
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
const Home = ({ navigation }) => {
  useEffect(() => {
    autorun(() => {
      if (!userStore.logined) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'OnboardingStack' }]
          })
        );
      }
    });
    const initActions = async () => {
      userActions.fetchUserInformation();
      homeActions.getHomeInformation();
      orderActions.fetchUserOrders();
    };
    initActions();
  }, []);
  const onAddressPress = () => navigation.navigate('UserAddress');
  const onDiscoverFoodPress = () => navigation.navigate('Discover');
  const showDrawerMenu = () => appStore.toggleDrawerMenu();
  return (
    <Container disableLast>
      <View style={styles.header}>
        <TouchableOpacity onPress={showDrawerMenu} style={styles.btnMenu}>
          <Image style={styles.menuIcon} source={require('../assets/images/horizontal-line.png')} />
        </TouchableOpacity>
        <Pressable onPress={onAddressPress} style={styles.headerTitle}>
          <Observer>
            {() => (
              <React.Fragment>
                <View style={styles.headerTitleLine1}>
                  <FText color={Colors.typography_40} fontSize="small" lineHeightRatio={1.22}>
                    Deliver to{' '}
                  </FText>
                  <Image style={styles.chevronDown} source={require('../assets/images/chevron-down.png')} />
                </View>
                <FText numberOfLines={1} fontSize={15} color={Colors.primary}>
                  {userStore.mainAddress
                    ? `${userStore.mainAddress.street}, ${userStore.mainAddress.district}, ${userStore.mainAddress.province}`
                    : 'Update Delivery Address'}
                </FText>
              </React.Fragment>
            )}
          </Observer>
        </Pressable>
        <TouchableOpacity style={styles.btnMenu}>
          <Observer>{() => <Image style={styles.avatar} source={{ uri: toCorrectImageUri(userStore.user.avatar) }} />}</Observer>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainContainer}>
        <FText color={Colors.typography_80} fontSize="h4" fontWeight={800} lineHeightRatio={1.25}>
          What would you like
        </FText>
        <FText color={Colors.typography_80} fontSize="h4" fontWeight={800} lineHeightRatio={1.25}>
          to order
        </FText>
        <View style={styles.searchInputContainer}>
          <Pressable onPress={onDiscoverFoodPress} style={{ flex: 1 }}>
            <FInput
              onPressIn={onDiscoverFoodPress}
              editable={false}
              placeholder="Find for food or restaurant..."
              icon={<SearchSvg />}
              inputContainerStyle={styles.inputContainer}
            />
          </Pressable>
          <TouchableOpacity style={styles.btnFilter}>
            <Image style={styles.filterIcon} source={require('../assets/images/filter.png')} />
          </TouchableOpacity>
        </View>
        <FoodCategoryList />
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <FText fontSize="medium" fontWeight={700}>
              Featured Restaurants
            </FText>
            <TouchableOpacity style={styles.btnViewAll}>
              <FText fontSize={13} color={Colors.primary}>
                View All{' '}
              </FText>
              <ChevronRightSvg color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <RestaurantCarousel />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <FText fontSize="medium" fontWeight={700}>
              Popular Item
            </FText>
            <TouchableOpacity style={styles.btnViewAll}>
              <FText fontSize={13} color={Colors.primary}>
                View All{' '}
              </FText>
              <ChevronRightSvg color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <FoodCarousel />
        </View>
      </ScrollView>
    </Container>
  );
};

export default observer(Home);

const styles = StyleSheet.create({
  menuIcon: {
    width: setXAxisValue(12),
    height: setYAxisValue(6)
  },
  btnMenu: {
    height: setValue(38),
    width: setValue(38),
    borderRadius: setValue(10),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,

    elevation: 6
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: setValue(10),
    backgroundColor: Colors.gray_40
  },
  chevronDown: {
    width: setValue(6.64),
    height: setValue(3.32)
  },
  headerTitleLine1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: setYAxisValue(3)
  },
  headerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(20)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(26),
    backgroundColor: Colors.white
  },
  mainContainer: {
    marginTop: setYAxisValue(30),
    paddingLeft: setXAxisValue(26),
    flex: 1,
    overflow: 'hidden'
  },
  filterIcon: {
    width: setValue(18),
    height: setValue(18)
  },
  btnFilter: {
    width: setValue(51),
    height: setValue(51),
    borderRadius: setValue(10),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
    marginLeft: setXAxisValue(15),
    marginRight: 2
  },
  inputContainer: {
    height: setYAxisValue(51)
  },
  searchInputContainer: {
    flexDirection: 'row',
    marginVertical: setYAxisValue(26),
    paddingRight: setXAxisValue(26)
  },
  sectionContainer: {
    marginTop: setYAxisValue(26)
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: setXAxisValue(26),
    marginBottom: setYAxisValue(15)
  },
  btnViewAll: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  popularItem: {
    marginTop: setYAxisValue(9)
  }
});
