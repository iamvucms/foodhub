import { baseAuthUrl, baseUrl } from '../constants';
import { userStore } from '../stores';
import { get, post, storeItem } from '../utils';
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
const getAddresses = async () => {
  const response = await get(`${baseUrl}/address`);
  if (response.success) {
    userStore.setAddresses(response.data);
  }
};
const markAddressAsMain = async ({ address }) => {
  userStore.selectMainAddress(address.id);
  const response = await post(`${baseUrl}/address/${address.id}`, {
    address: {
      selected: true,
      user_id: userStore.user.user_id
    }
  });
  if (!response.success) {
    console.log(response.error);
  }
};
const getUserInformation = async () => {
  const listOfActions = [getAddresses];
  listOfActions.forEach(action => action());
};
export default {
  registerUser,
  loginUser,
  logout,
  verifyOTP,
  getAddresses,
  markAddressAsMain,
  getUserInformation
};
