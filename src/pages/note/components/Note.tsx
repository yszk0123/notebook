import React, { useCallback } from 'react';
import { noteEffects } from '..';
import { AppState } from '../../../app/app-type';
import useRedux from '../../../app/useRedux';
import { Editor } from '../../../modules/editor';

interface Props {}

export const Note: React.FunctionComponent<Props> = () => {
  const [{ userId, saving }, dispatch] = useRedux(mapState);
  const noteId = '1';

  const onPersistData = useCallback(
    (content: any) => {
      if (!userId) {
        return;
      }

      const note = {
        id: noteId,
        content,
      };

      dispatch(
        noteEffects.save({
          userId,
          note,
        }),
      );
    },
    [dispatch, userId, noteId],
  );

  return (
    <>
      <Editor onPersistData={onPersistData} />
      <p>{saving ? 'saving' : ''}</p>
    </>
  );
};

function mapState(state: AppState) {
  const { saving } = state.note;
  const { loading, user } = state.routing;

  return {
    saving,
    loading,
    userId: user ? user.uid : null,
  };
}
