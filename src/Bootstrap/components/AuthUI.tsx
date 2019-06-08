import { Facebook } from 'expo';
import firebase from 'firebase/app';
import { Button, Container, Content, Footer, Header, Text } from 'native-base';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { isNull, Nullable } from '../../application/utils/Maybe';
import { FACEBOOK_APP_ID } from '../../config/AppConfig';

function useAuthUI(
  firebaseApp: Nullable<firebase.app.App>,
): {
  onPressLogin: () => void;
} {
  const onPressLogin = useCallback(async () => {
    if (isNull(firebaseApp)) {
      return;
    }

    if (Platform.OS === 'web') {
      const provider = new firebase.auth.FacebookAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } else {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInWithCredential(credential);
      }
    }
  }, [firebaseApp]);

  return { onPressLogin };
}

type Props = {
  firebaseApp: Nullable<firebase.app.App>;
};

export const AuthUI: React.FunctionComponent<Props> = ({ firebaseApp }) => {
  const { onPressLogin } = useAuthUI(firebaseApp);

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={onPressLogin}>
          <Text>Login</Text>
        </Button>
      </Content>
      <Footer />
    </Container>
  );
};
