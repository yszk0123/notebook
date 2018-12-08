import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import { styled } from '../../../styled-components';
import { preventDefault } from '../../../utils/preventDefault';
import { MenuItem } from '../editor-type';

const MenuItem = styled.div<{ active?: boolean; enable?: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.buttonColorBg};
  border-radius: ${({ theme }) => theme.roundButtonRadius};
  color: ${({ theme }) => theme.buttonColorFg};
  cursor: pointer;
  display: flex;
  min-height: ${({ theme }) => theme.roundButtonSize};
  height: ${({ theme }) => theme.roundButtonSize};
  justify-content: center;
  opacity: ${({ theme, active }) =>
    active ? theme.activeOpacity : theme.inactiveOpacity};
  padding: ${({ theme }) => theme.space};
  text-align: center;
  transition: ${({ theme }) => theme.transition};
  width: ${({ theme }) => theme.roundButtonSize};

  & + & {
    margin-bottom: ${({ theme }) => theme.space};
  }

  :hover {
    opacity: ${({ theme }) => theme.activeOpacity};
  }
`;

interface ItemProps {
  className?: string;
  editorState: EditorState;
  editorView: EditorView;
  item: MenuItem;
}

const EditorMenuItem: React.FunctionComponent<ItemProps> = ({
  item,
  editorState,
  editorView,
}) => {
  return (
    <MenuItem
      key={item.shortTitle}
      active={item.active(editorState)}
      onClick={event => {
        event.preventDefault();
        item.run(editorState, editorView.dispatch, editorView);
      }}
      onMouseDown={preventDefault}
    >
      {item.shortTitle}
    </MenuItem>
  );
};

interface Props {
  className?: string;
  editorState: EditorState;
  editorView: EditorView;
  menuItems: MenuItem[];
}

export const EditorMenu: React.FunctionComponent<Props> = ({
  className,
  editorView,
  editorState,
  menuItems,
}) => {
  return (
    <div className={className}>
      {menuItems.map(item => (
        <EditorMenuItem
          key={item.shortTitle}
          editorView={editorView}
          editorState={editorState}
          item={item}
        />
      ))}
    </div>
  );
};
