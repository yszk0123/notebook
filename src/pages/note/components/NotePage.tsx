import { isNull, Nullable } from 'option-t/lib/Nullable';
import { mapForNullable } from 'option-t/lib/Nullable/map';
import { EditorState } from 'prosemirror-state';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CenterLayout } from '../../../app/components/layouts/CenterLayout';
import { VerticalStackItemLayout } from '../../../app/components/layouts/VerticalStackItemLayout';
import { VerticalStackLayout } from '../../../app/components/layouts/VerticalStackLayout';
import { VirtualKeyboardSpacer } from '../../../app/components/layouts/VirtualKeyboardSpacer';
import { styled } from '../../../app/styled-components';
import { FontSize } from '../../../app/theme/Theme';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { Text } from '../../../components/Text';
import {
  createMenuItems,
  createSchema,
  createStateFromContent,
  customMarkdownSerializer,
  EditorMenu,
  editorStyle,
  serializeEditorState,
  useEditor,
} from '../../../modules/editor';
import { stickToTop } from '../../../utils/stickToTop';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { useDebouncedCallback } from '../../../utils/useDebouncedCallback';
import { Note } from '../entities/Note';
import { CopyTextSideEffect } from '../sideEffects/CopyTextSideEffect';
import { LoadNoteEffect } from '../sideEffects/LoadNoteSideEffect';
import { SaveNoteSideEffect } from '../sideEffects/SaveNoteSideEffect';

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

const EditorRoot = styled.div`
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

const ButtonGroupLayout = styled.div`
  ${Button} + ${Button} {
    margin-left: ${({ theme }) => theme.space};
  }
`;

const StatusLayout = styled.div`
  margin-left: ${({ theme }) => theme.space};
`;

const LoadingLayout = styled(CenterLayout)`
  font-size: 96px;
  color: ${({ theme }) => theme.loadingColorFg};
`;

const schema = createSchema();
const menuItems = createMenuItems(schema);

interface Props {
  userId: Nullable<string>;
  saving: boolean;
  loading: boolean;
  note: Nullable<Note>;
  copyText: CopyTextSideEffect;
  saveNote: SaveNoteSideEffect;
  loadNote: LoadNoteEffect;
}

export const NotePage: React.FunctionComponent<Props> = ({
  userId,
  saving,
  loading,
  note,
  saveNote,
  loadNote,
  copyText,
}) => {
  const [isVirtualKeyboardVisible, setFocused] = useState(false);
  const editorContentRef = useRef(mapForNullable(note, _ => _.content));
  const editorRef = useRef<HTMLDivElement>(null);
  const noteId = '1';

  const [editorState, setEditorState] = useState(() =>
    createStateFromContent(schema, mapForNullable(note, _ => _.content)),
  );

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
      loadNote({ userId, noteId });
    },
    [userId],
  );

  const onSave = useCallback(
    () => {
      saveNote({ userId, noteId, content: editorContentRef.current });
    },
    [userId, noteId, editorContentRef.current],
  );

  const onChangeContent = useDebouncedCallback(
    (state: EditorState) => {
      const newContent = serializeEditorState(state);
      editorContentRef.current = newContent;
      saveNote({ userId, noteId, content: newContent });
    },
    CHANGE_DELAY,
    [userId, noteId],
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

  const onCopy = useCallback(
    () => {
      const text = customMarkdownSerializer.serialize(editorState.doc);
      copyText({ text });
    },
    [editorState.doc],
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
          <EditorRoot ref={editorRef} />
          <MiniControl>
            <ButtonGroupLayout>
              <Button onClick={onDone}>Done</Button>
              <Button onClick={onSave}>Save</Button>
              <Button onClick={onCopy}>Copy</Button>
            </ButtonGroupLayout>
            <StatusLayout>
              <Text size={FontSize.SMALL}>
                {saving ? 'saving...' : 'saved'}
              </Text>
            </StatusLayout>
          </MiniControl>
          <EditorMenu
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
