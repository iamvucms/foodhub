import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Container, Header } from '../components';
import { userStore } from '../stores';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { EditSvg } from '../assets/svg';
import { Colors } from '../constants/colors';

const RestaurantManagement = ({ navigation }) => {
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const renderListHeader = React.useCallback(
    () => (
      <View>
        <View style={styles.coverContainer}>
          <Image
            style={styles.cover}
            source={{
              uri: userStore.restaurant.cover_image
            }}
          />
          <TouchableOpacity style={styles.btnEdit}>
            <EditSvg color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: userStore.restaurant.logo
            }}
          />
          <TouchableOpacity style={styles.btnEditLogo}>
            <Image style={styles.editImage} source={require('../assets/images/image.png')} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  );
  return (
    <Container>
      <Header title="Restaurant Managment" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <FlatList ListHeaderComponent={renderListHeader} />
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
  }
});
