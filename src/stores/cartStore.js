import { action, computed, makeAutoObservable, makeObservable, observable, toJS } from 'mobx';
import { homeStore } from '.';
import { compareCartItemAddOns, ignorePersistNodes } from '../utils';

class CartStore {
  cartItems = [];
  tax = 0.1;
  fee = 1;
  constructor() {
    makeObservable(this, {
      cartItems: observable,
      tax: observable,
      addCartItem: action,
      addCartItems: action,
      updateCartItemAmount: action,
      removeCartItem: action,
      emptyCart: action,
      subTotal: computed,
      cartToOrders: computed
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
  addCartItems(cartItems) {
    cartItems.forEach(cartItem => this.addCartItem(cartItem));
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
  emptyCart() {
    this.cartItems = [];
  }
  get cartToOrders() {
    //group cartitem by restaurant
    const groupedCartItems = this.cartItems
      .reduce((groupedCartItems, cartItem) => {
        const group = groupedCartItems.find(group => group.restaurantId === cartItem.res_id);
        if (group) {
          group.cartItems.push(cartItem);
        } else {
          groupedCartItems.push({
            restaurantId: cartItem.res_id,
            cartItems: [cartItem]
          });
        }
        return groupedCartItems;
      }, [])
      .map(group => {
        const restaurantId = group.restaurantId;
        const restaurant = homeStore.restaurants.find(restaurant => restaurant.id === restaurantId);
        group.restaurant = toJS(restaurant);
        return group;
      });
    return groupedCartItems;
  }
  get deliveryFee() {
    return this.cartToOrders.reduce((sum, item) => {
      return sum + item.restaurant.delivery_fee;
    }, 0);
  }
  get subTotal() {
    return this.cartItems
      .reduce((sum, item) => sum + item.price * item.amount + item.options.reduce((sum2, item2) => sum2 + item2.price, 0), 0)
      .toFixed(2);
  }
  get taxAndFee() {
    return (this.tax * this.subTotal - -this.fee).toFixed(2);
  }
  get total() {
    return this.subTotal - -this.taxAndFee - -this.deliveryFee;
  }
  get cartItemsCount() {
    return this.cartItems.length;
  }
  get cartItemsTotalAmount() {
    return this.cartItems.reduce((sum, item) => sum + item.amount, 0);
  }
}
export default CartStore;
