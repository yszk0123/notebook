import { Container, Content, Icon, Textarea } from 'native-base';
import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { defaultTheme } from '../../../../application/theme/DefaultTheme';
import { FontSize } from '../../../../application/theme/Theme';
import { DefaultHeader } from '../../../../components/DefaultHeader';
import { useNoteInsertScreen } from './NoteInsertScreenHook';

export const LargeIcon: React.FunctionComponent<{ name: string }> = ({ name }) => (
  <Icon fontSize={defaultTheme.fontSize[FontSize.LARGE]} name={name} />
);

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export const NoteInsertScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const { onPressCancel, onChangeText, onPressInsert, text } = useNoteInsertScreen(navigation);

  return (
    <Container>
      <DefaultHeader
        title="NoteInsert"
        leftButtonText="Cancel"
        onPressLeftButton={onPressCancel}
        rightButtonText="Insert"
        onPressRightButton={onPressInsert}
      />
      <Content>
        <Textarea autoFocus rowSpan={6} value={text} onChangeText={onChangeText} />
      </Content>
    </Container>
  );
};
