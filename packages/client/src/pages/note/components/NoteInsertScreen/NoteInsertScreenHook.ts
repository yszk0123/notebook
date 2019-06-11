import { useCallback, useEffect } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { NoteRoute } from '../../NoteConstant';
import { NoteContainer } from '../../NoteContainer';

interface Props {
  text: string;
  onChangeText: (text: string) => void;
  onPressCancel: () => void;
  onPressInsert: () => void;
}

export function useNoteInsertScreen(navigation: NavigationScreenProp<NavigationState>): Props {
  const { text, onChangeText, onInsert } = NoteContainer.useContainer();

  const onPressCancel = useCallback(() => {
    navigation.navigate(NoteRoute.NOTE);
  }, [navigation]);

  const onPressInsert = useCallback(() => {
    onInsert();
    navigation.navigate(NoteRoute.NOTE);
  }, [onInsert, navigation]);

  useEffect(() => {
    onChangeText('');
  }, []);

  return {
    onChangeText,
    onPressCancel,
    onPressInsert,
    text,
  };
}
