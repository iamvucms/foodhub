const { makeObservable, observable, action } = require('mobx');

export class DiscoverStore {
  categoryProducts = [];
  currentCategoryPage = 1;
  searchProducts = [];
  currentSearchPage = 1;
  fetchingProducts = false;
  constructor() {
    makeObservable(this, {
      categoryProducts: observable,
      searchProducts: observable,
      currentCategoryPage: observable,
      setCurrentCategoryPage: action,
      setCurrentSearchPage: action,
      setFavoriteProduct: action,
      setCategoryProducts: action,
      setSearchProducts: action,
      setFetchingProducts: action
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
}
