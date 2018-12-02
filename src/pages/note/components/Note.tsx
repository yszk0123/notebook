import { isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { EditorState } from 'prosemirror-state';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from '../../../app/app-type';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Text } from '../../../components/Text';
import {
  createMenuItems,
  createSchema,
  createStateFromContent,
  Editor,
  EditorMenu,
  serializeEditorState,
} from '../../../modules/editor';
import { EditorContent } from '../../../modules/editor/editor-type';
import { createGlobalStyle, styled } from '../../../styled-components';
import { FontSize } from '../../../theme/theme-type';
import { stickToTop } from '../../../utils/stickToTop';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { useDebouncedCallback } from '../../../utils/useDebouncedCallback';
import { noteEffects } from '../NoteEffect';

const CHANGE_DELAY = 4000;
const EDITOR_MIN_HEIGHT = '6rem';
const VIRTUAL_KEYBOARD_HEIGHT = 216; // Ugly hack...

const GlobalStyleForNote = createGlobalStyle<{ focused: boolean }>`
  @media screen and (max-width: 480px) {
    #root {
      height: ${({ focused }) =>
        focused ? `calc(100vh - ${VIRTUAL_KEYBOARD_HEIGHT}px)` : ''};
      overflow-y: ${({ focused }) => (focused ? 'auto' : undefined)};
    }
  }
`;

const StyledNote = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.large};

  // FIXME: Margin for MiniControl
  margin-bottom: 5rem;

  .ProseMirror {
    min-height: ${EDITOR_MIN_HEIGHT};
    font-size: ${({ theme }) => theme.fontSize.default};
  }
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: ${({ theme }) => theme.space}px;
  }
`;

const StyledEditorMenu = styled(EditorMenu)`
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  font-size: ${({ theme }) => theme.fontSize.default};
  padding: ${({ theme }) => theme.thinkSpace}px;
  position: fixed;
  overflow-y: auto;
  height: calc(100% - ${({ theme }) => theme.headerHeight}px);
`;

const StyledEditor = styled.div`
  margin-top: ${({ theme }) => theme.space}px;
`;

const MiniControl = styled.div`
  margin-left: ${({ theme }) => theme.space}px;
  opacity: ${({ theme }) => theme.inactiveOpacity};
  position: fixed;
  left: 0;
  text-align: left;
  bottom: ${({ theme }) => theme.space}px;
  transition: ${({ theme }) => theme.transition};
  z-index: 100;

  :hover {
    opacity: ${({ theme }) => theme.activeOpacity};
  }
`;

const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.space}px;
`;

const LoadingContainer = styled.div`
  font-size: 96px;
  display: flex;
  color: ${({ theme }) => theme.loadingColorFg};
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
`;

const schema = createSchema();
const menuItems = createMenuItems(schema);

interface Props {}

export const Note: React.FunctionComponent<Props> = () => {
  const [{ userId, saving, loading, note }, dispatch] = useRedux(mapState);
  const [focused, setFocused] = useState(false);
  const editorContentRef = useRef(mapForNullable(note, _ => _.content));
  const noteId = '1';

  const [editorState, setEditorState] = useState(() =>
    createStateFromContent(schema, mapForNullable(note, _ => _.content)),
  );

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

  useEffect(
    () => {
      if (isNull(note)) {
        return;
      }

      const state = createStateFromContent(schema, note.content);
      setEditorState(state);
    },
    [note],
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

  const onSave = useCallback(
    () => {
      save(editorContentRef.current);
    },
    [dispatch, userId, noteId, editorContentRef.current],
  );

  const onChangeContent = useDebouncedCallback(
    (state: EditorState) => {
      const newContent = serializeEditorState(state);
      editorContentRef.current = newContent;
      save(newContent);
    },
    CHANGE_DELAY,
    [dispatch, userId, noteId],
  );

  const onChange = useCallback(
    (nextState: EditorState, _prevState: EditorState, docChanged: boolean) => {
      if (docChanged) {
        onChangeContent(nextState);
      }

      setEditorState(nextState);
    },
    [onChangeContent],
  );

  const onFocus = useCallback(() => {
    setFocused(true);
    stickToTop();
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <Icon icon="spinner" spin={true} pulse={true} />
      </LoadingContainer>
    );
  }

  return (
    <StyledNote>
      <Editor
        state={editorState}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {({ editor, editorView }) => {
          const onDone = () => {
            const element = unwrapUnsafeValue<HTMLDivElement>(editorView.dom);
            element.blur();
          };

          return (
            <>
              <MiniControl>
                <StyledButton onClick={onDone}>Done</StyledButton>
                <StyledButton onClick={onSave}>Save</StyledButton>
                <StyledText size={FontSize.SMALL}>
                  {saving ? 'saving...' : 'saved'}
                </StyledText>
              </MiniControl>
              <StyledEditor>{editor}</StyledEditor>
              <StyledEditorMenu
                editorState={editorState}
                menuItems={menuItems}
                editorView={editorView}
              />
              <GlobalStyleForNote focused={focused} />
            </>
          );
        }}
      </Editor>
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
