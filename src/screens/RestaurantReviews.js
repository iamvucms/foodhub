import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { BottomSheet, Container, FInput, FText, Header, Padding, ReviewCard } from '../components';
import { isAndroid, setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { Layout } from '../constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const mockReviews = [
  {
    id: 1,
    author: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    rating: 5,
    content: 'I love this place! I love this place! I love this place!',
    created_at: new Date().getTime()
  },
  {
    id: 2,
    author: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    rating: 5,
    content: 'I love this place! I love this place! I love this place!',
    created_at: new Date().getTime()
  },
  {
    id: 3,
    author: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    rating: 5,
    content: 'I love this place! I love this place! I love this place!',
    created_at: new Date().getTime()
  },
  {
    id: 4,
    author: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    rating: 5,
    content: 'I love this place! I love this place! I love this place!',
    created_at: new Date().getTime()
  },
  {
    id: 5,
    author: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    rating: 5,
    content: 'I love this place! I love this place! I love this place!',
    created_at: new Date().getTime()
  }
];
const { height } = Layout.window;
const RestaurantReviews = ({ navigation, route }) => {
  const { data } = route.params;
  const { bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef();
  const localState = useLocalObservable(() => ({
    review: {},
    setReview: review => {
      localState.review = review;
    }
  }));
  const onLeftPress = React.useCallback(() => navigation.goBack(), []);
  const renderReviewItem = React.useCallback(({ item }) => {
    const onOptionPress = () => {
      bottomSheetRef.current.snapTo(1);
      localState.setReview(item);
    };
    return (
      <View style={styles.cardItem}>
        <ReviewCard onOptionPress={onOptionPress} data={item} />
      </View>
    );
  }, []);
  const renderListHeader = () => (
    <View style={styles.mainContainer}>
      <View style={styles.reviewInputContainer}>
        <FInput
          fontSize={16}
          icon={
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
              }}
              style={styles.avatar}
            />
          }
          placeholder="Write your review"
          placeholderTextColor={Colors.aslo_gray}
        />
      </View>
    </View>
  );
  const reviewKeyExtractor = item => `review_${item.id}`;
  return (
    <Container>
      <Header onLeftPress={onLeftPress} title="Reviews" />
      <FlatList ListHeaderComponent={renderListHeader} data={mockReviews} renderItem={renderReviewItem} keyExtractor={reviewKeyExtractor} />
      {!isAndroid && <KeyboardSpacer topSpacing={-bottom} />}
      <BottomSheet snapPoints={[0, height / 2]} ref={bottomSheetRef}>
        <View style={styles.bottomSheetContainer}>
          <Observer>
            {() => (
              <React.Fragment>
                {localState.review.author && (
                  <View style={styles.reviewInfo}>
                    <View style={styles.reviewAvatarContainer}>
                      <Image
                        style={styles.reviewAvatar}
                        source={{
                          uri: localState.review.author.avatar
                        }}
                      />
                      <View style={styles.rating}>
                        <FText fontSize={10} color={Colors.white}>
                          {localState.review.rating.toFixed(1)}
                        </FText>
                      </View>
                    </View>
                    <FText fontSize="medium" fontWeight={700}>
                      {localState.review.author.name}
                    </FText>
                    <View style={styles.reviewContent}>
                      <FText fontSize="small" color={Colors.aslo_gray}>
                        {localState.review.content}
                      </FText>
                    </View>
                  </View>
                )}
              </React.Fragment>
            )}
          </Observer>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.btnAction}>
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
    borderWidth: setValue(1)
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
