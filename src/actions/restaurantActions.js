import { baseUrl } from '../constants';
import { ITEM_EACH_PAGE } from '../constants/data';
import { restaurantStore, userStore } from '../stores';
import { get, post } from '../utils';

const fetchRestaurantProducts = async ({ restaurantId, isFetchMore = false }) => {
  try {
    if (isFetchMore) {
      restaurantStore.setCurrentPage(restaurantStore.currentPage + 1);
    } else {
      restaurantStore.setCurrentPage(0);
    }
    restaurantStore.setFetchingProducts(true);
    const response = await get(
      `${baseUrl}/restaurants/${restaurantId}/products?page=${restaurantStore.currentPage}&limit=${ITEM_EACH_PAGE}&orderBy=avg_rating`
    );
    if (response.success) {
      const products = response.data.map(product => ({
        ...product,
        favorite: userStore.getIsFavoriteProduct(product.id),
        avg_rating: (product.avg_rating || 0).toFixed(1)
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
const fetchRestaurantReviews = async ({ restaurantId, isFetchMore }) => {
  restaurantStore.setFetchingReviews(true);
  try {
    if (isFetchMore) {
      restaurantStore.setCurrentReviewPage(restaurantStore.currentReviewPage + 1);
    } else {
      restaurantStore.setCurrentReviewPage(0);
    }
    const response = await get(
      `${baseUrl}/restaurants/${restaurantId}/reviews?page=${restaurantStore.currentReviewPage}&limit=${ITEM_EACH_PAGE}`
    );
    if (response.success) {
      if (isFetchMore) {
        restaurantStore.setReviews(restaurantStore.reviews.concat(response.data));
      } else {
        restaurantStore.setReviews(response.data);
      }
    }
  } catch (e) {
    console.log({ fetchRestaurantReviews: e });
  }
  restaurantStore.setFetchingReviews(false);
};
const fetchProductReviews = async ({ productId, isFetchMore }) => {
  restaurantStore.setFetchingReviews(true);
  try {
    if (isFetchMore) {
      restaurantStore.setCurrentReviewPage(restaurantStore.currentReviewPage + 1);
    } else {
      restaurantStore.setCurrentReviewPage(0);
    }
    const response = await get(
      `${baseUrl}/products/${productId}/reviews?page=${restaurantStore.currentReviewPage}&limit=${ITEM_EACH_PAGE}`
    );
    if (response.success) {
      if (isFetchMore) {
        restaurantStore.setReviews(restaurantStore.reviews.concat(response.data));
      } else {
        restaurantStore.setReviews(response.data);
      }
    }
  } catch (e) {
    console.log({ fetchRestaurantReviews: e });
  }
  restaurantStore.setFetchingReviews(false);
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
      `${baseUrl}/restaurants/${restaurantId}/products?page=${restaurantStore.currentCategoryPage}&limit=${ITEM_EACH_PAGE}${
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
const createReview = async ({ restaurantId, review, orderId, productId }) => {
  try {
    if (productId) {
      await post(`${baseUrl}/products/${productId}/reviews`, { review, orderId });
    } else if (restaurantId) {
      await post(`${baseUrl}/restaurants/${restaurantId}/reviews`, { review, orderId });
    } else {
      throw new Error('No restaurantId or productId');
    }
  } catch (e) {
    console.log({ createReview: e });
  }
};
const fetchRestaurant = async ({ restaurantId }) => {
  const listOfActions = [fetchRestaurantCategoryProducts, fetchRestaurantProducts];
  return await Promise.all(listOfActions.map(action => action({ restaurantId })));
};
export default {
  fetchRestaurant,
  fetchRestaurantProducts,
  fetchRestaurantCategoryProducts,
  fetchRestaurantReviews,
  fetchProductReviews,
  createReview
};
