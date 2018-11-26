import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { EditorView } from 'prosemirror-view';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState } from '../../../app/app-type';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import {
  createMenuItems,
  createSchema,
  createStateFromContent,
  Editor,
  Menu,
} from '../../../modules/editor';
import { EditorContent } from '../../../modules/editor/editor-type';
import { styled } from '../../../styled-components';
import { FontSize } from '../../../theme/theme-type';
import { useDebouncedCallback } from '../../../utils/useDebouncedCallback';
import { noteEffects } from '../NoteEffect';

const CHANGE_DELAY = 5000;
const EDITOR_MIN_HEIGHT = '6rem';

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.large};

  .ProseMirror {
    min-height: ${EDITOR_MIN_HEIGHT};
    font-size: ${({ theme }) => theme.fontSize.default};
  }
`;

const StyledEditor = styled(Editor)<{ readonly: boolean }>`
  opacity: ${({ readonly }) => (readonly ? 0.5 : 1)};
  margin-top: ${({ theme }) => theme.space}px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space}px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space}px;
`;

const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.space}px;
`;

const schema = createSchema();
const menuItems = createMenuItems(schema);

interface Props {}

export const Note: React.FunctionComponent<Props> = () => {
  const [{ userId, saving, loading, note }, dispatch] = useRedux(mapState);
  const [editorContent, setEditorContent] = useState(
    mapForNullable(note, _ => _.content),
  );
  const [editorView, setEditorView] = useState<Nullable<EditorView>>(null);
  const noteId = '1';

  function save(content: Nullable<EditorContent>) {
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
  }

  const onSave = useCallback(
    () => {
      save(editorContent);
    },
    [dispatch, userId, noteId, editorContent],
  );

  const onChange = useDebouncedCallback(
    (getContent: () => Nullable<EditorContent>) => {
      const content = getContent();
      setEditorContent(content);
      save(content);
    },
    CHANGE_DELAY,
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

  const editorState = useMemo(
    () => createStateFromContent(schema, mapForNullable(note, _ => _.content)),
    [note],
  );

  return (
    <StyledNote>
      <Header>
        {isNotNull(editorView) ? (
          <Menu menuItems={menuItems} editorView={editorView} />
        ) : null}
      </Header>
      <StyledEditor
        state={editorState}
        readonly={loading}
        onChange={onChange}
        onReady={setEditorView}
      />
      <Footer>
        <Button onClick={onSave}>Save</Button>
        <StyledText size={FontSize.SMALL}>
          {saving ? 'saving...' : 'saved'}
        </StyledText>
      </Footer>
    </StyledNote>
  );
};

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
