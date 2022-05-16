import { baseAuthUrl, baseUrl } from '../constants';
import { navigation } from '../navigation/navigationRef';
import { homeStore, restaurantStore, userStore } from '../stores';
import { get, post, postDelete, storeItem } from '../utils';
const registerUser = async ({ name, password, emailOrPhone }, onRegister) => {
  userStore.setSigningUp(true);
  const response = await post(`${baseAuthUrl}/register`, {
    name: name.toLowerCase(),
    password,
    emailOrPhone: emailOrPhone.toLowerCase()
  });
  if (response.success) {
    const { data } = response;
    userStore.setUser(data);
    //OTP verification
    onRegister && onRegister();
  } else {
    userStore.setSignUpError(response.error);
  }
  userStore.setSigningUp(false);
};
const loginUser = async ({ emailOrPhone, password }) => {
  userStore.setLoggingIn(true);
  const response = await post(`${baseAuthUrl}`, {
    emailOrPhone: emailOrPhone.toLowerCase(),
    password
  });
  if (response.success) {
    const { data } = response;
    storeItem('accessToken', data.accessToken);
    storeItem('refreshToken', data.refreshToken);
    userStore.setUser(response.data);
    userStore.setLogined(true);
  } else {
    userStore.setLogInError(response.error);
  }
  userStore.setLoggingIn(false);
};
const logout = async () => {
  userStore.setLogined(false);
  userStore.setUser({});
  storeItem('accessToken', '');
  storeItem('refreshToken', '');
};
const verifyOTP = async ({ otp }) => {
  if (!('user_id' in userStore.user)) {
    userStore.setVerifyOTPError('User not found');
    return;
  }
  userStore.setVerifyingOTP(true);
  const response = await post(`${baseAuthUrl}/verify-otp`, { otp, user_id: userStore.user.user_id });
  if (response.success) {
    const { data } = response;
    storeItem('accessToken', data.accessToken);
    storeItem('refreshToken', data.refreshToken);
    userStore.setUser(response.data);
    userStore.setLogined(true);
  } else {
    userStore.setVerifyOTPError(response.error);
  }
  userStore.setVerifyingOTP(false);
};
const fetchAddresses = async () => {
  const response = await get(`${baseUrl}/address`);
  if (response.success) {
    userStore.setAddresses(response.data);
  }
};
const markAddressAsMain = async ({ address }) => {
  userStore.selectMainAddress(address.id);
  const response = await post(`${baseUrl}/address/${address.id}`, {
    address: {
      selected: true
    }
  });
  if (!response.success) {
    console.log(response.error);
  }
};
const addAddress = async ({ address }) => {
  userStore.setAddingAddress(true);
  const response = await post(`${baseUrl}/address`, {
    address: {
      ...address,
      user_id: userStore.user.user_id
    }
  });
  if (response.success) {
    userStore.setAddresses(response.data);
    navigation.navigate('UserAddress');
  } else {
    userStore.setAddAddressError(response.error);
  }
  userStore.setAddingAddress(false);
};
const removeAddress = async ({ addressId }) => {
  const response = await postDelete(`${baseUrl}/address/${addressId}`);
  console.log(response);
  if (response.success) {
    userStore.removeAddress(addressId);
  }
};
const updateAddress = async ({ address }) => {
  userStore.setAddingAddress(true);
  const response = await post(`${baseUrl}/address/${address.id}`, {
    address
  });
  if (response.success) {
    userStore.updateAddress(address);
    navigation.navigate('UserAddress');
  } else {
    userStore.setAddAddressError(response.error);
  }
  userStore.setAddingAddress(false);
};
const toggleFavoriteRestaurant = ({ restaurantId }) => {
  const isFavorite = userStore.getIsFavoriteRestaurant(restaurantId);
  restaurantStore.setFavoriteRestaurant(restaurantId, !isFavorite);
  homeStore.setFavoriteRestaurant(restaurantId, !isFavorite);
  const userStoreAction = isFavorite ? 'removeFavoriteRestaurant' : 'addFavoriteRestaurant';
  userStore[userStoreAction](restaurantId);
};
const toggleFavoriteProduct = ({ productId }) => {
  const isFavorite = userStore.getIsFavoriteProduct(productId);
  restaurantStore.setFavoriteProduct(productId, !isFavorite);
  homeStore.setFavoriteProduct(productId, !isFavorite);
  const userStoreAction = isFavorite ? 'removeFavoriteProduct' : 'addFavoriteProduct';
  userStore[userStoreAction](productId);
};
const fetchUserInformation = async () => {
  const listOfActions = [fetchAddresses];
  return await Promise.all(listOfActions.map(action => action()));
};
export default {
  registerUser,
  loginUser,
  logout,
  verifyOTP,
  fetchAddresses,
  markAddressAsMain,
  addAddress,
  removeAddress,
  updateAddress,
  toggleFavoriteRestaurant,
  toggleFavoriteProduct,
  fetchUserInformation
};
