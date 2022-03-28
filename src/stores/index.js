import AsyncStorage from '@react-native-async-storage/async-storage';
import { configure } from 'mobx';
import { AsyncTrunk } from 'mobx-sync';
import React, { useContext } from 'react';
import AppStore from './appStore';
import CartStore from './cartStore';
import UserStore from './userStore';
configure({
  enforceActions: 'always',
  useProxies: 'always'
});
export const userStore = new UserStore();
export const cartStore = new CartStore();
export const appStore = new AppStore();
export const rootStore = {
  user: userStore,
  cart: cartStore,
  app: appStore
};
export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
  storageKey: 'mobx-data'
});
export const StoreContext = React.createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = store => useContext(StoreContext)[store];
