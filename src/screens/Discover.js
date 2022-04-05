import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { Container, FInput, FoodCard, Header, Padding, RestaurantMiniCard } from '../components';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { SearchSvg } from '../assets/svg';
import { Colors } from '../constants/colors';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Layout } from '../constants';
import FText, { FontWeights } from '../components/FText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    options: []
  },
  {
    id: 6,
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
const restaurantData = [
  {
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    name: 'MC Donalds',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEW/DAz7xAD///+7AAC+AAC9AAy+AAz+ywD9yAD/zAD02tq6AA3LS0v++fnghQi/CQn78PDaiorXe3vCFxf66+vrnAX5vQH0sQPLQQrWZQn3uALolQbZbAjJQUHy1NTvy8vuowT35OTHNjbPXV3hnp7elZXUcXHns7Pux8fQUgrwqQTffgfTXQnkjAbacgjhhAfEISHkp6fFKwvJOwrRZmbqu7vFLS3LRkbRVgnKPgrCIQzMUVHZgoLcj4/EJyfQYGCBDYfmAAAN+klEQVR4nO1ciVbbuhYlsew4mNQhTGlpkiaEAG3pJZShr0z//1dPsqZzZNkSXLDz1tNed11IouFs6cwO3doKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAioQRLHcdLAnJaQZPH489ef4zjzF5jN+fn186vmtIUkGx+kvR777+DCU94ku1BzxpvOMb7+3k87HGn/aJx5zMnGR2DO9+v4w6X8F8h+9aSsXN5Lp20l8WUfzen98jmWlpAd9zsYvaOknmKSHPWMOf3jjaWYfTOFpVdy+LeOYvL3MC3N6X3bUIrZQZkgo7hVTTHZshCkFA82kmL2SRFM+6m2rfRLDcMvqXVO73IDKcaflQ32Pl3H14BvpdJl39KKOf3PG+dRk2t9Gyym0biole6HnWL2Q6u1mKMXud60uJgdSeF6Y3788W8lbn9su5F4rG49/S3mjCXn9GjD9DRW16EvTOttemhlqLyM1kkaUNU6G6WnyV/b2WszSy2eI7tUnwJDBbqwUXqqufTHWi7Nu9P7bYqb/NYfgpCZKNWtdlAtIL6wi5V9Utf03RQ3+26/YHBYF5ujp1q14BWygK6dzR8sbvxHuxmUEoBL/LIxlxj/VEIZHjA7TivEzVSsT400FBzXz025RC1tzwjUyW+dBqCP4s86uBsmqj/amEvUV9hJzUPX1tZB4oIrLFlorFV7Qy5Rq1V6bEoUf9UeE4gb/9Rvfy3N0aq9GWFfu4ZO76IUwhKdhx3Zol6nV55yoTV4vAkxMTvQBVBZqcCnWlxwKLaoF6v10k0oo0BYLyspcilaXEDb9E3FnGP9cW393AziH1ocq2PQNyzFBYdCg6FlSW2l6QZkp9mhZmA7b+BNpbjgUMqelCHRJ3DYupoCt2CXNv6VmuKCQ0l/2e4InIrFeTUMYFJ2jQJBn2aaTNzkArxTysgZ4CW37msSYGZ2156pAcIVAUfS6VjlT8bAUFu+Q+AqbbGiGAKiSae4Q0D5oGKOHmJztk0C9JKq6jloiMzbAk9ZYYZeyzYGLX2VY4eGyKwKZgh2M0SGaI0nzQEqaaXXAyrHUvMYKG2FYkMP3bKawvvoVQ76htT0D1DSSg0EEbFdbwruo7qYQyp3nB27FRtWV9UX3QSgMtmSUg54azTo63Df6f2pnAPOoc2gH1+C+6hwi/QccvDMrQc8aadfmVdDB5xetneJ2RcgenUpB6+tg36vtDAY8zvtNTOSayBGjVOHrgaiNtSBKe31hkGLorYIiP+pYPhPtfoh9Sg1OpoCzMeq8q9iHEztAOoine/aHwuQU9feB2jgY4YVGQ0DvveWDDG5Rj6y5pyTCi2tMa8Y+dyWDDH+CgSvyjALoPitCdb5SJjNdtKWDBHVebVlHCqg9JRa84L33pYhojBXG7PszrTOdLEzbalbAztmjirO7kzriwYURNtpKiJfUJ9ZoQxFi13b0IYZYb0f+zDEn6ClVGalHOa3wRj69cv/gst/aoMhaPk58//4sEzQURXBuqWiUfnRyKD3cKSO4EmMlrr+wRJKeluJ+Sje29vdGrZw4QoBCWTYRsxHjsblzpHNSoaOsg8FozaaNSjGuewEuQ05x+GckJ3Xx86PAYpX1S0MDtTIkNdS2cIQc1DK1ELXFLlH1xHbqou6yqLYACVC1u+NfTCgzK7UOPlr0VJHnoIS++pe5YcBhSunxuE2sGDomoI0u/mGGz7h2tqJAeXRHK7+EqqfWiigUNpIM2PHcOQYucjONOUvsoPGW4pG/8ylQuWQ7675EjS8cWeK4rG7fsNX7ncpr9zivYFyKrfGwWcXYo7zWxZYsx154bsDBzi3xpVrYHcehjXbFT7fGzgrdWtcOalxBhjTmTVcBONE061x5Sq/vsIv9kCa7Upj3xv4fN2741qLwV0PGafYcLjAwcJHg0p/oeacYVhCw+EC5ygeKVXSMeGeghLDpp+xxUhYDz9X6tS4iwWzIGk4qUFm1c+d40uJqceV5HiT9xDbG8bx9t3HayamPt2zGDFsNiCa4c0trfkc2MdxZGiGO4C+J3Dt5KNxZurt87AFa3az9RPuMPh8pd5MvV2dHQbcZW22GWUEfB+bMh4/+ciLbbfZkI+tykfjzOLC5wvcWLObDfmG/nhonNkx9UkzUT+x4T8vwcWpj/4YvsnLbxi222gNjFtnPjaFk0y/VNawXVdz7l2R4609NM5IMr26g4Zmp+7M6d1gPPny0TizQPRiiDW7yS9/Jf9B4vo8GCox9PibLaP10ftPgwyxyvnYlFko+Ihr2G6TbW/zcD22NhTbS+XMg2zwGaJpIB4ah76b4stw/Gpzfy8YTs6rrskNhq7nAFslzW6yF2WkYF4P2U2GHq7faF81mXobyYYXQ+P7iT5/zmQybDD1xgmj33ey3sIQ265P+vteMMpZr7/bMZ6R+qVgeJsGv6FotCS8GGb/nmGD5ZPZVvKJxCZDH2lxk7XJr36ZX+JqiGGDBaLZ/PTRuLcwxH3nJrveMWbo9V2XNzHEjfIvDfpSvLMfQ3wfXl82fMs+7wNzZ69/4bLXh+h5zWmPYef1DLfymlcVMBg2+GzmTQzfgBYZYq/xYT7O8NkNtqL+Dxj2WmHYCwzfD0k/Beh9IMMe3KjfYK/t8hPEh/0rOfEPtM9lgw+BY4z/+X0CAgICAgICAgICAgLehEggxy+Jc4IYVz3wdcit+xK5i0OoGkTbXQ5SUIzOxcurqtWiQVdhML99vHrbviZywtfdRauRB77RZLf48fiWrZTAD2x2Hg3FyxsfhgVuKw/jNchJt47hI/v/MHrDd8HIQgq6jNjLO/RS7k61RK1dYkhPA4zFgzEH8336jnrPZMhHY4a7xT55Tip2sDMcSTGnBcNH+XImpc5JRK4miy1pBRaG3REavFjsKZMRdsR+2VqwRXI9MiJ3k8UV4WMxQ7oMG00QwwHlFdFP9haTu9zbKKMzJSY7l+hWvhqIYyJkNCs4DW9PikVtDLsLIvis5OCHYjA5uWVYk2g0Z+/vL3M58uZWGMT+2QPlDRnS0YV3mD9GkCFVq2jvacr3H96++HFUjoYbojJDKXT0ot/pbrP3BMPBcr1eT9UnxSVGD/t68PSOKBXZj2bq5O4L5vdzeEAzkgOGhCihphPBkHkayvwUztr2cQBy3S4/Im2VVPOKC9vtItBTEAyHhfbdSVl2GPcRHkzfEwzna/3uIM+3yASPpCekGeYEsBe/3j8sT1cEKByXwcMcyQ7cZYsAQmfMeFaGJN07ohhyZdtXo8lNeTAZme91u2vKRt71UKr8iiiGJg+GHeaTyIl4NZB6dRa5CCJK1BBVNOSE1Q0PZjMhynmEGKozmEcyoHWH51Ilp5GN4TAiL4Ir9Yo3A7GuZBgpdz49VxayUyiUcBIn1NssuVzuS9Sehc8ERkdnR3wdqr/Ucwnye5ihOgQiB6/ZYMHxRSnu9J5cSVW9ivhvM+pZ82glTkgxFMO2mRuWUzhDbhLb1DXnEVffidMSI2jwy2gBz3oiCc+YiyfiikaYoVrhWQyewsHnkuF+RM1LasiEnIwYqHj0zRs5QDIUC7J0MI+mkKF4sWQBZu+K4tmppPIGtgf8cLjOigt4jO75Lyc8RD2eMryYDIWvWYjT4bmQOPyBZFi4LanR3Kh4orkYDQ2G4ic3MT1FL8okXN48s9keZijCzZqfmzjkldxDhH8VGblkdoZ3Yhb34NLrPAuGReiRu+0Ud7d4PJvq4KIZCjNc8XWeAUP5gmMwG3kERCLiyy53X/fFjgOx1zyymnOFluZPcDAR178jGO6xd6Xj3qH39wQiJ2Y4AZyUku2gc1OTPMxQWMYJvwDOaCb9jXBYwzqGytNEVoYPdoY6pFMxDYYLMdPCkN7iGcqoBnsuijKa7e2BaU/KvMUNSy3llmOPFtvS4va4/Yh4sLAyVEFpez16Nj1Nzn+OuD3vIYYsX3041UGke+uwRHLVFdJCnzqRFr17A5eP1vvz+Xx/bY/460iIz92STK+IlaHYdn7HDkzmdcqX8vWFpzlBIkjcjcQluAKi1OuZDjxFQBb3ckvAQcnK8RRlbROpbgsZIMRgfmLTyMbwXqx/VzjIpclwKmSHQZ57mjOG2wXLXKUaOBjqiC61qhBRFokqX14xMiKXupOZ9/lspn3heaSqlGKwOLCRnSHw0bnwxYDhrjr2KJJZI48W+2KEFt11h5LBDQEZ+Egl112Vtc6WIp6wfW3VE40RypfPTpfb8oisWirv8IlxOFVDJUNhiN3heqkqEs5QnOELnbbDpZg67FA6TSpfpAoh6irkixOgvAIq80YojE94U4AHUmuH1NGcqRRcR3xcIgGGqiLZV8rzUu9LpTay9oeMjDQK6uThNEJ5K1+xzHCww0/SLApo5W9nCBN8uYauLXJQs3aHQ81wq8TdVVvI7VnDQp3POoIf5GjRfUbFZDhYqoYiusXBC1gJMaRXOwfD+M+JroBzohSqO4EMTTU5dWVt5HS7wBPLccm0+H3OFI5M5sWLGStrr9ZCl7cfCypiYIHp+ZIWJNrY9eD5KR+84itxhvfFi/k9zf3WwiPTLLpYb75L+P6jIuHmPY/ubBHNxBSxwfNaKuj+8tkjLQVN2Bx2gsUHIuRFi5vR6mQrEn7L6AjnxoqL1eMjzYtRmhDlxn50t53V6GZR1E9iHdgRJtHdzeiGtWKNPjFd4uphNVo97L2xP1xxEuQV/TuenzuH5Y5h1R9HvADwFCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgc/Ff1wAKg8XPESwAAAAASUVORK5CYII=',
    delivery_time: '30-45 min',
    avgRate: 4.5,
    address: '123 Main St, New York, NY 10001',
    totalReviews: 25,
    cover_image: 'https://res.edu.vn/wp-content/uploads/2021/12/unit-46-topic-food.jpeg',
    food_categories: ['Burger', 'Pizza', 'Donut'],
    delivery_fee: 0,
    verifed: true
  },
  {
    id: 5,
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
  }
];
const { width } = Layout.window;
const tabItemWidth = (width - setXAxisValue(52 + 12)) / 2; //50% screen width subtracting padding and margin
const Discover = ({ navigation }) => {
  const onLeftPress = () => navigation.goBack();
  const animTab = useSharedValue(0);
  const listRef = useRef();
  const { bottom } = useSafeAreaInsets();
  const localState = useLocalObservable(() => ({
    keyword: '',
    setkeyword: keyword => {
      localState.keyword = keyword;
    },
    get foodItems() {
      return foodData.filter(item => item.name.toLowerCase().includes(localState.keyword.toLowerCase()));
    },
    get restaurantItems() {
      return restaurantData.filter(item => item.name.toLowerCase().includes(localState.keyword.toLowerCase()));
    }
  }));
  const renderHeaderRight = () => (
    <Image
      source={{
        uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
      }}
      style={styles.avatar}
    />
  );
  const onRightPress = () => {
    //navigate
  };
  const onFoodItemPress = (item, image) => {
    navigation.navigate('FoodDetail', { data: item, image });
  };
  const renderFoodItem = ({ item, index }) => {
    const marginRight = index % 2 === 0 ? setXAxisValue(15) : 0;
    const translateY = index % 2 === 0 ? setYAxisValue(80) : 0;
    return (
      <FoodCard onPress={onFoodItemPress} containerStyle={[styles.foodItem, { marginRight, transform: [{ translateY }] }]} item={item} />
    );
  };
  const renderRestaurantItem = ({ item, index }) => {
    const marginRight = index % 2 === 0 ? setXAxisValue(15) : 0;
    const translateY = index % 2 === 0 ? setYAxisValue(80) : 0;
    return (
      <RestaurantMiniCard
        onPress={onFoodItemPress}
        containerStyle={[styles.foodItem, { marginRight, transform: [{ translateY }] }]}
        data={item}
      />
    );
  };
  const onTabPress = index => {
    animTab.value = withTiming(index);
    listRef.current?.scrollTo?.({
      x: width * index
    });
  };
  const activeTabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(animTab.value, [0, 1], [0, tabItemWidth]) }]
  }));
  const tab1NameStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animTab.value, [0, 1], [Colors.white, Colors.primary])
  }));
  const tab2NameStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animTab.value, [0, 1], [Colors.primary, Colors.white])
  }));
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      animTab.value = event.contentOffset.x / width;
    }
  });
  const renderListFooter = () => <Padding paddingBottom={bottom + 80} />;
  return (
    <Container disableLast>
      <Header title="Search Food" rightIcon={renderHeaderRight} onRightPress={onRightPress} onLeftPress={onLeftPress} />
      <View style={styles.mainContainer}>
        <View style={styles.searchInputContainer}>
          <View style={{ flex: 1 }}>
            <Observer>
              {() => (
                <FInput
                  autoFocus
                  value={localState.value}
                  onChangeText={e => localState.setkeyword(e)}
                  placeholder="Find for food or restaurant..."
                  icon={<SearchSvg />}
                  inputContainerStyle={styles.inputContainer}
                />
              )}
            </Observer>
          </View>
          <TouchableOpacity style={styles.btnFilter}>
            <Image style={styles.filterIcon} source={require('../assets/images/filter.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabSwitcher}>
          <Pressable onPress={() => onTabPress(0)} style={styles.tab}>
            <Animated.Text style={[styles.tabName, tab1NameStyle]}>Foods</Animated.Text>
          </Pressable>
          <Pressable onPress={() => onTabPress(1)} style={styles.tab}>
            <Animated.Text style={[styles.tabName, tab2NameStyle]}>Restaurants</Animated.Text>
          </Pressable>
          <Animated.View style={[styles.tab, styles.activeTab, activeTabStyle]}></Animated.View>
        </View>
        <Animated.ScrollView
          keyboardShouldPersistTaps="handled"
          ref={listRef}
          scrollEventThrottle={20}
          onScroll={scrollHandler}
          pagingEnabled
          style={styles.horizontalContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.listPage}>
            <Observer>
              {() => (
                <FlatList
                  style={styles.list}
                  ListHeaderComponent={() => (
                    <View style={styles.searchResult}>
                      <FText fontSize="h3">Found</FText>
                      <FText fontSize="h4">{`${localState.foodItems.length}`} Results</FText>
                    </View>
                  )}
                  ListFooterComponent={renderListFooter}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={localState.foodItems.slice()}
                  renderItem={renderFoodItem}
                />
              )}
            </Observer>
          </View>
          <View style={styles.listPage}>
            <Observer>
              {() => (
                <FlatList
                  style={styles.list}
                  ListHeaderComponent={() => (
                    <View style={styles.searchResult}>
                      <FText fontSize="h3">Found</FText>
                      <FText fontSize="h4">{`${localState.restaurantItems.length}`} Results</FText>
                    </View>
                  )}
                  ListFooterComponent={renderListFooter}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={localState.restaurantItems.slice()}
                  renderItem={renderRestaurantItem}
                />
              )}
            </Observer>
          </View>
        </Animated.ScrollView>
      </View>
    </Container>
  );
};

export default Discover;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  avatar: {
    height: setValue(38),
    width: setValue(38),
    borderRadius: setValue(10)
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
    marginHorizontal: setXAxisValue(26)
  },
  tabSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(6),
    marginHorizontal: setXAxisValue(26),
    borderRadius: 99,
    borderColor: Colors.border,
    borderWidth: setValue(1),
    paddingVertical: setYAxisValue(4)
  },
  tab: {
    height: setYAxisValue(47),
    width: tabItemWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeTab: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    zIndex: -1,
    left: setXAxisValue(6),
    borderRadius: 99
  },
  tabName: {
    fontFamily: FontWeights['400'],
    fontSize: setYAxisValue(14),
    lineHeight: setYAxisValue(14)
  },
  listPage: {
    width,
    flex: 1,
    paddingHorizontal: setXAxisValue(26),
    paddingTop: setYAxisValue(25)
  },
  list: {
    overflow: 'visible'
  },
  foodItem: {
    width: (width - setXAxisValue(52 + 15)) / 2,
    alignSelf: 'flex-start'
  },
  searchResult: {
    height: setYAxisValue(80),
    width: (width - setXAxisValue(52 + 15)) / 2,
    marginBottom: setYAxisValue(-80),
    justifyContent: 'center'
  }
});
