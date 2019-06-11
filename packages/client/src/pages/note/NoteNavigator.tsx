import { createSwitchNavigator } from 'react-navigation';
import { NoteEditScreen } from './components/NoteEditScreen';
import { NoteInsertScreen } from './components/NoteInsertScreen';
import { NoteScreen } from './components/NoteScreen';
import { NoteRoute } from './NoteConstant';
import { NoteContainer } from './NoteContainer';

export const NoteNavigator = NoteContainer.withContainer(
  createSwitchNavigator(
    {
      [NoteRoute.NOTE]: {
        screen: NoteScreen,
      },
      [NoteRoute.NOTE_EDIT]: {
        screen: NoteEditScreen,
      },
      [NoteRoute.NOTE_INSERT]: {
        screen: NoteInsertScreen,
      },
    },
    {
      initialRouteName: NoteRoute.NOTE,
    },
  ),
);
