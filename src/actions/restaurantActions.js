import { baseUrl } from '../constants';
import { ItemEachPage } from '../constants/data';
import { restaurantStore, userStore } from '../stores';
import { get } from '../utils';

const fetchRestaurantProducts = async ({ restaurantId, isFetchMore = false }) => {
  try {
    if (isFetchMore) {
      restaurantStore.setCurrentPage(restaurantStore.currentPage + 1);
    } else {
      restaurantStore.setCurrentPage(0);
    }
    restaurantStore.setFetchingProducts(true);
    const response = await get(
      `${baseUrl}/restaurants/${restaurantId}/products?page=${restaurantStore.currentPage}&limit=${ItemEachPage}&orderBy=avg_rating`
    );
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id)
      }));
      if (isFetchMore) {
        restaurantStore.setProducts(restaurantStore.products.concat(products));
      } else {
        restaurantStore.setProducts(products);
      }
    }
    restaurantStore.setFetchingProducts(false);
  } catch (e) {
    restaurantStore.setFetchingProducts(false);
    console.log({ fetchRestaurantProducts: e });
  }
};
const fetchRestaurantCategoryProducts = async ({ restaurantId, categoryId, isFetchMore = false }) => {
  try {
    if (isFetchMore) {
      restaurantStore.setFetchingMoreCategoryProducts(true);
      restaurantStore.setCurrentCategoryPage(restaurantStore.currentCategoryPage + 1);
    } else {
      restaurantStore.setFetchingCategoryProducts(true);
      restaurantStore.setCurrentCategoryPage(0);
    }

    const response = await get(
      `${baseUrl}/restaurants/${restaurantId}/products?page=${restaurantStore.currentCategoryPage}&limit=${ItemEachPage}${
        categoryId ? '&categoryId=' + categoryId : ''
      }`
    );
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id)
      }));
      if (isFetchMore) {
        if (response.data.length === 0) {
          throw new Error('No more products');
        }
        restaurantStore.setCategoryProducts(restaurantStore.categoryProducts.concat(products));
      } else {
        restaurantStore.setCategoryProducts(products);
      }
    }
    restaurantStore.setFetchingCategoryProducts(false);
    restaurantStore.setFetchingMoreCategoryProducts(false);
  } catch (e) {
    restaurantStore.setFetchingCategoryProducts(false);
    restaurantStore.setFetchingMoreCategoryProducts(false);
    console.log({ fetchRestaurantCategoryProducts: e });
  }
};
const fetchRestaurant = async ({ restaurantId }) => {
  const listOfActions = [fetchRestaurantCategoryProducts];
  return await Promise.all(listOfActions.map(action => action({ restaurantId })));
};
export default {
  fetchRestaurant,
  fetchRestaurantProducts,
  fetchRestaurantCategoryProducts
};
