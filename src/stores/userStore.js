import {action, makeObservable, observable} from 'mobx';

class UserStore {
  user = {};
  logined = false;
  constructor() {
    makeObservable(this, {
      user: observable,
      logined: observable,
      setUser: action,
      setLogined: action,
    });
  }
  setUser(user) {
    this.user = user;
  }
  setLogined(logined) {
    this.logined = logined;
  }
}
export default UserStore;
