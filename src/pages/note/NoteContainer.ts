import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RoutingGlobalState } from '../../app/routing';
import { NotePage } from './components/NotePage';
import { CopyTextEffect, createCopyTextEffect } from './effects/CopyTextEffect';
import { createLoadNoteEffect, LoadNoteEffect } from './effects/LoadNoteEffect';
import { createSaveNoteEffect, SaveNoteEffect } from './effects/SaveNoteEffect';
import { NoteGlobalState } from './NoteState';
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
  copyText: CopyTextEffect;
  loadNote: LoadNoteEffect;
  saveNote: SaveNoteEffect;
}

function mapDispatch(
  dispatch: any,
  { loadNote, saveNote }: OwnProps,
): DispatchTo {
  return bindActionCreators(
    {
      copyText: createCopyTextEffect(),
      loadNote: createLoadNoteEffect({ loadNote }),
      saveNote: createSaveNoteEffect({ saveNote }),
    },
    dispatch,
  );
}

export const NoteContainer = connect(
  mapState,
  mapDispatch,
)(NotePage);
