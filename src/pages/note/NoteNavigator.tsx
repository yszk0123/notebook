import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { BasicHeader } from '../../components/BasicHeader';
import { NoteScreen } from './components/NoteScreen';

export const NoteNavigator = createStackNavigator(
  {
    Note: {
      navigationOptions: {
        header: <BasicHeader title="Note" />,
      },
      screen: NoteScreen,
    },
    NoteEdit: {},
  },
  {
    initialRouteName: 'Note',
  },
);
