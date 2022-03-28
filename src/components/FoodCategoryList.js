import { StyleSheet, Image, TouchableOpacity, FlatList, View } from 'react-native';
import React from 'react';
import { FoodCategories } from '../constants/data';
import { isAndroid, setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import FText from './FText';
import { useNavigation } from '@react-navigation/native';

const FoodCategoryList = () => {
  const navigation = useNavigation();
  const renderFoodCategoryItem = React.useCallback(({ item, index }) => {
    const onPress = () => {
      navigation.navigate('CategoryDetail', {
        categoryId: item.id
      });
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.foodCategoryItem}>
        <View style={styles.foodCategoryItemIcon}>
          <Image style={styles.categoryImage} source={item.image} />
        </View>
        <FText color={Colors.white} fontSize={11} style={styles.categoryName}>
          {item.name}
        </FText>
      </TouchableOpacity>
    );
  }, []);
  return (
    <FlatList
      style={{ overflow: 'visible' }}
      data={FoodCategories}
      renderItem={renderFoodCategoryItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FoodCategoryList;

const styles = StyleSheet.create({
  categoryImage: {
    height: setValue(50),
    width: setValue(50)
  },
  foodCategoryItem: {
    backgroundColor: Colors.primary,
    marginRight: setXAxisValue(20),
    padding: setValue(4),
    borderRadius: 999,
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth
  },
  categoryName: {
    marginTop: setYAxisValue(10),
    marginBottom: setYAxisValue(20),
    alignSelf: 'center'
  }
});
