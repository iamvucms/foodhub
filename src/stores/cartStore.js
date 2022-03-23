import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { compareCartItemAddOns } from '../utils';

class CartStore {
  cartItems = [];
  tax = 0.1;
  fee = 1;
  delivery_fee = 2.5;
  constructor() {
    makeObservable(this, {
      cartItems: observable,
      tax: observable,
      addCartItem: action,
      updateCartItemAmount: action,
      removeCartItem: action,
      subTotal: computed
    });
  }
  addCartItem(cartItem) {
    const item = this.cartItems.find(item => item.product_id === cartItem.product_id);
    if (item) {
      const check = compareCartItemAddOns(item, cartItem);
      if (check) {
        item.amount += cartItem.amount;
      } else {
        this.cartItems.push(cartItem);
      }
    } else {
      this.cartItems.push(cartItem);
    }
  }
  updateCartItemAmount(itemId, amount) {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      if (amount === 0) {
        this.removeCartItem(itemId);
      } else {
        item.amount = amount;
      }
    }
  }
  removeCartItem(itemId) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }
  get subTotal() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.amount + item.options.reduce((sum2, item2) => sum2 + item2.price, 0),
      0
    );
  }
  get taxAndFee() {
    return (this.tax * this.subTotal + this.fee).toFixed(2);
  }
  get total() {
    return this.subTotal + this.taxAndFee + this.delivery_fee;
  }
  get cartItemsCount() {
    return this.cartItems.length;
  }
  get cartItemsTotalAmount() {
    return this.cartItems.reduce((sum, item) => sum + item.amount, 0);
  }
}
export default CartStore;
