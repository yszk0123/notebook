import { isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState } from '../../../app/app-type';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import {
  createMenuItems,
  createSchema,
  createStateFromContent,
  Editor,
  EditorMenu,
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
  font-size: ${({ theme }) => theme.fontSize.large};
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
  position: sticky;
  left: 0;
  text-align: left;
  top: ${({ theme }) => theme.space + theme.headerHeight}px;
  transition: ${({ theme }) => theme.transition};
  z-index: 100;

  :hover {
    opacity: ${({ theme }) => theme.activeOpacity};
  }
`;

const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.space}px;
`;

const schema = createSchema();
const menuItems = createMenuItems(schema);

interface Props {}

export const Note: React.FunctionComponent<Props> = () => {
  const [{ userId, saving, loading, note }, dispatch] = useRedux(mapState);
  const [focused, setFocused] = useState(false);
  const editorContentRef = useRef(mapForNullable(note, _ => _.content));
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
      save(editorContentRef.current);
    },
    [dispatch, userId, noteId, editorContentRef.current],
  );

  const onChange = useDebouncedCallback(
    (getContent: () => Nullable<EditorContent>) => {
      const newContent = getContent();
      editorContentRef.current = newContent;
      save(newContent);
    },
    CHANGE_DELAY,
    [dispatch, userId, noteId],
  );

  const onFocus = useCallback(() => {
    setFocused(true);
    stickToTop();
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

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
              <StyledEditorMenu menuItems={menuItems} editorView={editorView} />
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
