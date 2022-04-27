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
  addresses = [];
  constructor() {
    ignorePersistNodes(this, ['signingUp', 'signUpError', 'loggingIn', 'logInError', 'verifyingOTP', 'verifyOTPError']);
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
  selectMainAddress(address_id) {
    this.addresses.forEach(address => {
      if (address.id === address_id) {
        address.selected = true;
      } else {
        address.selected = false;
      }
    });
  }
  get mainAddress() {
    return this.addresses.find(address => address.selected);
  }
}
export default UserStore;
