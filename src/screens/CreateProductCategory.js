import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container, FText, Header } from '../components';
import { FoodCategories } from '../constants/data';
import { Colors } from '../constants/colors';
import { setXAxisValue, setYAxisValue } from '../utils';
import { CheckSvg } from '../assets/svg';

const CreateProductCategory = ({ navigation, route }) => {
  const { callback, selectedCatId } = route.params || {};
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const renderCategoryItem = React.useCallback(({ item }) => {
    const onPress = () => {
      callback(item);
      navigation.goBack();
    };
    const isSelected = item.id === selectedCatId;
    return (
      <Pressable onPress={onPress} style={styles.categoryItem}>
        <FText color={isSelected ? Colors.primary : Colors.typography}>{item.name}</FText>
        {isSelected && <CheckSvg color={Colors.primary} size={14} />}
      </Pressable>
    );
  }, []);
  return (
    <Container>
      <Header title="Select Category" onLeftPress={onBackPress} />
      <FlatList style={styles.container} data={FoodCategories} renderItem={renderCategoryItem} keyExtractor={item => `${item.id}`} />
    </Container>
  );
};

export default CreateProductCategory;

const styles = StyleSheet.create({
  container: {
    paddingTop: setYAxisValue(20)
  },
  categoryItem: {
    paddingHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
