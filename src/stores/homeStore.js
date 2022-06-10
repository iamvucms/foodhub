import { makeAutoObservable } from 'mobx';
import { discoverStore, restaurantStore } from '.';

class HomeStore {
  products = [];
  restaurants = [];
  suggestProducts = [];
  constructor() {
    makeAutoObservable(this);
  }
  setSuggestProducts(suggestProducts) {
    this.suggestProducts = suggestProducts;
  }
  setFavoriteRestaurant(restaurantId, favorite) {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.favorite = favorite;
    }
  }
  setFavoriteProduct(productId, favorite) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.favorite = favorite;
    }
  }
  setRestaurants(restaurants) {
    this.restaurants = restaurants;
  }
  setProducts(products) {
    this.products = products;
  }
  getProduct(productId) {
    return (
      this.products.find(p => p.id === productId) ||
      discoverStore.searchProducts.find(p => p.id === productId) ||
      restaurantStore.categoryProducts.find(p => p.id === productId)
    );
  }
  removeProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
  }
}
export default HomeStore;
