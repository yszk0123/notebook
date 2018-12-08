import { isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { EditorState } from 'prosemirror-state';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from '../../../app/app-type';
import { CenterLayout } from '../../../app/components/layouts/CenterLayout';
import { VerticalStackItemLayout } from '../../../app/components/layouts/VerticalStackItemLayout';
import { VerticalStackLayout } from '../../../app/components/layouts/VerticalStackLayout';
import { VirtualKeyboardSpacer } from '../../../app/components/layouts/VirtualKeyboardSpacer';
import useRedux from '../../../app/useRedux';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Text } from '../../../components/Text';
import {
  createMenuItems,
  createSchema,
  createStateFromContent,
  EditorMenu,
  editorStyle,
  serializeEditorState,
  useEditor,
} from '../../../modules/editor';
import { EditorContent } from '../../../modules/editor/editor-type';
import { styled } from '../../../styled-components';
import { FontSize } from '../../../theme/theme-type';
import { stickToTop } from '../../../utils/stickToTop';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { useDebouncedCallback } from '../../../utils/useDebouncedCallback';
import { noteEffects } from '../NoteEffect';

const CHANGE_DELAY = 4000;

const NotePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.large};
  height: 100%;
  width: 100%;

  .ProseMirror {
    font-size: ${({ theme }) => theme.fontSize.default};
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    height: 100%;
    padding-bottom: 30%;
    padding-top: ${({ theme }) => theme.space};
  }

  ${editorStyle}
`;

const StyledEditorMenu = styled(EditorMenu)`
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  font-size: ${({ theme }) => theme.fontSize.default};
  padding: ${({ theme }) => 2 * theme.thinSpace};
  position: absolute;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  height: 100%;
`;

const EditorWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space};
  height: 100%;
`;

const MiniControl = styled.div`
  align-items: center;
  bottom: ${({ theme }) => theme.space};
  display: flex;
  left: 0;
  margin-left: ${({ theme }) => theme.space};
  opacity: ${({ theme }) => theme.inactiveOpacity};
  position: absolute;
  text-align: left;
  transition: ${({ theme }) => theme.transition};
  z-index: 100;

  :hover {
    opacity: ${({ theme }) => theme.activeOpacity};
  }
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: ${({ theme }) => theme.space};
  }
`;

const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.space};
`;

const LoadingLayout = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
`;

const schema = createSchema();
const menuItems = createMenuItems(schema);

interface Props {}

export const NotePage: React.FunctionComponent<Props> = () => {
  const [{ userId, saving, loading, note }, dispatch] = useRedux(mapState);
  const [isVirtualKeyboardVisible, setFocused] = useState(false);
  const editorContentRef = useRef(mapForNullable(note, _ => _.content));
  const editorRef = useRef<HTMLDivElement>(null);
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

  const editorView = useEditor({
    editorRef,
    editorState,
    onBlur,
    onChange,
    onFocus,
  });

  const onDone = useCallback(
    () => {
      const element = unwrapUnsafeValue<HTMLDivElement>(editorView.dom);
      element.blur();
    },
    [editorView],
  );

  if (loading) {
    return (
      <LoadingLayout>
        <Icon icon="spinner" spin={true} pulse={true} />
      </LoadingLayout>
    );
  }

  return (
    <NotePageWrapper>
      <VerticalStackLayout>
        <VerticalStackItemLayout autoScale={true}>
          <EditorWrapper ref={editorRef} />
          <MiniControl>
            <StyledButton onClick={onDone}>Done</StyledButton>
            <StyledButton onClick={onSave}>Save</StyledButton>
            <StyledText size={FontSize.SMALL}>
              {saving ? 'saving...' : 'saved'}
            </StyledText>
          </MiniControl>
          <StyledEditorMenu
            editorState={editorState}
            menuItems={menuItems}
            editorView={editorView}
          />
        </VerticalStackItemLayout>
        <VirtualKeyboardSpacer
          isVirtualKeyboardVisible={isVirtualKeyboardVisible}
        />
      </VerticalStackLayout>
    </NotePageWrapper>
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
