import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container, Header } from '../components';

const ProductsManagement = ({ navigation }) => {
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <Container>
      <Header title="Manage Products" onLeftPress={onBackPress} />
      <View style={styles.container}></View>
    </Container>
  );
};

export default ProductsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
