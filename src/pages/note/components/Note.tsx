import { isNull } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import React, { useCallback, useEffect } from 'react';
import { AppState } from '../../../app/app-type';
import useRedux from '../../../app/useRedux';
import { Editor } from '../../../modules/editor';
import { NodeAsJSON } from '../../../modules/editor/editor-type';
import { styled } from '../../../styled-components';
import { noteEffects } from '../NoteEffect';

const StyledEditor = styled(Editor)<{ readonly: boolean }>`
  opacity: ${({ readonly }) => (readonly ? 0.5 : 1)};
`;

interface Props {}

export const Note: React.FunctionComponent<Props> = () => {
  const [{ userId, saving, loading, note }, dispatch] = useRedux(mapState);
  const noteId = '1';

  const onPersistData = useCallback(
    (contentToSave: NodeAsJSON) => {
      if (!userId) {
        return;
      }

      const noteToSave = {
        id: noteId,
        content: contentToSave,
      };

      dispatch(
        noteEffects.save({
          userId,
          note: noteToSave,
        }),
      );
    },
    [dispatch, userId, noteId],
  );

  useEffect(
    () => {
      if (isNull(userId)) {
        return;
      }

      dispatch(noteEffects.load({ userId, noteId }));
    },
    [userId],
  );

  const content = mapForNullable(note, _ => _.content);

  return (
    <>
      <StyledEditor
        onPersistData={onPersistData}
        content={content}
        readonly={loading}
      />
      <p>{saving ? 'saving' : ''}</p>
    </>
  );
};

function mapState(state: AppState) {
  const { saving, note } = state.note;
  const { loading, user } = state.routing;

  return {
    saving,
    loading,
    note,
    userId: user ? user.uid : null,
  };
}
