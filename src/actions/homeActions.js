import { baseUrl } from '../constants';
import { homeStore, userStore } from '../stores';
import { get } from '../utils';

const fetchRestaurants = async ({ isFetchMore = false } = {}) => {
  try {
    const response = await get(`${baseUrl}/restaurants`);
    if (response.success) {
      const restaurants = response.data.map(restaurant => ({
        ...restaurant,
        favorite: userStore.getIsFavoriteRestaurant(restaurant.id)
      }));
      if (isFetchMore) {
        homeStore.setRestaurants([...homeStore.restaurants, ...restaurants]);
      } else {
        homeStore.setRestaurants(restaurants);
      }
    }
  } catch (e) {
    console.log({ fetchRestaurants: e });
  }
};
const fetchProducts = async ({ isFetchMore = false } = {}) => {
  try {
    const response = await get(`${baseUrl}/products`);
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id)
      }));
      if (isFetchMore) {
        homeStore.setProducts([...homeStore.products, ...products]);
      } else {
        homeStore.setProducts(products);
      }
    }
  } catch (e) {
    console.log({ fetchProducts: e });
  }
};
const getHomeInformation = async () => {
  const listOfActions = [fetchRestaurants, fetchProducts];
  return await Promise.all(listOfActions.map(action => action()));
};
export default {
  getHomeInformation
};
