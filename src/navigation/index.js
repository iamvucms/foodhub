import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomTabBar } from '../components';
import Cart from '../screens/Cart';
import CategoryDetail from '../screens/CategoryDetail';
import FoodDetail from '../screens/FoodDetail';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Orders from '../screens/Orders';
import OTPVerification from '../screens/OTPVerification';
import PhoneNumber from '../screens/PhoneNumber';
import Profile from '../screens/Profile';
import ResetPassword from '../screens/ResetPassword';
import RestaurantReview from '../screens/RestaurantReview';
import SignUp from '../screens/SignUp';
import { config } from './config';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const HomeTab = () => (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={config}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
  const HomeStack = () => (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen
        name="FoodDetail"
        options={{
          animation: 'none'
        }}
        component={FoodDetail}
      />
      <Stack.Screen name="RestaurantReview" component={RestaurantReview} />
    </Stack.Navigator>
  );
  const OnboardingStack = () => (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={config}>
        {/* <Stack.Screen name="OnboardingStack" component={OnboardingStack} /> */}
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(AppNavigation);
