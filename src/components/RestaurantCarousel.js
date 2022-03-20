import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantCarousel = () => {
  const renderRestaurantItem = React.useCallback(({ item, index }) => {
    return <RestaurantCard />;
  }, []);
  return (
    <FlatList
      style={{ overflow: 'visible' }}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={new Array(5).fill(1)}
      renderItem={renderRestaurantItem}
    />
  );
};

export default RestaurantCarousel;

const styles = StyleSheet.create({});
