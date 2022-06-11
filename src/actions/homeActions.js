import { baseUrl } from '../constants';
import { ITEM_EACH_PAGE } from '../constants/data';
import { homeStore, userStore } from '../stores';
import { get, post } from '../utils';

const fetchRestaurants = async ({ isFetchMore = false } = {}) => {
  try {
    const response = await get(`${baseUrl}/restaurants?limit=${ITEM_EACH_PAGE}`);
    if (response.success) {
      const restaurants = response.data.map(restaurant => ({
        ...restaurant,
        favorite: userStore.getIsFavoriteRestaurant(restaurant.id),
        avg_rating: (restaurant.avg_rating || 0).toFixed(1)
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
    const response = await get(`${baseUrl}/products?limit=${ITEM_EACH_PAGE}`);
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id),
        avg_rating: (product.avg_rating || 0).toFixed(1)
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
const fetchSuggestProducts = async ({ categoryIds, restaurantIds, productIds }) => {
  try {
    const response = await post(`${baseUrl}/suggest-products`, {
      categoryIds,
      restaurantIds,
      skipProductIds: productIds
    });
    if (response.success) {
      homeStore.setSuggestProducts(response.data);
    }
  } catch (e) {
    console.log({ fetchSuggestProductsBasedOnCart: e });
  }
};
const getHomeInformation = async () => {
  const listOfActions = [fetchRestaurants, fetchProducts];
  return await Promise.all(listOfActions.map(action => action()));
};
export default {
  getHomeInformation,
  fetchSuggestProducts
};
