import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { ignorePersistNodes } from '../utils';

class AppStore {
  drawerMenuVisible = false;
  privateIp = '192.168.1.2';
  constructor() {
    ignorePersistNodes(this, ['drawerMenuVisible']);
    makeObservable(this, {
      drawerMenuVisible: observable,
      toggleDrawerMenu: action,
      privateIp: observable,
      setPrivateIp: action
    });
  }
  toggleDrawerMenu() {
    this.drawerMenuVisible = !this.drawerMenuVisible;
  }
  setPrivateIp(ip) {
    this.privateIp = ip;
  }
}
export default AppStore;
