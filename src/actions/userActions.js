import {userStore} from '../stores';

export const setRandomUserName = () => {
  userStore.setUser({name: `${Math.random()}`});
};
