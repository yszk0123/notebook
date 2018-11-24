import { AppState } from '../../../app/app-type';
import { EffectCreator } from '../../../redux';
import { NoteAction } from '../note-type';

export type NoteEffectCreator<Args> = EffectCreator<AppState, NoteAction, Args>;
