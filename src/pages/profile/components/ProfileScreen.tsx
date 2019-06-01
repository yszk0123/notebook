import { Container, ListItem, Text } from 'native-base';
import { isNull } from 'option-t/lib/Nullable';
import React from 'react';
import { LoadingPage } from '../../../components/LoadingPage';
import { useProfileScreen } from './ProfileScreenHook';

interface Props {}

export const ProfileScreen: React.FunctionComponent<Props> = () => {
  const { profile, loading } = useProfileScreen();

  if (loading) {
    return <LoadingPage />;
  }

  if (isNull(profile)) {
    return null;
  }

  return (
    <Container>
      <ListItem>
        <Text>ID: </Text>
        <Text>{profile.id}</Text>
      </ListItem>
      <ListItem>
        <Text>Name: </Text>
        <Text>{profile.name}</Text>
      </ListItem>
      <ListItem>
        <Text>Description: </Text>
        <Text>{profile.description}</Text>
      </ListItem>
    </Container>
  );
};
