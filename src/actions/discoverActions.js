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
export default {
  fetchCategoryProducts
};
