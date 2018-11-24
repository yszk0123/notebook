import { AppState } from '../../../app/app-type';
import { EffectCreator } from '../../../redux';
import { NoteAction } from '../note-type';

export type NoteEffectCreator<Args extends any[]> = EffectCreator<
  AppState,
  NoteAction,
  Args
>;
