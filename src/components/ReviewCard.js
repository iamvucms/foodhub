import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FText from './FText';
import { setValue, setXAxisValue, setYAxisValue, toCorrectImageUri } from '../utils';
import { Colors } from '../constants/colors';
import dayjs from 'dayjs';
import Padding from './Padding';

const ReviewCard = ({ data, onOptionPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: toCorrectImageUri(data.reviewer_avatar)
            }}
          />
          <View style={styles.rating}>
            <FText fontSize={10} color={Colors.white}>
              {data.rating.toFixed(1)}
            </FText>
          </View>
        </View>
        <View style={styles.mainInfo}>
          <FText fontSize={15} lineHeight={15}>
            {data.reviewer_name}
          </FText>
          <Padding paddingTop={5} />
          <FText fontSize={13} color={Colors.aslo_gray} lineHeight={13}>
            {dayjs(data.created_at).format('MMM DD, YYYY')}
          </FText>
        </View>
        <TouchableOpacity style={styles.btnMore} onPress={onOptionPress}>
          <Image style={styles.verticalDotIcon} source={require('../assets/images/vertical-dots.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.reviewContent}>
        <FText color={Colors.waterloo} fontSize={15} lineHeightRatio={1.4}>
          {data.content}
        </FText>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: setYAxisValue(25)
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarContainer: {
    height: setValue(48),
    width: setValue(48),
    borderRadius: 99,
    marginRight: setXAxisValue(13)
  },
  avatar: {
    borderRadius: 99,
    width: '100%',
    height: '100%'
  },
  rating: {
    position: 'absolute',
    zIndex: 99,
    bottom: -setValue(3),
    right: -setValue(3),
    height: setValue(19),
    width: setValue(19),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: setValue(8),
    borderColor: Colors.white,
    borderWidth: 1
  },
  reviewContent: {
    paddingTop: setYAxisValue(16)
  },
  mainInfo: {
    flex: 1
  },
  verticalDotIcon: {
    width: setValue(4),
    height: setValue(12)
  },
  btnMore: {
    padding: setValue(7)
  }
});
