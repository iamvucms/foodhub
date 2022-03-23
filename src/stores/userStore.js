import { action, makeObservable, observable } from 'mobx';

class UserStore {
  user = {};
  logined = false;
  likes = [];
  constructor() {
    makeObservable(this, {
      user: observable,
      logined: observable,
      likes: observable,
      setUser: action,
      setLogined: action
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
