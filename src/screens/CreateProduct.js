import { Observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { Image, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserActions } from '../actions';
import { ChevronRightSvg, IncrementSvg } from '../assets/svg';
import { Container, FText, Header, Padding } from '../components';
import { Colors } from '../constants/colors';
import { FoodCategories } from '../constants/data';
import { userStore } from '../stores';
import { setValue, setXAxisValue, setYAxisValue, standardizeImageType } from '../utils';

const CreateProduct = ({ navigation, route }) => {
  const { isEdit, product } = route.params || {};
  const state = useLocalObservable(() => ({
    image: product
      ? {
          uri: product.image,
          type: standardizeImageType(`image/${product.image.split('.').pop()}`)
        }
      : null,
    name: product ? product.name : '',
    description: product ? product.description : '',
    category: product ? FoodCategories.find(c => c.id === product.cat_id) : '',
    price: product ? product.price : '',
    addons: product
      ? product.options.map(option => ({
          ...option,
          image: {
            uri: option.image,
            type: standardizeImageType(`image/${option.image.split('.').pop()}`)
          }
        }))
      : [],
    setImage: image => {
      state.image = image;
    },
    setName: name => {
      state.name = name;
    },
    setDescription: description => {
      state.description = description;
    },
    setCategory: category => {
      state.category = category;
    },
    setPrice: price => {
      state.price = price;
    },
    setAddons: addons => {
      state.addons = addons;
    },
    setAddonProperty: (index, property, value) => {
      state.addons[index][property] = value;
      state.addons[index].isChanged = true;
    },
    deleteAddon: index => {
      state.addons[index].isDeleted = true;
    },
    get isValid() {
      return (
        this.name.trim().length > 0 &&
        this.description.trim().length > 0 &&
        !!this.category &&
        this.price > 0 &&
        this.addons.every(addon => !!addon.name && !!addon.price && !!addon.image)
      );
    }
  }));
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onSelectCategoryPress = React.useCallback(() => {
    navigation.navigate('CreateProductCategory', {
      callback: category => state.setCategory(category),
      selectedCatId: state.category ? state.category.id : null
    });
  });
  const onImagePress = React.useCallback(async () => {
    const image = await launchImageLibrary();
    if (image.assets && image.assets[0]) {
      state.setImage(image.assets[0]);
    }
  }, []);
  const onAddAddonPress = React.useCallback(() => {
    state.setAddons([...state.addons, { name: '', price: 0, image: null }]);
  }, []);
  const onSubmitPress = React.useCallback(() => {
    if (state.isValid) {
      const data = {
        name: state.name,
        description: state.description,
        cat_id: state.category.id,
        image: state.image,
        price: parseFloat(state.price),
        res_id: userStore.restaurant.id,
        productId: product?.id,
        addons: state.addons
          .filter(x => (isEdit ? true : !x.isDeleted))
          .map(addon => ({
            ...addon,
            name: addon.name,
            price: parseFloat(addon.price),
            image: addon.image
          }))
      };
      if (isEdit) {
        UserActions.updateRestaurantProduct(data);
      } else {
        UserActions.createRestaurantProduct(data);
      }
    }
  }, []);
  const renderAddonInput = (addon, index) => {
    if (addon.isDeleted) {
      return null;
    }
    const onAddonImagePress = async () => {
      const image = await launchImageLibrary();
      if (image.assets && image.assets[0]) {
        state.setAddonProperty(index, 'image', image.assets[0]);
      }
    };
    const onDeletePress = () => {
      state.deleteAddon(index);
    };
    return (
      <View key={index} style={styles.addonInputGroup}>
        <Pressable
          onPress={onAddonImagePress}
          style={[
            styles.addonImageContainer,
            !!addon.image && {
              borderWidth: 0,
              borderRadius: setValue(5)
            }
          ]}>
          {addon.image ? <Image source={{ uri: addon.image?.uri }} style={styles.addonImage} /> : <IncrementSvg color={Colors.primary} />}
        </Pressable>
        <View
          style={[
            styles.addonInput,
            {
              flex: 2
            }
          ]}>
          <Observer>
            {() => (
              <TextInput
                placeholderTextColor={Colors.gray}
                placeholder="Addon Name"
                style={styles.input}
                value={addon.name}
                onChangeText={txt => state.setAddonProperty(index, 'name', txt)}
              />
            )}
          </Observer>
        </View>
        <View style={styles.addonInput}>
          <Observer>
            {() => (
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={Colors.gray}
                placeholder="Addon Price"
                style={styles.input}
                value={`${addon.price}`}
                onChangeText={txt => state.setAddonProperty(index, 'price', txt)}
              />
            )}
          </Observer>
        </View>
        <TouchableOpacity onPress={onDeletePress} style={styles.btnRemoveAddon}>
          <Image style={styles.closeIcon} source={require('../assets/images/close.png')} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Container>
      <Header title={isEdit ? 'Update Product' : 'Create Product'} onLeftPress={onBackPress} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <FText color={Colors.typography_40}>Product Image</FText>
          <Observer>
            {() =>
              !state.image ? (
                <Pressable onPress={onImagePress} style={styles.btnImage}>
                  <FText fontSize="small" color={Colors.primary}>
                    Add Image
                  </FText>
                </Pressable>
              ) : (
                <Pressable onPress={onImagePress}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: state.image?.uri
                    }}
                  />
                </Pressable>
              )
            }
          </Observer>
        </View>
        <View style={styles.inputGroup}>
          <FText color={Colors.typography_40}>Product Name</FText>
          <Observer>
            {() => (
              <TextInput
                placeholder="Enter product name"
                placeholderTextColor={Colors.gray}
                style={styles.input}
                value={state.name}
                onChangeText={txt => state.setName(txt)}
              />
            )}
          </Observer>
        </View>
        <View style={styles.inputGroup}>
          <FText color={Colors.typography_40}>Description</FText>
          <Observer>
            {() => (
              <TextInput
                placeholder="Enter product description"
                placeholderTextColor={Colors.gray}
                style={styles.input}
                value={state.description}
                onChangeText={txt => state.setDescription(txt)}
              />
            )}
          </Observer>
        </View>
        <View style={styles.inputGroup}>
          <FText color={Colors.typography_40}>Price</FText>
          <Observer>
            {() => (
              <TextInput
                keyboardType="numeric"
                placeholder="Enter price"
                placeholderTextColor={Colors.gray}
                style={styles.input}
                value={`${state.price}`}
                onChangeText={txt => state.setPrice(txt)}
              />
            )}
          </Observer>
        </View>
        <Pressable onPress={onSelectCategoryPress} style={styles.singleInput}>
          <FText color={Colors.typography_40}>Category</FText>
          <View style={styles.singleInputRight}>
            <Observer>{() => <FText color={Colors.primary}>{state.category?.name}</FText>}</Observer>
            <Padding paddingLeft={10} />
            <ChevronRightSvg size={14} />
          </View>
        </Pressable>
        <View style={styles.inputGroup}>
          <FText color={Colors.typography_40}>Addons</FText>
          <Observer>{() => state.addons.map(renderAddonInput)}</Observer>
          <TouchableOpacity onPress={onAddAddonPress} style={styles.btnAddAddon}>
            <FText color={Colors.primary}>Add Addon</FText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Observer>
        {() => (
          <TouchableOpacity
            onPress={onSubmitPress}
            disabled={!state.isValid}
            style={[
              styles.btnSubmit,
              !state.isValid && {
                backgroundColor: Colors.gray
              }
            ]}>
            <FText color={Colors.white}>{isEdit ? 'Update' : 'Create'}</FText>
          </TouchableOpacity>
        )}
      </Observer>
    </Container>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_20
  },
  inputGroup: {
    paddingHorizontal: setXAxisValue(26),
    backgroundColor: Colors.white,
    paddingVertical: setYAxisValue(15),
    marginBottom: setYAxisValue(10)
  },
  input: {
    fontSize: setYAxisValue(16),
    fontFamily: 'SofiaPro-Medium',
    marginTop: setYAxisValue(8),
    width: '100%'
  },
  btnImage: {
    marginTop: setYAxisValue(8),
    height: setYAxisValue(100),
    width: setYAxisValue(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 2,
    borderStyle: 'dashed'
  },
  image: {
    marginTop: setYAxisValue(8),
    height: setYAxisValue(100),
    width: setYAxisValue(100),
    borderRadius: setValue(5)
  },
  singleInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(26),
    backgroundColor: Colors.white,
    paddingVertical: setYAxisValue(15),
    marginBottom: setYAxisValue(10)
  },
  singleInputRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnSubmit: {
    marginHorizontal: setXAxisValue(26),
    height: setYAxisValue(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginTop: setYAxisValue(20),
    borderRadius: setValue(5)
  },
  btnAddAddon: {
    paddingVertical: setYAxisValue(10)
  },
  addonInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: setYAxisValue(7)
  },
  addonImageContainer: {
    height: setValue(50),
    width: setValue(50),
    borderColor: Colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  addonImage: {
    width: '100%',
    height: '100%',
    borderRadius: setValue(5)
  },
  addonInput: {
    flex: 1,
    paddingLeft: setXAxisValue(10),
    marginLeft: setXAxisValue(10),
    height: setValue(50),
    justifyContent: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: setValue(5)
  },
  closeIcon: {
    height: setValue(20),
    width: setValue(20)
  },
  btnRemoveAddon: {
    paddingLeft: setXAxisValue(10)
  }
});
