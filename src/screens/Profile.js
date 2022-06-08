import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Container, FText, Header, Padding } from '../components';
import { setValue, setXAxisValue, setYAxisValue, uploadImage } from '../utils';
import { userStore } from '../stores';
import { Colors } from '../constants/colors';
import { Observer } from 'mobx-react-lite';
import { profileSettings } from '../constants/data';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { UserActions } from '../actions';
const Profile = () => {
  const navigation = useNavigation();
  const onUpdateAvatarPress = React.useCallback(async () => {
    const result = await launchImageLibrary();
    if (result.assets) {
      const { uri, type } = result.assets[0];
      const mimeType = type === 'image/jpg' ? 'image/jpeg' : type;
      const avatar = await uploadImage(uri, mimeType);
      if (avatar.uri) {
        UserActions.updateUserInformation({
          avatar: avatar.uri
        });
      }
    }
  }, []);
  const renderSettingItem = React.useCallback(({ item }) => {
    const isLogout = item.name === 'Logout';
    const onPress = isLogout ? () => userStore.setLogined(false) : () => navigation.navigate(item.routeName);
    return (
      <TouchableOpacity onPress={onPress} style={styles.settingItem}>
        <FText color={isLogout ? Colors.primary : Colors.typography}>{item.name}</FText>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container>
      <Header title="Your Profile" />
      <View style={styles.container}>
        <View style={styles.profileInformation}>
          <View style={styles.avatarContainer}>
            <Observer>
              {() => (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: userStore.user.avatar
                  }}
                />
              )}
            </Observer>
            <TouchableOpacity onPress={onUpdateAvatarPress} style={styles.btnEditAvatar}>
              <Image style={styles.editImage} source={require('../assets/images/image.png')} />
            </TouchableOpacity>
          </View>
          <Padding paddingTop={15} paddingBottom={7}>
            <Observer>
              {() => (
                <FText fontWeight={700} fontSize="h6">
                  {userStore.user.name}
                </FText>
              )}
            </Observer>
          </Padding>
          <FText fontWeight={200}>{userStore.user.emailOrPhone}</FText>
        </View>
        <FlatList data={profileSettings} renderItem={renderSettingItem} keyExtractor={item => item.routeName} />
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileInformation: {
    height: setYAxisValue(300),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    height: setValue(120),
    width: setValue(120),
    borderRadius: 9999,
    backgroundColor: Colors.gray_40
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 9999
  },
  btnEditAvatar: {
    position: 'absolute',
    zIndex: 99,
    height: setValue(40),
    width: setValue(40),
    borderRadius: 99,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 3
  },
  editImage: {
    width: setValue(20),
    height: setValue(20)
  },
  settingItem: {
    height: setValue(50),
    paddingHorizontal: setXAxisValue(26),
    justifyContent: 'center',
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5
  }
});
