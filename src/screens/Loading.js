import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {Container} from '../components';

const Loading = () => {
  return (
    <Container
      statusBarProps={{barStyle: 'light-content'}}
      disableFirst
      disableLast>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/loading.png')}
        />
      </View>
    </Container>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
