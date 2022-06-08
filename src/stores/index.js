import AsyncStorage from '@react-native-async-storage/async-storage';
import { configure } from 'mobx';
import { AsyncTrunk } from 'mobx-sync';
import React, { useContext } from 'react';
import AppStore from './appStore';
import CartStore from './cartStore';
import { DiscoverStore } from './discoverStore';
import HomeStore from './homeStore';
import OrderStore from './orderStore';
import RestaurantStore from './restaurantStore';
import UserStore from './userStore';
configure({
  enforceActions: 'always',
  useProxies: 'always'
});
export const userStore = new UserStore();
export const cartStore = new CartStore();
export const appStore = new AppStore();
export const orderStore = new OrderStore();
export const homeStore = new HomeStore();
export const restaurantStore = new RestaurantStore();
export const discoverStore = new DiscoverStore();
export const rootStore = {
  user: userStore,
  cart: cartStore,
  app: appStore,
  order: orderStore,
  home: homeStore,
  restaurant: restaurantStore,
  discover: discoverStore
};
export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
  storageKey: 'mobx-data'
});
export const StoreContext = React.createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = store => useContext(StoreContext)[store];
