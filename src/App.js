import { PortalProvider } from '@gorhom/portal';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedAppNavigation } from './navigation';
import Loading from './screens/Loading';
import { rootStore, StoreProvider, trunk } from './stores';
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
        <PortalProvider>{dataLoaded ? <AnimatedAppNavigation /> : <Loading />}</PortalProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
