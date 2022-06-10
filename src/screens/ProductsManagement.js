import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { ConfirmModal, Container, FText, Header, Padding } from '../components';
import { UserActions } from '../actions';
import { userStore } from '../stores';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import { EditSvg, IncrementSvg, TrashSvg } from '../assets/svg';
import { toJS } from 'mobx';

const ProductsManagement = ({ navigation }) => {
  const bottomSheetRef = React.useRef();
  const state = useLocalObservable(() => ({
    selectedProductId: null,
    setSelectedProductId: id => {
      state.selectedProductId = id;
    }
  }));
  useEffect(() => {
    UserActions.fetchRestaurantProducts();
  }, []);
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onCreatePress = React.useCallback(() => {
    navigation.navigate('CreateProduct');
  }, []);
  const onConfirmRemove = React.useCallback(() => {
    UserActions.deleteRestaurantProduct(state.selectedProductId);
    bottomSheetRef.current?.snapTo?.(0);
    state.setSelectedProductId(null);
  }, []);
  const renderListHeader = React.useCallback(() => {
    return (
      <TouchableOpacity onPress={onCreatePress} style={styles.btnCreate}>
        <IncrementSvg size={16} color={Colors.primary} />
        <Padding paddingLeft={8} />
        <FText color={Colors.primary}>Create New Product</FText>
      </TouchableOpacity>
    );
  }, []);
  const renderProductItem = React.useCallback(({ item }) => {
    const onDeletePress = () => {
      state.setSelectedProductId(item.id);
      bottomSheetRef.current?.snapTo?.(1);
    };
    const onEditPress = () => {
      navigation.navigate('CreateProduct', {
        isEdit: true,
        product: toJS(item)
      });
    };
    return (
      <Pressable style={styles.productItem}>
        <View style={styles.productItemCol}>
          <Observer>
            {() => (
              <Image
                style={styles.productItemImage}
                source={{
                  uri: item.image
                }}
              />
            )}
          </Observer>
          <View>
            <Observer>{() => <FText>{item.name}</FText>}</Observer>
            <Padding paddingTop={4} />
            <Observer>{() => <FText>${item.price}</FText>}</Observer>
          </View>
        </View>
        <View style={styles.productItemCol}>
          <TouchableOpacity onPress={onEditPress} style={styles.btnEdit}>
            <EditSvg color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress} style={styles.btnRemove}>
            <TrashSvg color={Colors.white} />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }, []);
  return (
    <Container>
      <Header title="Manage Products" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <Observer>
          {() => (
            <FlatList
              initialNumToRender={10}
              ListHeaderComponent={renderListHeader}
              data={userStore.restaurantProducts.slice()}
              renderItem={renderProductItem}
              keyExtractor={item => `${item.id}`}
            />
          )}
        </Observer>
      </View>
      <ConfirmModal
        onConfirm={onConfirmRemove}
        ref={bottomSheetRef}
        title="Are you sure you want to delete this product?"
        subTitle="This action cannot be undone"
      />
    </Container>
  );
};

export default ProductsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnCreate: {
    marginHorizontal: setXAxisValue(26),
    paddingVertical: setXAxisValue(12),
    paddingHorizontal: setXAxisValue(24),
    borderColor: Colors.primary_40,
    borderWidth: setValue(2),
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setYAxisValue(26),
    marginBottom: setYAxisValue(10)
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(15)
  },
  productItemImage: {
    width: setValue(50),
    height: setValue(50),
    borderRadius: setValue(5),
    marginRight: setXAxisValue(10)
  },
  productItemCol: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnEdit: {
    height: setValue(36),
    width: setValue(36),
    borderRadius: setValue(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginRight: setXAxisValue(10)
  },
  btnRemove: {
    height: setValue(36),
    width: setValue(36),
    borderRadius: setValue(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.danger
  }
});
