import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Container, FText, Header, Padding } from '../components';
import { userStore } from '../stores';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { ChevronRightSvg, EditSvg } from '../assets/svg';
import { Colors } from '../constants/colors';
import { restaurantSettings } from '../constants/data';
import { launchImageLibrary } from 'react-native-image-picker';
import userActions from '../actions/userActions';
import { Observer } from 'mobx-react-lite';

const RestaurantManagement = ({ navigation }) => {
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const renderSettingItem = React.useCallback(({ item, index }) => {
    const onPress = () => {
      navigation.navigate(item.routeName);
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.settingItem}>
        <FText>{item.name}</FText>
        <ChevronRightSvg />
      </TouchableOpacity>
    );
  }, []);
  const onImagePress = React.useCallback(async (type = 'logo') => {
    const isUpdatingLogo = type === 'logo';
    const image = await launchImageLibrary();
    if (image.assets) {
      const media = image.assets[0];
      userActions.updateRestaurant(
        isUpdatingLogo
          ? {
              logo: media
            }
          : {
              cover_image: media
            }
      );
    }
  }, []);
  const renderListHeader = React.useCallback(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <Observer>
            {() => (
              <Image
                style={styles.cover}
                source={{
                  uri: userStore.restaurant.cover_image
                }}
              />
            )}
          </Observer>
          <TouchableOpacity onPress={() => onImagePress('cover')} style={styles.btnEdit}>
            <EditSvg color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Observer>
            {() => (
              <Image
                style={styles.logo}
                source={{
                  uri: userStore.restaurant.logo
                }}
              />
            )}
          </Observer>
          <TouchableOpacity onPress={() => onImagePress('logo')} style={styles.btnEditLogo}>
            <Image style={styles.editImage} source={require('../assets/images/image.png')} />
          </TouchableOpacity>
        </View>
        <Padding paddingTop={15} />
        <FText fontSize={18} fontWeight={700} align="center">
          {userStore.restaurant.name}
        </FText>
      </View>
    ),
    []
  );
  return (
    <Container>
      <Header title="Restaurant Managment" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderListHeader}
          data={restaurantSettings}
          renderItem={renderSettingItem}
          keyExtractor={item => `${item.routeName}`}
        />
      </View>
    </Container>
  );
};

export default RestaurantManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: setYAxisValue(20)
  },
  coverContainer: {
    marginHorizontal: setXAxisValue(26),
    height: setYAxisValue(156)
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: setValue(10)
  },
  btnEdit: {
    position: 'absolute',
    top: setValue(12),
    right: setValue(12),
    height: setValue(36),
    width: setValue(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setValue(5),
    backgroundColor: Colors.white
  },
  logoContainer: {
    height: setValue(100),
    width: setValue(100),
    padding: setValue(10),
    backgroundColor: Colors.white,
    marginTop: setValue(-50),
    borderRadius: 999,
    alignSelf: 'center'
  },
  logo: {
    height: '100%',
    width: '100%',
    borderRadius: 999
  },
  editImage: {
    height: setValue(20),
    width: setValue(20)
  },
  btnEditLogo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: setValue(36),
    width: setValue(36),
    borderRadius: 99,
    backgroundColor: Colors.white,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 3
  },
  headerContainer: {
    paddingBottom: setYAxisValue(20)
  },
  settingItem: {
    flexDirection: 'row',
    paddingHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.border,
    borderBottomWidth: 1
  }
});
