import { GpsSvg, OrderSvg, ProfileSvg } from '../assets/svg';

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
  Popular: 'Popular',
  PriceLowToHigh: 'Price Low to High',
  PriceHighToLow: 'Price High to Low',
  HighestRated: 'Highest Rated'
};
export const OrderStatus = {
  Pending: 'Pending',
  Preparing: 'Preparing',
  Ready: 'Ready',
  Delivered: 'Delivered',
  Delivering: 'Delivering',
  Cancelled: 'Cancelled'
};
export const OrderStatusColor = {
  Pending: '#f1c40f',
  Preparing: '#3498db',
  Ready: '#2ecc71',
  Delivered: '#2ecc71',
  Delivering: '#2ecc71',
  Cancelled: '#e74c3c'
};
export const OrderStatusDescription = {
  Pending: 'Your order is being processed',
  Preparing: 'Your order is being prepared',
  Ready: 'Your order is ready for delivery',
  Delivered: 'Your order has been delivered',
  Delivering: 'Your order is on the way',
  Cancelled: 'Your order has been cancelled'
};
export const drawerMenus = [
  {
    name: 'My Orders',
    routeName: 'Order',
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
