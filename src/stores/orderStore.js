import { action, makeObservable, observable } from 'mobx';
import { userStore } from '.';
import { OrderStatusCode } from '../constants/data';
import { ignorePersistNodes } from '../utils';

class OrderStore {
  orders = [];
  orderHistory = [];
  fetchingOrders = false;
  currentPage = 0;
  currentHistoryPage = 0;
  constructor() {
    ignorePersistNodes(this, ['fetchingOrders']);
    makeObservable(this, {
      orders: observable,
      orderHistory: observable,
      fetchingOrders: observable,
      currentPage: observable,
      currentHistoryPage: observable,
      setOrders: action,
      setFetchingOrder: action,
      setCurrentPage: action,
      setOrderHistory: action,
      updateOrderStatus: action,
      setCurrentHistoryPage: action
    });
  }
  setOrders(orders) {
    this.orders = orders;
  }
  setFetchingOrder(fetchingOrders) {
    this.fetchingOrders = fetchingOrders;
  }
  setCurrentPage(page) {
    this.currentPage = page;
  }
  setCurrentHistoryPage(page) {
    this.currentHistoryPage = page;
  }
  setOrderHistory(orderHistory) {
    this.orderHistory = orderHistory;
  }
  updateOrderStatus(orderId, statusCode) {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status_code = statusCode;
    }
  }
  getOrder(orderId) {
    return (
      this.orders.find(order => order.id === orderId) ||
      this.orderHistory.find(order => order.id === orderId) ||
      userStore.restaurantOrders.find(order => order.id === orderId)
    );
  }
}
export default OrderStore;
