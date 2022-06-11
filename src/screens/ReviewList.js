import { Observer, useLocalObservable } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { FlatList, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import restaurantActions from '../actions/restaurantActions';
import { BottomSheet, Container, FText, Header, Padding, ReviewCard } from '../components';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { restaurantStore } from '../stores';
import { isAndroid, setValue, setXAxisValue, setYAxisValue, toCorrectImageUri } from '../utils';

const { height } = Layout.window;
const RestaurantReviews = ({ navigation, route }) => {
  const { data, isProductReviews } = route.params;
  const { bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef();
  const state = useLocalObservable(() => ({
    review: null,
    setReview: review => {
      state.review = review;
    }
  }));
  useEffect(() => {
    if (isProductReviews) {
      restaurantActions.fetchProductReviews({
        productId: data.id
      });
    } else {
      restaurantActions.fetchRestaurantReviews({
        restaurantId: data.id
      });
    }
  }, []);
  const onLeftPress = React.useCallback(() => navigation.goBack(), []);
  const onHideReviewPress = React.useCallback(() => {
    bottomSheetRef.current.snapTo(0);
    restaurantStore.addHiddenReviewId(state.review.id);
    state.setReview(null);
  }, []);
  const renderReviewItem = React.useCallback(({ item }) => {
    const onOptionPress = () => {
      bottomSheetRef.current.snapTo(1);
      state.setReview(item);
    };
    return (
      <Observer>
        {() => {
          const isHidden = restaurantStore.hiddenReviewIds.includes(item.id);
          const onPress = () => {
            if (isHidden) {
              restaurantStore.removeHiddenReviewId(item.id);
            }
          };
          return (
            <Pressable
              onPress={onPress}
              style={[
                styles.cardItem,
                isHidden && {
                  opacity: 0.3
                }
              ]}>
              <ReviewCard onOptionPress={onOptionPress} data={item} />
            </Pressable>
          );
        }}
      </Observer>
    );
  }, []);
  const reviewKeyExtractor = item => `review_${item.id}`;
  return (
    <Container>
      <Header onLeftPress={onLeftPress} title="Reviews" />
      <Padding paddingTop={20} />
      <Observer>
        {() => <FlatList data={restaurantStore.reviews.slice()} renderItem={renderReviewItem} keyExtractor={reviewKeyExtractor} />}
      </Observer>
      {!isAndroid && <KeyboardSpacer topSpacing={-bottom} />}
      <BottomSheet snapPoints={[0, height / 2]} ref={bottomSheetRef}>
        <View style={styles.bottomSheetContainer}>
          <Observer>
            {() => (
              <React.Fragment>
                {state.review && (
                  <View style={styles.reviewInfo}>
                    <View style={styles.reviewAvatarContainer}>
                      <Image
                        style={styles.reviewAvatar}
                        source={{
                          uri: toCorrectImageUri(state.review.reviewer_avatar)
                        }}
                      />
                      <View style={styles.rating}>
                        <FText fontSize={10} color={Colors.white}>
                          {state.review.rating.toFixed(1)}
                        </FText>
                      </View>
                    </View>
                    <FText fontSize="medium" fontWeight={700}>
                      {state.review.reviewer_name}
                    </FText>
                    <View style={styles.reviewContent}>
                      <FText fontSize="small" color={Colors.aslo_gray}>
                        {state.review.content}
                      </FText>
                    </View>
                  </View>
                )}
              </React.Fragment>
            )}
          </Observer>
          <View style={styles.spacer} />
          <TouchableOpacity onPress={onHideReviewPress} style={styles.btnAction}>
            <FText>Hide this Review</FText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAction}>
            <FText>Report this Review</FText>
          </TouchableOpacity>
        </View>
        <Padding paddingTop={bottom} />
      </BottomSheet>
    </Container>
  );
};

export default RestaurantReviews;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: setXAxisValue(26),
    paddingBottom: setYAxisValue(35)
  },
  reviewInputContainer: {
    marginTop: setYAxisValue(29),
    height: setYAxisValue(51),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: setValue(10),
    borderColor: 'rgba(238, 238, 238, 1)',
    borderWidth: setValue(1),
    paddingHorizontal: setXAxisValue(10)
  },
  reviewInput: {
    flex: 1,
    paddingLeft: setXAxisValue(10),
    color: Colors.typography,
    fontSize: setYAxisValue(16),
    height: '100%',
    fontFamily: 'SofiaPro-Medium'
  },
  avatarContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    height: setValue(30),
    width: setValue(30),
    borderRadius: 99
  },
  cardItem: {
    marginHorizontal: setXAxisValue(26)
  },
  bottomSheetContainer: {
    flex: 1
  },
  reviewInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: setYAxisValue(20)
  },
  reviewAvatarContainer: {
    height: setValue(80),
    width: setValue(80),
    borderRadius: 99,
    marginBottom: setYAxisValue(15)
  },
  reviewAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
    borderColor: Colors.white,
    borderWidth: setValue(2)
  },
  rating: {
    position: 'absolute',
    zIndex: 99,
    height: setValue(22),
    width: setValue(24),
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    right: setValue(2),
    bottom: setValue(2),
    borderColor: Colors.white,
    borderWidth: 2
  },
  reviewContent: {
    padding: setValue(10),
    backgroundColor: Colors.lighter_border,
    marginTop: setYAxisValue(20)
  },
  btnAction: {
    paddingHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(12),
    borderBottomColor: Colors.lighter_border,
    borderBottomWidth: setYAxisValue(1),
    flexDirection: 'row',
    alignItems: 'center'
  },
  spacer: {
    flex: 1
  }
});
