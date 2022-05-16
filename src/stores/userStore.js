import { action, computed, makeObservable, observable } from 'mobx';
import { ignorePersistNodes } from '../utils';

class UserStore {
  user = {};
  logined = false;
  signingUp = false;
  signUpError = null;
  loggingIn = false;
  logInError = null;
  verifyingOTP = false;
  verifyOTPError = null;
  addingAddress = false;
  addAddressError = null;
  addresses = [];
  favoriteRestaurants = {};
  favoriteProducts = {};
  constructor() {
    ignorePersistNodes(this, [
      'signingUp',
      'signUpError',
      'loggingIn',
      'logInError',
      'verifyingOTP',
      'verifyOTPError',
      'addingAddress',
      'addAddressError'
    ]);
    makeObservable(this, {
      user: observable,
      logined: observable,
      signingUp: observable,
      signUpError: observable,
      loggingIn: observable,
      logInError: observable,
      verifyingOTP: observable,
      verifyOTPError: observable,
      addresses: observable,
      addingAddress: observable,
      addAddressError: observable,
      favoriteRestaurants: observable,
      favoriteProducts: observable,
      setUser: action,
      setLogined: action,
      setSignUpError: action,
      setSigningUp: action,
      setLogInError: action,
      setLoggingIn: action,
      setVerifyingOTP: action,
      setVerifyOTPError: action,
      setAddresses: action,
      selectMainAddress: action,
      addAddress: action,
      removeAddress: action,
      updateAddress: action,
      setAddingAddress: action,
      setAddAddressError: action,
      addFavoriteRestaurant: action,
      removeFavoriteRestaurant: action,
      addFavoriteProduct: action,
      removeFavoriteProduct: action,
      mainAddress: computed
    });
  }

  setSigningUp(signingUp) {
    this.signingUp = signingUp;
  }
  setSignUpError(signUpError) {
    this.signUpError = signUpError;
  }
  setLoggingIn(loggingIn) {
    this.loggingIn = loggingIn;
  }
  setLogInError(logInError) {
    this.logInError = logInError;
  }
  setVerifyingOTP(verifyingOTP) {
    this.verifyingOTP = verifyingOTP;
  }
  setVerifyOTPError(verifyOTPError) {
    this.verifyOTPError = verifyOTPError;
  }
  setUser(user) {
    this.user = user;
  }
  setLogined(logined) {
    this.logined = logined;
  }
  setAddresses(addresses) {
    this.addresses = addresses;
  }
  addAddress(address) {
    this.addresses.push(address);
  }
  removeAddress(addressId) {
    const address = this.addresses.find(address => address.id === addressId);
    const selected = address.selected;
    this.addresses = this.addresses.filter(address => address.id !== addressId);
    const lastAddress = this.addresses[this.addresses.length - 1];
    if (lastAddress && selected) {
      lastAddress.selected = true;
    }
  }
  updateAddress(address) {
    const index = this.addresses.findIndex(x => x.id === address.id);
    if (index > -1) {
      this.addresses[index] = {
        ...this.addresses[index],
        ...address
      };
    }
  }
  setAddingAddress(addingAddress) {
    this.addingAddress = addingAddress;
  }
  setAddAddressError(addAddressError) {
    this.addAddressError = addAddressError;
  }
  selectMainAddress(address_id) {
    this.addresses.forEach(address => {
      if (address.id === address_id) {
        address.selected = true;
      } else {
        address.selected = false;
      }
    });
  }
  addFavoriteRestaurant(restaurantId) {
    this.favoriteRestaurants = {
      ...this.favoriteRestaurants,
      [restaurantId]: true
    };
    console.log(this.favoriteRestaurants);
  }
  removeFavoriteRestaurant(restaurantId) {
    delete this.favoriteRestaurants[restaurantId];
  }
  addFavoriteProduct(productId) {
    this.favoriteProducts = {
      ...this.favoriteProducts,
      [productId]: true
    };
  }
  removeFavoriteProduct(productId) {
    delete this.favoriteProducts[productId];
  }
  getIsFavoriteRestaurant(restaurantId) {
    return !!this.favoriteRestaurants[restaurantId];
  }
  getIsFavoriteProduct(productId) {
    return this.favoriteProducts[productId];
  }
  get mainAddress() {
    return this.addresses.find(address => address.selected);
  }
}
export default UserStore;
