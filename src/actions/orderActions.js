import { baseUrl } from '../constants';
import { ITEM_EACH_PAGE } from '../constants/data';
import { orderStore, userStore } from '../stores';
import { get, post } from '../utils';

const fetchOrders = async ({ isFetchMore = false } = {}) => {
  try {
    if (isFetchMore) {
      orderStore.setCurrentPage(orderStore.currentPage + 1);
    } else {
      orderStore.setCurrentPage(0);
    }
    const response = await get(`${baseUrl}/orders?page=${orderStore.currentPage}&limit=${ITEM_EACH_PAGE}`);
    if (response.success) {
      if (isFetchMore) {
        orderStore.setOrders([...orderStore.orders, ...response.data]);
      } else {
        orderStore.setOrders(response.data);
      }
    }
  } catch (e) {
    console.log({
      fetchOrders: e
    });
  }
};
const fetchOrderHistory = async ({ isFetchMore = false } = {}) => {
  try {
    if (isFetchMore) {
      orderStore.setCurrentHistoryPage(orderStore.currentHistoryPage + 1);
    } else {
      orderStore.setCurrentHistoryPage(0);
    }
    const response = await get(`${baseUrl}/orders?page=${orderStore.currentHistoryPage}&limit=${ITEM_EACH_PAGE}&history=1`);
    if (response.success) {
      if (isFetchMore) {
        orderStore.setOrderHistory([...orderStore.orders, ...response.data]);
      } else {
        orderStore.setOrderHistory(response.data);
      }
    }
  } catch (e) {
    console.log({
      fetchOrderHistory: e
    });
  }
};
const createOrder = async ({ products, address, paymentMethod }) => {
  try {
    const response = await post(`${baseUrl}/orders`, {
      products,
      address,
      paymentMethod
    });
    if (response.success && Array.isArray(response.data)) {
      orderStore.setOrders([...response.data, ...orderStore.orders]);
    }
  } catch (e) {
    console.log({
      createOrder: e
    });
  }
};
const updateOrderStatus = async ({ orderId, statusCode }) => {
  try {
    const response = await post(`${baseUrl}/orders/${orderId}`, {
      status_code: statusCode
    });
    if (response.success) {
      orderStore.updateOrderStatus(orderId, statusCode);
      userStore.updateRestaurantOrderStatus(orderId, statusCode);
    }
  } catch (e) {
    console.log({
      updateOrderStatus: e
    });
  }
};
const fetchUserOrders = async () => {
  const listOfActions = [fetchOrders, fetchOrderHistory];
  return await Promise.all(listOfActions.map(action => action()));
};
export default {
  fetchOrders,
  fetchOrderHistory,
  updateOrderStatus,
  fetchUserOrders,
  createOrder
};
