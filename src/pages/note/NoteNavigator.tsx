import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { BasicHeader } from '../../components/BasicHeader';
import { NoteEditScreen } from './components/NoteEditScreen';
import { NoteInsertScreen } from './components/NoteInsertScreen';
import { NoteScreen } from './components/NoteScreen';
import { NoteRoute } from './NoteConstant';
import { NoteContainer } from './NoteContainer';

export const NoteNavigator = NoteContainer.withContainer(
  createStackNavigator(
    {
      [NoteRoute.NOTE]: {
        navigationOptions: {
          header: <BasicHeader title="Note" />,
        },
        screen: NoteScreen,
      },
      [NoteRoute.NOTE_EDIT]: {
        navigationOptions: {
          header: <BasicHeader title="NoteEdit" />,
        },
        screen: NoteEditScreen,
      },
      [NoteRoute.NOTE_INSERT]: {
        navigationOptions: {
          header: <BasicHeader title="NoteInsert" />,
        },
        screen: NoteInsertScreen,
      },
    },
    {
      initialRouteName: NoteRoute.NOTE,
    },
  ),
);
