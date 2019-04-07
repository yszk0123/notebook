import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RoutingGlobalState } from '../../app/routing';
import { NotePage } from './components/NotePage';
import { NoteGlobalState } from './NoteState';
import { CopyTextSideEffect, createCopyTextSideEffect } from './sideEffects/CopyTextSideEffect';
import { createLoadNoteEffect, LoadNoteEffect } from './sideEffects/LoadNoteSideEffect';
import { createSaveNoteSideEffect, SaveNoteSideEffect } from './sideEffects/SaveNoteSideEffect';
import { LoadNote } from './useCases/LoadNote';
import { SaveNote } from './useCases/SaveNote';

interface OwnProps {
  loadNote: LoadNote;
  saveNote: SaveNote;
}

interface State extends NoteGlobalState, RoutingGlobalState {}

function mapState(state: State) {
  const { saving, note } = state.note;
  const { loading, user } = state.routing;

  return {
    loading,
    note,
    saving,
    userId: user ? user.uid : null,
  };
}

interface DispatchTo {
  copyText: CopyTextSideEffect;
  loadNote: LoadNoteEffect;
  saveNote: SaveNoteSideEffect;
}

function mapDispatch(dispatch: any, { loadNote, saveNote }: OwnProps): DispatchTo {
  return bindActionCreators(
    {
      copyText: createCopyTextSideEffect(),
      loadNote: createLoadNoteEffect({ loadNote }),
      saveNote: createSaveNoteSideEffect({ saveNote }),
    },
    dispatch,
  );
}

export const NoteContainer = connect(
  mapState,
  mapDispatch,
)(NotePage);
