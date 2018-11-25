import { isNotNull, isNull, Nullable } from 'option-t/lib/Nullable';
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
  content: Nullable<NodeAsJSON>;
  onChange(): void;
}

export const Editor = forwardRef<EditorMethods, Props>(
  ({ className, content, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<EditorView | null>(null);

    useImperativeMethods(
      ref,
      () => ({
        getData(): Nullable<NodeAsJSON> {
          if (isNull(view)) {
            return null;
          }
          return unwrapUnsafeValue<NodeAsJSON>(view.state.doc.toJSON());
        },
      }),
      [ref, view, content],
    );

    useEffect(
      () => {
        if (isNull(view)) {
          return;
        }

        view.update({
          ...view.props,
          dispatchTransaction: tr => {
            const state = view.state.apply(tr);
            view.updateState(state);
            if (tr.docChanged) {
              onChange();
            }
          },
        });
      },
      [view, onChange],
    );

    useEffect(() => {
      if (isNull(editorRef.current) || isNull(contentRef.current)) {
        return;
      }

      const newView = createEditorView(editorRef.current, content);
      setView(newView);

      return () => {
        if (isNotNull(view)) {
          view.destroy();
        }
      };
    }, []);

    useEffect(
      () => {
        if (isNull(view) || isNull(content)) {
          return;
        }

        view.updateState(createStateFromJSON(content));
      },
      [content],
    );

    return (
      <>
        <ProseMirrorWrapper className={className} ref={editorRef} />
        <div ref={contentRef} style={{ display: 'none' }} />
      </>
    );
  },
);
