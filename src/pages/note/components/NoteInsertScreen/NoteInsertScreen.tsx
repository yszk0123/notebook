import { Button, Container, Icon, ListItem, Text, Textarea } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationState, ScrollView } from 'react-navigation';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { NoteContainer } from '../../NoteContainer';

const PADDING_BOTTOM = 200;

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
);

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export const NoteInsertScreen: React.FunctionComponent<Props> = () => {
  const { text, onChangeText, onInsert } = NoteContainer.useContainer();

  return (
    <Container>
      <ScrollView style={styles.container}>
        <ListItem>
          <Textarea autoFocus rowSpan={6} value={text} onChangeText={onChangeText} />
        </ListItem>
        <ListItem>
          <Button primary onPress={onInsert}>
            <Text>Insert</Text>
          </Button>
        </ListItem>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: PADDING_BOTTOM,
  },
});
