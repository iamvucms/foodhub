import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {useStore} from '../stores';
import {setRandomUserName} from '../actions/userActions';
import {Container, FText} from '../components';
import Animated, {FadeIn} from 'react-native-reanimated';

const Onboarding = observer(() => {
  const userStore = useStore('user');
  return (
    <Container>
      <Animated.View style={styles.container} entering={FadeIn}>
        <TouchableOpacity onPress={setRandomUserName}>
          <FText>click me</FText>
        </TouchableOpacity>
        <View>
          <FText>{userStore.user.name}</FText>
        </View>
      </Animated.View>
    </Container>
  );
});

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
