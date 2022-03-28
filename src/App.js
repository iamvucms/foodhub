import React from 'react';
import AppNavigation, { AnimatedAppNavigation } from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { rootStore, StoreProvider, trunk } from './stores';
import Loading from './screens/Loading';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
const App = () => {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  React.useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
      setTimeout(() => {
        setDataLoaded(true);
      }, 1000);
    };
    rehydrate();
  }, []);
  return (
    <SafeAreaProvider>
      <StoreProvider value={rootStore}>{dataLoaded ? <AnimatedAppNavigation /> : <Loading />}</StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
