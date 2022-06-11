import { GpsSvg, OrderSvg, ProfileSvg } from '../assets/svg';
import { Colors } from './colors';
export const ITEM_EACH_PAGE = 10;
export const OrderStatusCode = {
  PENDING: 1,
  CONFIRMED: 2,
  PREPARING: 3,
  PREPARED: 4,
  DELIVERING: 5,
  DELIVERED: 6,
  REJECTED: 7,
  CANCELLED: 8
};
export const FoodCategories = [
  {
    id: 1,
    name: 'Burger',
    image: require('../assets/images/burger.png'),
    banner: require('../assets/images/pizza-banner.png')
  },
  {
    id: 2,
    name: 'Pizza',
    image: require('../assets/images/pizza.png'),
    banner: require('../assets/images/pizza-banner.png')
  },
  {
    id: 3,
    name: 'Donut',
    image: require('../assets/images/donut.png'),
    banner: require('../assets/images/pizza-banner.png')
  },
  {
    id: 4,
    name: 'Mexican',
    image: require('../assets/images/mexican.png'),
    banner: require('../assets/images/pizza-banner.png')
  },
  {
    id: 5,
    name: 'Asian',
    image: require('../assets/images/asian.png'),
    banner: require('../assets/images/pizza-banner.png')
  }
];
export const SortTypes = {
  Popular: {
    name: 'Popular',
    orderBy: 'total_reviews',
    orderType: 'desc'
  },
  PriceLowToHigh: {
    name: 'Price Low to High',
    orderBy: 'price',
    orderType: 'asc'
  },
  PriceHighToLow: {
    name: 'Price High to Low',
    orderBy: 'price',
    orderType: 'desc'
  },
  HighestRated: {
    name: 'Highest Rated',
    orderBy: 'avg_rating',
    orderType: 'desc'
  }
};
export const OrderStatus = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  PREPARED: 'Prepared',
  DELIVERING: 'Delivering',
  DELIVERED: 'Delivered',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancalled'
};
export const OrderStatusColor = {
  PENDING: '#f1c40f',
  CONFIRMED: '#3498db',
  PREPARING: '#3498db',
  PREPARED: '#2ecc71',
  DELIVERING: '#2ecc71',
  DELIVERED: Colors.primary,
  REJECTED: Colors.danger,
  CANCELLED: Colors.danger
};
export const OrderStatusDescription = {
  PENDING: 'Your order is pending',
  CONFIRMED: 'Your order is confirmed',
  PREPARING: 'Your order is preparing',
  PREPARED: 'Your order is prepared',
  DELIVERING: 'Your order is delivering',
  DELIVERED: 'Your order is delivered',
  REJECTED: 'Your order is rejected',
  CANCELLED: 'Your order is cancelled'
};
export const PaymentMethods = {
  CASH_ON_DELIVERY: 1,
  CARD: 2
};
export const drawerMenus = [
  {
    name: 'My Orders',
    routeName: 'Orders',
    iconComponent: OrderSvg
  },
  {
    name: 'My Profile',
    routeName: 'Profile',
    iconComponent: ProfileSvg
  },
  {
    name: 'Delivery Address',
    routeName: 'UserAddress',
    iconComponent: GpsSvg
  },
  {
    name: 'Payment Methods',
    routeName: 'PaymentMethods',
    iconSrc: require('../assets/images/wallet.png')
  },
  {
    name: 'Contact Us',
    routeName: 'ContactUs',
    iconSrc: require('../assets/images/message.png')
  },
  {
    name: 'Settings',
    routeName: 'Settings',
    iconSrc: require('../assets/images/setting.png')
  },
  {
    name: 'Help & FAQs',
    routeName: 'Help',
    iconSrc: require('../assets/images/help.png')
  }
];
export const profileSettings = [
  {
    name: 'Delivery Address',
    routeName: 'UserAddress'
  },
  {
    name: 'Change Password',
    routeName: 'ChangePassword'
  },
  {
    name: 'Server Configurations',
    routeName: 'ServerConfigurations'
  },
  {
    name: 'Logout',
    routeName: 'Logout'
  }
];
export const orderProgresses = [
  {
    name: 'Pending',
    status: OrderStatusCode.PENDING,
    description: 'Sent to restaurant'
  },
  {
    name: 'Confirmed',
    status: OrderStatusCode.CONFIRMED,
    description: 'Confirmed by restaurant'
  },
  {
    name: 'Preparing',
    status: OrderStatusCode.PREPARING,
    description: 'Your order is preparing'
  },
  {
    name: 'Prepared',
    status: OrderStatusCode.PREPARED,
    description: 'Your order is prepared'
  },
  {
    name: 'Delivering',
    status: OrderStatusCode.DELIVERING,
    description: 'Your order is delivering'
  },
  {
    name: 'Delivered',
    status: OrderStatusCode.DELIVERED,
    description: 'Your order is delivered'
  }
];
export const restaurantSettings = [
  {
    name: 'Manage Products',
    routeName: 'ProductsManagement'
  },
  {
    name: 'Manage Orders',
    routeName: 'OrdersManagement'
  },
  {
    name: 'Manage Customers',
    routeName: 'CustomersManagement'
  },
  {
    name: 'Update Restaurant Info',
    routeName: 'UpdateRestaurantInfo'
  }
];
