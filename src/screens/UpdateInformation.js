import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Container, Header } from '../components';

const UpdateInformation = ({ navigation }) => {
  const onBackPress = React.useCallback(() => navigation.goBack(), []);
  return (
    <Container>
      <Header title="Update Information" onLeftPress={onBackPress} />
      <View style={styles.container}></View>
    </Container>
  );
};

export default UpdateInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
