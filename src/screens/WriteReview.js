import { Observer, useLocalObservable } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RestaurantActions } from '../actions';
import { ButtonIcon, Container, FText, Header, Padding, RatingInput } from '../components';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { setValue, setYAxisValue, toCorrectImageUri } from '../utils';

const WriteReview = ({ route, navigation }) => {
  const { data } = route.params;
  const listRef = useRef();
  const numberOfProductReviews = data.products.length;
  const state = useLocalObservable(() => ({
    reviews: new Array(numberOfProductReviews + 1).fill({
      rating: 5,
      content: ''
    }),
    page: 0,
    setPage: page => {
      state.page = page;
    },
    setReview: (index, property, value) => {
      state.reviews[index][property] = value;
    },
    getReview: index => state.reviews[index],
    get isValid() {
      return state.reviews.every(review => review.rating > 0 && review.content.trim().length > 0);
    }
  }));
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onFinishPress = React.useCallback(() => {
    if (state.isValid) {
      const restaurantReview = state.reviews[0];
      RestaurantActions.createReview({
        orderId: data.id,
        review: {
          rating: restaurantReview.rating,
          content: restaurantReview.content
        },
        restaurantId: data.res_id
      });
      state.reviews.slice(1).forEach((productReview, index) => {
        RestaurantActions.createReview({
          orderId: data.id,
          review: {
            rating: productReview.rating,
            content: productReview.content
          },
          productId: data.products[index].product_id
        });
      });
      navigation.goBack();
    } else {
      listRef.current?.scrollTo?.({
        x: (state.page + 1) * Layout.window.width,
        animated: true
      });
    }
  }, []);
  return (
    <Container>
      <Header title="Write Review" onLeftPress={onBackPress} />
      <ScrollView ref={listRef} pagingEnabled style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.reviewContainer}>
          <Image
            source={{
              uri: toCorrectImageUri(data.restaurant_logo)
            }}
            style={styles.image}
          />
          <FText fontSize="h6" fontWeight={700}>
            {data.restaurant_name}
          </FText>
          <Padding paddingBottom={30} />
          <Observer>
            {() => <RatingInput value={state.getReview(0).rating} onChangeValue={value => state.setReview(0, 'rating', value)} />}
          </Observer>
          <View style={styles.inputContainer}>
            <Observer>
              {() => (
                <TextInput
                  value={state.getReview(0).content}
                  onChangeText={value => state.setReview(0, 'content', value)}
                  multiline
                  style={styles.input}
                  placeholderTextColor={Colors.gray}
                  placeholder="Write review about restaurant"
                />
              )}
            </Observer>
          </View>
        </View>
        {new Array(numberOfProductReviews).fill(0).map((_, index) => (
          <View style={styles.reviewContainer} key={index}>
            <Image
              source={{
                uri: toCorrectImageUri(data.products[index].image)
              }}
              style={styles.image}
            />
            <FText fontSize="h6" fontWeight={700}>
              {data.products[index].name}
            </FText>
            <Padding paddingBottom={30} />
            <Observer>
              {() => (
                <RatingInput
                  value={state.getReview(index + 1).rating}
                  onChangeValue={value => state.setReview(index + 1, 'rating', value)}
                />
              )}
            </Observer>
            <View style={styles.inputContainer}>
              <Observer>
                {() => (
                  <TextInput
                    value={state.getReview(index + 1).content}
                    onChangeText={value => state.setReview(index + 1, 'content', value)}
                    multiline
                    style={styles.input}
                    placeholderTextColor={Colors.gray}
                    placeholder="Write review about this product"
                  />
                )}
              </Observer>
            </View>
          </View>
        ))}
      </ScrollView>
      <Observer>{() => <ButtonIcon onPress={onFinishPress} text={state.isValid ? 'Finish' : 'Next'} />}</Observer>
    </Container>
  );
};

export default WriteReview;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reviewContainer: {
    flex: 1,
    width: Layout.window.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: setValue(150),
    width: setValue(150),
    borderRadius: 999,
    marginBottom: setYAxisValue(15)
  },
  inputContainer: {
    width: '80%',
    marginTop: setYAxisValue(15),
    padding: setValue(15),
    backgroundColor: Colors.border,
    borderRadius: setValue(5)
  },
  input: {
    color: Colors.typography,
    fontSize: setYAxisValue(16),
    fontFamily: 'SofiaPro-Medium',
    minHeight: setYAxisValue(44),
    width: '100%'
  }
});
