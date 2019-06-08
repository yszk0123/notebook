import { AppLoading } from 'expo';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// @ts-ignore
import { loadResourcesAsync } from '../../../ResourceLoader';

type Props = {};

export const Loader: React.FunctionComponent<Props> = ({ children }) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleLoadingError = useCallback(error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // tslint:disable-next-line: no-console
    console.warn(error);
  }, []);

  const handleFinishLoading = useCallback(() => {
    setIsLoadingComplete(true);
  }, []);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  } else {
    return <View style={styles.container}>{children}</View>;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
