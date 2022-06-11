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
  restaurant = null;
  restaurantProducts = [];
  restaurantOrders = [];
  restaurantCustomers = [];
  favoriteRestaurants = {};
  favoriteProducts = {};
  creatingRestaurant = false;
  constructor() {
    ignorePersistNodes(this, [
      'signingUp',
      'signUpError',
      'loggingIn',
      'logInError',
      'verifyingOTP',
      'verifyOTPError',
      'addingAddress',
      'addAddressError',
      'creatingRestaurant'
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
      creatingRestaurant: observable,
      restaurant: observable,
      restaurantProducts: observable,
      restaurantOrders: observable,
      restaurantCustomers: observable,
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
      setAccessToken: action,
      setCreatingRestaurant: action,
      setRestaurant: action,
      setRestaurantProducts: action,
      removeRestaurantProduct: action,
      updateRestaurantProduct: action,
      addRestaurantProduct: action,
      setRestaurantOrders: action,
      updateRestaurantOrderStatus: action,
      setRestaurantCustomers: action,
      mainAddress: computed,
      isRestaurantOwner: computed
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
    if (user.restaurant) {
      this.restaurant = user.restaurant;
    }
  }
  setLogined(logined) {
    this.logined = logined;
    if (!logined) {
      this.user = {};
    }
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
  setAccessToken(accessToken) {
    this.user.accessToken = accessToken;
  }
  setCreatingRestaurant(creatingRestaurant) {
    this.creatingRestaurant = creatingRestaurant;
  }
  setRestaurant(restaurant) {
    this.restaurant = {
      ...this.restaurant,
      ...restaurant
    };
  }
  setRestaurantProducts(products) {
    this.restaurantProducts = products;
  }
  removeRestaurantProduct(productId) {
    this.restaurantProducts = this.restaurantProducts.filter(product => product.id !== productId);
  }
  updateRestaurantProduct(product) {
    const index = this.restaurantProducts.findIndex(x => x.id === product.id);
    if (index > -1) {
      Object.keys(product).forEach(key => {
        this.restaurantProducts[index][key] = product[key];
      });
    }
  }
  addRestaurantProduct(product) {
    this.restaurantProducts.push(product);
  }
  setRestaurantOrders(orders) {
    this.restaurantOrders = orders;
  }
  updateRestaurantOrderStatus(orderId, status) {
    const index = this.restaurantOrders.findIndex(x => x.id === orderId);
    if (index > -1) {
      this.restaurantOrders[index].status_code = status;
    }
  }
  setRestaurantCustomers(customers) {
    this.restaurantCustomers = customers;
  }
  get isRestaurantOwner() {
    return !!this.restaurant;
  }
  get mainAddress() {
    return this.addresses.find(address => address.selected);
  }
}
export default UserStore;
