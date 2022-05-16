import { action, makeObservable, observable } from 'mobx';
import { ignorePersistNodes } from '../utils';

class RestaurantStore {
  restaurant = null;
  products = [];
  categoryProducts = [];
  fetchingProducts = false;
  fetchingMoreProducts = false;
  fetchingCategoryProducts = false;
  fetchingMoreCategoryProducts = false;
  currentPage = 0;
  currentCategoryPage = 0;
  constructor() {
    ignorePersistNodes(this, [
      'fetchingProducts',
      'currentPage',
      'currentCategoryPage',
      'fetchingCategoryProducts',
      'fetchingMoreCategoryProducts',
      'fetchingMoreProducts'
    ]);
    makeObservable(this, {
      restaurant: observable,
      products: observable,
      categoryProducts: observable,
      fetchingProducts: observable,
      fetchingMoreProducts: observable,
      fetchingCategoryProducts: observable,
      fetchingMoreCategoryProducts: observable,
      currentPage: observable,
      currentCategoryPage: observable,
      setRestaurant: action,
      setProducts: action,
      setCategoryProducts: action,
      setFetchingProducts: action,
      setFetchingCategoryProducts: action,
      setFetchingMoreProducts: action,
      setFetchingMoreCategoryProducts: action,
      setCurrentPage: action,
      setCurrentCategoryPage: action,
      setFavoriteRestaurant: action,
      setFavoriteProduct: action
    });
  }
  setRestaurant(restaurant) {
    this.restaurant = restaurant;
  }
  setProducts(products) {
    this.products = products;
  }
  setCategoryProducts(categoryProducts) {
    this.categoryProducts = categoryProducts;
  }
  setFetchingProducts(fetchingProducts) {
    this.fetchingProducts = fetchingProducts;
  }
  setFetchingCategoryProducts(fetchingCategoryProducts) {
    this.fetchingCategoryProducts = fetchingCategoryProducts;
  }
  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }
  setCurrentCategoryPage(currentCategoryPage) {
    this.currentCategoryPage = currentCategoryPage;
  }
  setFetchingMoreProducts(fetchingMoreProducts) {
    this.fetchingMoreProducts = fetchingMoreProducts;
  }
  setFetchingMoreCategoryProducts(fetchingMoreCategoryProducts) {
    this.fetchingMoreCategoryProducts = fetchingMoreCategoryProducts;
  }
  setFavoriteRestaurant(restaurantId, favorite) {
    if (this.restaurant.id === restaurantId) {
      this.restaurant.favorite = favorite;
    }
  }
  setFavoriteProduct(productId, favorite) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.favorite = favorite;
    }
    const product2 = this.categoryProducts.find(p => p.id === productId);
    if (product2) {
      product2.favorite = favorite;
    }
  }
}
export default RestaurantStore;
