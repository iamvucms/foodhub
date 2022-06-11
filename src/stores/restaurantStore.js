import { action, makeObservable, observable } from 'mobx';
import { ignorePersistNodes } from '../utils';

class RestaurantStore {
  restaurant = null;
  products = [];
  reviews = [];
  categoryProducts = [];
  hiddenReviewIds = [];
  fetchingProducts = false;
  fetchingMoreProducts = false;
  fetchingCategoryProducts = false;
  fetchingMoreCategoryProducts = false;
  currentPage = 0;
  currentCategoryPage = 0;
  fetchingReviews = false;
  currentReviewPage = 0;
  constructor() {
    ignorePersistNodes(this, [
      'fetchingProducts',
      'currentPage',
      'currentCategoryPage',
      'fetchingCategoryProducts',
      'fetchingMoreCategoryProducts',
      'fetchingMoreProducts',
      'fetchingReviews',
      'currentReviewPage'
    ]);
    makeObservable(this, {
      restaurant: observable,
      products: observable,
      reviews: observable,
      categoryProducts: observable,
      fetchingProducts: observable,
      fetchingMoreProducts: observable,
      fetchingCategoryProducts: observable,
      fetchingMoreCategoryProducts: observable,
      fetchingReviews: observable,
      hiddenReviewIds: observable,
      addHiddenReviewId: action,
      removeHiddenReviewId: action,
      setRestaurant: action,
      setProducts: action,
      setReviews: action,
      setFetchingReviews: action,
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
  addHiddenReviewId(reviewId) {
    this.hiddenReviewIds.push(reviewId);
  }
  removeHiddenReviewId(reviewId) {
    this.hiddenReviewIds = this.hiddenReviewIds.filter(id => id !== reviewId);
  }
  setRestaurant(restaurant) {
    this.restaurant = restaurant;
  }
  setProducts(products) {
    this.products = products;
  }
  setReviews(reviews) {
    this.reviews = reviews;
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
  setCurrentReviewPage(currentReviewPage) {
    this.currentReviewPage = currentReviewPage;
  }
  setFetchingMoreProducts(fetchingMoreProducts) {
    this.fetchingMoreProducts = fetchingMoreProducts;
  }
  setFetchingMoreCategoryProducts(fetchingMoreCategoryProducts) {
    this.fetchingMoreCategoryProducts = fetchingMoreCategoryProducts;
  }
  setFetchingReviews(fetchingReviews) {
    this.fetchingReviews = fetchingReviews;
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
