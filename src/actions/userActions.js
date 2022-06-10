import { baseAuthUrl, baseUrl } from '../constants';
import { navigation, navigationRef } from '../navigation/navigationRef';
import { discoverStore, homeStore, restaurantStore, userStore } from '../stores';
import { deleteRequest, get, post, postDelete, standardizeImageType, storeItem, uploadImage } from '../utils';
const registerUser = async ({ name, password, emailOrPhone }, onRegister) => {
  userStore.setSigningUp(true);
  const response = await post(`${baseAuthUrl}/register`, {
    name: name.toLowerCase(),
    password,
    emailOrPhone: emailOrPhone.toLowerCase()
  });
  if (response.success) {
    const { data } = response;
    userStore.setUser(data);
    //OTP verification
    onRegister && onRegister();
  } else {
    userStore.setSignUpError(response.error);
  }
  userStore.setSigningUp(false);
};
const loginUser = async ({ emailOrPhone, password }) => {
  userStore.setLoggingIn(true);
  const response = await post(`${baseAuthUrl}`, {
    emailOrPhone: emailOrPhone.toLowerCase(),
    password
  });
  if (response.success) {
    const { data } = response;
    storeItem('accessToken', data.accessToken);
    storeItem('refreshToken', data.refreshToken);
    userStore.setUser(response.data);
    userStore.setLogined(true);
  } else {
    userStore.setLogInError(response.error);
  }
  userStore.setLoggingIn(false);
};
const logout = async () => {
  userStore.setLogined(false);
  userStore.setUser({});
  storeItem('accessToken', '');
  storeItem('refreshToken', '');
};
const verifyOTP = async ({ otp }) => {
  if (!('user_id' in userStore.user)) {
    userStore.setVerifyOTPError('User not found');
    return;
  }
  userStore.setVerifyingOTP(true);
  const response = await post(`${baseAuthUrl}/verify-otp`, { otp, user_id: userStore.user.user_id });
  if (response.success) {
    const { data } = response;
    storeItem('accessToken', data.accessToken);
    storeItem('refreshToken', data.refreshToken);
    userStore.setUser(response.data);
    navigationRef.navigate('SignUpRole', {
      user: response.data
    });
  } else {
    userStore.setVerifyOTPError(response.error);
  }
  userStore.setVerifyingOTP(false);
};
const fetchAddresses = async () => {
  const response = await get(`${baseUrl}/address`);
  if (response.success) {
    userStore.setAddresses(response.data);
  }
};
const markAddressAsMain = async ({ address }) => {
  userStore.selectMainAddress(address.id);
  const response = await post(`${baseUrl}/address/${address.id}`, {
    address: {
      selected: true
    }
  });
  if (!response.success) {
    console.log(response.error);
  }
};
const addAddress = async ({ address }) => {
  userStore.setAddingAddress(true);
  const response = await post(`${baseUrl}/address`, {
    address: {
      ...address,
      user_id: userStore.user.user_id
    }
  });
  if (response.success) {
    userStore.setAddresses(response.data);
    navigation.navigate('UserAddress');
  } else {
    userStore.setAddAddressError(response.error);
  }
  userStore.setAddingAddress(false);
};
const removeAddress = async ({ addressId }) => {
  const response = await postDelete(`${baseUrl}/address/${addressId}`);
  if (response.success) {
    userStore.removeAddress(addressId);
  }
};
const updateAddress = async ({ address }) => {
  userStore.setAddingAddress(true);
  const response = await post(`${baseUrl}/address/${address.id}`, {
    address
  });
  if (response.success) {
    userStore.updateAddress(address);
    navigation.navigate('UserAddress');
  } else {
    userStore.setAddAddressError(response.error);
  }
  userStore.setAddingAddress(false);
};
const toggleFavoriteRestaurant = ({ restaurantId }) => {
  const isFavorite = userStore.getIsFavoriteRestaurant(restaurantId);
  restaurantStore.setFavoriteRestaurant(restaurantId, !isFavorite);
  homeStore.setFavoriteRestaurant(restaurantId, !isFavorite);
  const userStoreAction = isFavorite ? 'removeFavoriteRestaurant' : 'addFavoriteRestaurant';
  userStore[userStoreAction](restaurantId);
};
const toggleFavoriteProduct = ({ productId }) => {
  const isFavorite = userStore.getIsFavoriteProduct(productId);
  restaurantStore.setFavoriteProduct(productId, !isFavorite);
  homeStore.setFavoriteProduct(productId, !isFavorite);
  discoverStore.setFavoriteProduct(productId, !isFavorite);
  const userStoreAction = isFavorite ? 'removeFavoriteProduct' : 'addFavoriteProduct';
  userStore[userStoreAction](productId);
};
const updateUserInformation = async updatedUser => {
  try {
    const response = await post(`${baseUrl}/user`, {
      ...updatedUser
    });
    if (response.success) {
      userStore.setUser({
        ...userStore.user,
        ...response.data
      });
    }
  } catch (e) {}
};
const requestRefreshToken = async () => {
  try {
    const response = await post(`${baseAuthUrl}/refresh-token`, {
      refreshToken: userStore.user.refreshToken,
      emailOrPhone: userStore.user.emailOrPhone
    });
    if (response.success) {
      const { data } = response;
      storeItem('accessToken', data.accessToken);
      userStore.setAccessToken(data.accessToken);
    } else {
      logout();
    }
  } catch (e) {
    console.log({ requestRefreshToken: e });
  }
};
const createRestaurant = async ({ name, logo, cover_image, address, delivery_fee }) => {
  userStore.setCreatingRestaurant(true);
  try {
    const uploadedLogo = await uploadImage(logo.uri, standardizeImageType(logo.type));
    const uploadedCover = await uploadImage(cover_image.uri, standardizeImageType(cover_image.type));
    const response = await post(`${baseUrl}/restaurants`, {
      name,
      logo: uploadedLogo.uri,
      cover_image: uploadedCover.uri,
      address,
      delivery_fee,
      owner_id: userStore.user.user_id
    });
    if (response.success) {
      userStore.setUser({
        ...userStore.user,
        restaurant: response.data
      });
      userStore.setLogined(true);
    }
  } catch (e) {
    console.log({ createRestaurant: e });
  }
  userStore.setCreatingRestaurant(false);
};
const updateRestaurant = async ({ name, logo, cover_image, address, delivery_fee }) => {
  try {
    let uploadedLogo = null;
    let uploadedCover = null;
    if (logo) {
      uploadedLogo = await uploadImage(logo.uri, standardizeImageType(logo.type));
    }
    if (cover_image) {
      uploadedCover = await uploadImage(cover_image.uri, standardizeImageType(cover_image.type));
    }
    const response = await post(`${baseUrl}/restaurants/${userStore.restaurant.id}`, {
      name,
      logo: uploadedLogo?.uri,
      cover_image: uploadedCover?.uri,
      address,
      delivery_fee
    });
    if (response.success) {
      userStore.setRestaurant(response.data);
    }
  } catch (e) {
    console.log({ updateRestaurant: e });
  }
};
const fetchRestaurantProducts = async () => {
  try {
    if (!userStore.restaurant) {
      return;
    }
    const restaurantId = userStore.restaurant.id;
    const response = await get(`${baseUrl}/restaurants/${restaurantId}/products?limit=99999`);
    if (response.success) {
      userStore.setRestaurantProducts(response.data);
    }
  } catch (e) {}
};
const deleteRestaurantProduct = async productId => {
  try {
    const response = await postDelete(`${baseUrl}/products/${productId}`);
    if (response.success) {
      userStore.removeRestaurantProduct(productId);
      homeStore.removeProduct(productId);
    }
  } catch (e) {
    console.log({ deleteRestaurantProduct: e });
  }
};
const createRestaurantProduct = async ({ name, price, description, cat_id, image, addons = [] }) => {
  try {
    if (!userStore.restaurant) {
      return;
    }
    const restaurantId = userStore.restaurant.id;
    const uploadedImage = await uploadImage(image.uri, standardizeImageType(image.type));
    const updatedAddons = await Promise.all(
      addons.map(async addon => {
        const uploadedAddonImage = await uploadImage(addon.image.uri, standardizeImageType(addon.image.type));
        return {
          ...addon,
          image: uploadedAddonImage.uri
        };
      })
    );
    const response = await post(`${baseUrl}/products`, {
      product: {
        name,
        price,
        description,
        cat_id,
        res_id: restaurantId,
        image: uploadedImage.uri
      },
      addons: updatedAddons
    });
    if (response.success) {
      userStore.addRestaurantProduct(response.data);
    }
  } catch (e) {
    console.log({ createRestaurantProduct: e });
  }
};
const updateRestaurantProduct = async ({ name, price, description, cat_id, image, productId, addons }) => {
  try {
    if (!userStore.restaurant) {
      return;
    }
    let uploadedImage = null;

    if (image) {
      uploadedImage = await uploadImage(image.uri, standardizeImageType(image.type));
    }
    await Promise.all(
      addons.map(async addon => {
        if (addon.isDeleted) {
          await deleteRequest(`${baseUrl}/addons/${addon.id}`);
        } else if (addon.isChanged) {
          const uploadedAddonImage = addon.image.uri.startsWith('file')
            ? await uploadImage(addon.image.uri, standardizeImageType(addon.image.type))
            : addon.image;
          if (addon.id) {
            await post(`${baseUrl}/addons/${addon.id}`, {
              name: addon.name,
              price: addon.price,
              image: uploadedAddonImage.uri
            });
          } else {
            await post(`${baseUrl}/addons`, {
              productId,
              addons: [
                {
                  name: addon.name,
                  price: addon.price,
                  image: uploadedAddonImage.uri
                }
              ]
            });
          }
        }
      })
    );
    const response = await post(`${baseUrl}/products/${productId}`, {
      name,
      price,
      description,
      cat_id,
      image: uploadedImage?.uri
    });
    if (response.success) {
      userStore.updateRestaurantProduct(response.data);
    }
  } catch (e) {
    console.log({ updateRestaurantProduct: e });
  }
};
const fetchUserInformation = async () => {
  const listOfActions = [fetchAddresses];
  return await Promise.all(listOfActions.map(action => action()));
};
export default {
  registerUser,
  loginUser,
  logout,
  verifyOTP,
  fetchAddresses,
  markAddressAsMain,
  addAddress,
  removeAddress,
  updateAddress,
  toggleFavoriteRestaurant,
  toggleFavoriteProduct,
  fetchUserInformation,
  updateUserInformation,
  requestRefreshToken,
  createRestaurant,
  updateRestaurant,
  fetchRestaurantProducts,
  deleteRestaurantProduct,
  createRestaurantProduct,
  updateRestaurantProduct
};
