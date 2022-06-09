const { makeObservable, observable, action } = require('mobx');

export class DiscoverStore {
  categoryProducts = [];
  searchProducts = [];
  searchRestaurants = [];
  currentCategoryPage = 1;
  currentSearchPage = 1;
  currentRestaurantPage = 1;
  fetchingProducts = false;
  fetchingRestaurants = false;
  constructor() {
    makeObservable(this, {
      categoryProducts: observable,
      searchProducts: observable,
      fetchingProducts: observable,
      searchRestaurants: observable,
      fetchingRestaurants: observable,
      setCurrentCategoryPage: action,
      setCurrentSearchPage: action,
      setFavoriteProduct: action,
      setCategoryProducts: action,
      setSearchProducts: action,
      setFetchingProducts: action,
      setSearchRestaurants: action,
      setCurrentRestaurantPage: action,
      setFetchingRestaurants: action
    });
  }
  setCategoryProducts(categoryProducts) {
    this.categoryProducts = categoryProducts;
  }
  setSearchProducts(searchProducts) {
    this.searchProducts = searchProducts;
  }
  setCurrentCategoryPage(currentCategoryPage) {
    this.currentCategoryPage = currentCategoryPage;
  }
  setCurrentSearchPage(currentSearchPage) {
    this.currentSearchPage = currentSearchPage;
  }
  setFavoriteProduct(productId, favorite) {
    const product = this.categoryProducts.find(p => p.id === productId);
    if (product) {
      product.favorite = favorite;
    }
    const searchProduct = this.searchProducts.find(p => p.id === productId);
    if (searchProduct) {
      searchProduct.favorite = favorite;
    }
  }
  setFetchingProducts(fetchingProducts) {
    this.fetchingProducts = fetchingProducts;
  }
  setSearchRestaurants(searchRestaurants) {
    this.searchRestaurants = searchRestaurants;
  }
  setCurrentRestaurantPage(currentRestaurantPage) {
    this.currentRestaurantPage = currentRestaurantPage;
  }
  setFetchingRestaurants(fetchingRestaurants) {
    this.fetchingRestaurants = fetchingRestaurants;
  }
}
