import { Container } from 'native-base';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface Props {}

export const LoadingPage: React.FunctionComponent<Props> = () => {
  return (
    <Container>
      <ActivityIndicator style={styles.indicator} size="large" />
    </Container>
  );
};

const styles = StyleSheet.create({
  indicator: {
    margin: 16,
  },
});
