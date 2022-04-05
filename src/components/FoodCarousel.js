import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import { setXAxisValue, setYAxisValue } from '../utils';
import { useNavigation } from '@react-navigation/native';

const FoodCarousel = ({ data = [], cardStyle, ...flatlistProps }) => {
  const navigation = useNavigation();
  const onItemPress = React.useCallback((item, image) => {
    navigation.navigate('FoodDetail', { data: item, image });
  }, []);
  const renderRestaurantItem = React.useCallback(({ item }) => {
    return <FoodCard onPress={onItemPress} item={item} containerStyle={[styles.foodItem, cardStyle]} />;
  }, []);
  return (
    <FlatList
      style={{ overflow: 'visible' }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderRestaurantItem}
      {...flatlistProps}
    />
  );
};

export default FoodCarousel;

const styles = StyleSheet.create({
  foodItem: {
    width: setXAxisValue(154),
    marginRight: setXAxisValue(15),
    marginBottom: setYAxisValue(15)
  }
});
