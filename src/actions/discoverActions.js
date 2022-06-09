import { baseUrl } from '../constants';
import { ITEM_EACH_PAGE } from '../constants/data';
import { discoverStore, userStore } from '../stores';
import { get } from '../utils';
const fetchCategoryProducts = async (categoryId, isFetchMore, orderBy = 'id', orderType = 'desc') => {
  discoverStore.setFetchingProducts(true);
  try {
    if (isFetchMore) {
      discoverStore.setCurrentCategoryPage(discoverStore.currentCategoryPage + 1);
    } else {
      discoverStore.setCurrentCategoryPage(0);
    }
    const response = await get(
      `${baseUrl}/categories/${categoryId}/products?page=${discoverStore.currentCategoryPage}&limit=${ITEM_EACH_PAGE}&orderBy=${orderBy}&orderType=${orderType}`
    );
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id)
      }));
      if (isFetchMore) {
        discoverStore.setCategoryProducts([...discoverStore.categoryProducts, ...products]);
      } else {
        discoverStore.setCategoryProducts(products);
      }
    }
  } catch (err) {
    console.log({ fetchCategoryProducts: err });
  }
  discoverStore.setFetchingProducts(false);
};
const searchProducts = async (query = '', isFetchMore, orderBy = 'id', orderType = 'desc') => {
  discoverStore.setFetchingProducts(true);
  try {
    if (isFetchMore) {
      discoverStore.setCurrentSearchPage(discoverStore.currentSearchPage + 1);
    } else {
      discoverStore.setCurrentSearchPage(0);
    }
    const response = await get(
      `${baseUrl}/products?page=${discoverStore.currentSearchPage}&limit=${ITEM_EACH_PAGE}&orderBy=${orderBy}&orderType=${orderType}&q=${query}`
    );
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id)
      }));
      if (isFetchMore) {
        discoverStore.setSearchProducts([...discoverStore.searchProducts, ...products]);
      } else {
        discoverStore.setSearchProducts(products);
      }
    }
  } catch (e) {
    console.log({ searchProducts: e });
  }
};
let hasNoMore = false;
const searchRestaurants = async (query = '', isFetchMore) => {
  discoverStore.setFetchingRestaurants(true);
  try {
    if (isFetchMore) {
      if (hasNoMore) {
        discoverStore.setFetchingRestaurants(false);
        return;
      }
      discoverStore.setCurrentRestaurantPage(discoverStore.currentRestaurantPage + 1);
    } else {
      hasNoMore = false;
      discoverStore.setCurrentRestaurantPage(0);
    }
    const response = await get(`${baseUrl}/restaurants?page=${discoverStore.currentRestaurantPage}&limit=${ITEM_EACH_PAGE}&q=${query}`);
    if (response.success) {
      const restaurants = response.data.map(restaurant => ({
        ...restaurant,
        favorite: userStore.getIsFavoriteRestaurant(restaurant.id)
      }));
      if (isFetchMore) {
        if (restaurants.length === 0) {
          hasNoMore = true;
          discoverStore.setFetchingRestaurants(false);
          return;
        }
        discoverStore.setSearchRestaurants([...discoverStore.searchRestaurants, ...restaurants]);
      } else {
        discoverStore.setSearchRestaurants(restaurants);
      }
    }
  } catch (e) {
    console.log({ searchRestaurants: e });
  }
  discoverStore.setFetchingRestaurants(false);
};

export default {
  fetchCategoryProducts,
  searchProducts,
  searchRestaurants
};
