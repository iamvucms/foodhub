import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import { setXAxisValue, setYAxisValue } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { homeStore } from '../stores';
import { Observer } from 'mobx-react-lite';

const FoodCarousel = ({ cardStyle, ...flatlistProps }) => {
  const navigation = useNavigation();
  const onItemPress = React.useCallback((item, image) => {
    navigation.navigate('FoodDetail', { data: item, image });
  }, []);
  const renderRestaurantItem = React.useCallback(({ item }) => {
    return <FoodCard onPress={onItemPress} item={item} containerStyle={[styles.foodItem, cardStyle]} />;
  }, []);
  return (
    <Observer>
      {() => (
        <FlatList
          style={{ overflow: 'visible' }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={homeStore.products.slice()}
          renderItem={renderRestaurantItem}
          {...flatlistProps}
        />
      )}
    </Observer>
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
