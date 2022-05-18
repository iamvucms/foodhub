import { action, makeObservable, observable } from 'mobx';
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
      updateOrder: action,
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
  updateOrder(orderId, data) {
    if ([OrderStatusCode.CANCELLED, OrderStatusCode.REJECTED, OrderStatusCode.DELIVERED].includes(data.status_code)) {
      const order = this.orders.find(order => order.id === orderId);
      if (order) {
        const newOrder = {
          ...order,
          ...data,
          updated_at: new Date().getTime()
        };
        this.orders = this.orders.filter(order => order.id !== orderId);
        this.orderHistory = [...this.orderHistory, newOrder].sort((a, b) => b.id - a.id);
      }
    } else {
      this.orders = this.orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            ...data,
            updated_at: new Date().getTime()
          };
        }
        return order;
      });
    }
  }
}
export default OrderStore;
