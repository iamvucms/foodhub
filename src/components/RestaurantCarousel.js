import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { useNavigation } from '@react-navigation/native';

const RestaurantCarousel = () => {
  const navigation = useNavigation();
  const onItemPress = React.useCallback((item, image) => {
    navigation.navigate('RestaurantDetail', {
      data: item,
      image
    });
  }, []);
  const renderRestaurantItem = React.useCallback(({ item, index }) => {
    return <RestaurantCard onPress={onItemPress} />;
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
