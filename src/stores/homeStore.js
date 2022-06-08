import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { ignorePersistNodes } from '../utils';

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
    return this.products.find(p => p.id === productId);
  }
}
export default HomeStore;
