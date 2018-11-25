import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import React, {
  forwardRef,
  useEffect,
  useImperativeMethods,
  useRef,
  useState,
} from 'react';
import { styled } from '../../../styled-components';
import { unwrapUnsafeValue } from '../../../utils/unwrapUnsafeValue';
import { NodeAsJSON } from '../editor-type';
import { createStateFromJSON } from '../EditorState';
import { createEditorView } from '../EditorView';

const ProseMirrorWrapper = styled.div`
  & {
    .ProseMirror-menubar-wrapper {
      border: 2px solid silver;
    }

    .ProseMirror {
      padding: 4px 8px 4px 14px;
      line-height: 1.2;
    }

    .ProseMirror p {
      margin: 0;
    }

    .ProseMirror-focused {
      outline: none;
    }
  }
`;

export interface EditorMethods {
  getData(): Nullable<NodeAsJSON>;
}

interface Props {
  className?: string;
  schema: Schema;
  content: Nullable<NodeAsJSON>;
  onChange(): void;
}

export const Editor = forwardRef<EditorMethods, Props>(
  ({ className, content, schema, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editorView, setEditorView] = useState<EditorView | null>(null);

    useImperativeMethods(
      ref,
      () => ({
        getData(): Nullable<NodeAsJSON> {
          if (isNull(editorView)) {
            return null;
          }
          return unwrapUnsafeValue<NodeAsJSON>(editorView.state.doc.toJSON());
        },
      }),
      [ref, editorView, content],
    );

    useEffect(
      () => {
        if (isNull(editorView)) {
          return;
        }

        editorView.update({
          ...editorView.props,
          dispatchTransaction: tr => {
            const state = editorView.state.apply(tr);
            editorView.updateState(state);
            if (tr.docChanged) {
              onChange();
            }
          },
        });
      },
      [editorView, onChange],
    );

    useEffect(() => {
      if (isNull(editorRef.current)) {
        return;
      }

      const state = createStateFromJSON(schema, content);
      const newView = createEditorView(editorRef.current, state);
      setEditorView(newView);

      return () => {
        if (isNotNull(editorView)) {
          editorView.destroy();
        }
      };
    }, []);

    useEffect(
      () => {
        if (isNull(editorView) || isNull(content)) {
          return;
        }

        editorView.updateState(createStateFromJSON(schema, content));
      },
      [content],
    );

    return <ProseMirrorWrapper className={className} ref={editorRef} />;
  },
);
