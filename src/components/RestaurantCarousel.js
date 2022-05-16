import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import { homeStore, restaurantStore } from '../stores';
import { RestaurantActions } from '../actions';
import { Observer } from 'mobx-react-lite';

const RestaurantCarousel = () => {
  const navigation = useNavigation();
  const onItemPress = React.useCallback((item, image) => {
    restaurantStore.setRestaurant({ ...item });
    RestaurantActions.fetchRestaurant({ restaurantId: item.id });
    navigation.navigate('RestaurantDetail', {
      image
    });
  }, []);
  const renderRestaurantItem = React.useCallback(({ item }) => {
    return <RestaurantCard item={item} onPress={onItemPress} />;
  }, []);
  return (
    <Observer>
      {() => (
        <FlatList
          style={{ overflow: 'visible' }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={homeStore.restaurants.slice()}
          renderItem={renderRestaurantItem}
        />
      )}
    </Observer>
  );
};

export default RestaurantCarousel;

const styles = StyleSheet.create({});
