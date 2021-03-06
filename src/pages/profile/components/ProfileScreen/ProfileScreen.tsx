import { Container, Content, ListItem, Text } from 'native-base';
import React from 'react';
import { isNull } from '../../../../application/utils/Maybe';
import { ForceUpdateButton } from '../../../../components/ForceUpdateButton';
import { LoadingPage } from '../../../../components/LoadingPage';
import { LogoutHeader } from '../../../../components/LogoutHeader';
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
      <LogoutHeader title="Profile" />
      <Content>
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
      </Content>
      <ForceUpdateButton />
    </Container>
  );
};
