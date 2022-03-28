import { action, makeAutoObservable, makeObservable, observable } from 'mobx';

class AppStore {
  drawerMenuVisible = false;
  constructor() {
    makeAutoObservable(this);
  }
  toggleDrawerMenu() {
    this.drawerMenuVisible = !this.drawerMenuVisible;
  }
}
export default AppStore;
