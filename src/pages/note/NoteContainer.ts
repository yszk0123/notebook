import { isNull } from 'option-t/lib/Nullable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '../../app/app-type';
import { NotePage } from './components/NotePage';
import { noteEffects } from './NoteEffect';
import { Load, Save } from './tmp';

function mapState(state: AppState) {
  const { saving, note } = state.note;
  const { loading, user } = state.routing;

  return {
    loading,
    note,
    saving,
    userId: user ? user.uid : null,
  };
}

const mapDispatch = (dispatch: any) => {
  const save: Save = ({ userId, noteId, content }) => {
    if (isNull(userId) || isNull(content)) {
      return;
    }

    const input = {
      note: {
        content,
        id: noteId,
      },
      userId,
    };

    dispatch(noteEffects.save(input));
  };

  const load: Load = ({ userId, noteId }) => {
    if (isNull(userId)) {
      return;
    }

    dispatch(noteEffects.load({ userId, noteId }));
  };

  return {
    copyText: bindActionCreators(noteEffects.copyText, dispatch),
    load,
    save,
  };
};

export const NoteContainer = connect(
  mapState,
  mapDispatch,
)(NotePage);
