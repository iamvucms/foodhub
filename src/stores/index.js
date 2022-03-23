import AsyncStorage from '@react-native-async-storage/async-storage';
import { configure } from 'mobx';
import { AsyncTrunk } from 'mobx-sync';
import React, { useContext } from 'react';
import CartStore from './cartStore';
import UserStore from './userStore';
configure({
  enforceActions: 'always',
  useProxies: 'never'
});
export const userStore = new UserStore();
export const cartStore = new CartStore();
export const rootStore = {
  user: userStore,
  cart: cartStore
};
export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
  storageKey: 'mobx-data'
});
export const StoreContext = React.createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = store => useContext(StoreContext)[store];
