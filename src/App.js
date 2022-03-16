import React from 'react';
import AppNavigation from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {rootStore, StoreProvider, trunk} from './stores';
import Loading from './screens/Loading';
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
      <StoreProvider value={rootStore}>
        {dataLoaded ? <AppNavigation /> : <Loading />}
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
