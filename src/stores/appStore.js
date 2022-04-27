import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { ignorePersistNodes } from '../utils';

class AppStore {
  drawerMenuVisible = false;
  constructor() {
    ignorePersistNodes(this, ['drawerMenuVisible']);
    makeObservable(this, {
      drawerMenuVisible: observable,
      toggleDrawerMenu: action
    });
  }
  toggleDrawerMenu() {
    this.drawerMenuVisible = !this.drawerMenuVisible;
  }
}
export default AppStore;
