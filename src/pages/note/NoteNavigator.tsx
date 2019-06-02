import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { BasicHeader } from '../../components/BasicHeader';
import { NoteEditScreen } from './components/NoteEditScreen';
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
    },
    {
      initialRouteName: NoteRoute.NOTE,
    },
  ),
);
