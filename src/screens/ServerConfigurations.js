import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonIcon, Container, FInput, Header, Padding } from '../components';
import { setXAxisValue, setYAxisValue } from '../utils';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { appStore } from '../stores';
import { Colors } from '../constants/colors';

const ServerConfigurations = ({ navigation }) => {
  const state = useLocalObservable(() => ({
    privateIp: toJS(appStore.privateIp),
    setPrivateIp: value => {
      state.privateIp = value;
    }
  }));
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onSavePress = React.useCallback(() => {
    appStore.setPrivateIp(state.privateIp);
    onBackPress();
  }, []);
  return (
    <Container>
      <Header title="Server Configurations" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <Observer>
          {() => (
            <FInput
              titleProps={{
                align: 'center'
              }}
              value={state.privateIp}
              onChangeText={txt => state.setPrivateIp(txt)}
              title="Private IP"
              placeholder="Ex: 192.168.x.x"
              style={styles.inputContainer}
            />
          )}
        </Observer>
      </View>
      <ButtonIcon text="Save" onPress={onSavePress} />
    </Container>
  );
};

export default ServerConfigurations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
    paddingHorizontal: setXAxisValue(26),
    color: Colors.typography,
    fontSize: setYAxisValue(18)
  }
});
