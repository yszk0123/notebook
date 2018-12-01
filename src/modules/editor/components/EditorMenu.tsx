import { EditorView } from 'prosemirror-view';
import React from 'react';
import { styled } from '../../../styled-components';
import { preventDefault } from '../../../utils/preventDefault';
import { MenuItem } from '../editor-type';

const MenuItem = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.buttonColorBg};
  border-radius: ${({ theme }) => theme.roundButtonRadius}px;
  color: ${({ theme }) => theme.buttonColorFg};
  cursor: pointer;
  display: flex;
  min-height: ${({ theme }) => theme.roundButtonSize}px;
  height: ${({ theme }) => theme.roundButtonSize}px;
  justify-content: center;
  opacity: ${({ theme }) => theme.inactiveOpacity};
  padding: ${({ theme }) => theme.space}px;
  text-align: center;
  transition: ${({ theme }) => theme.transition};
  width: ${({ theme }) => theme.roundButtonSize}px;

  & + & {
    margin-bottom: ${({ theme }) => theme.space}px;
  }

  :hover {
    opacity: ${({ theme }) => theme.activeOpacity};
  }
`;

interface Props {
  className?: string;
  editorView: EditorView;
  menuItems: MenuItem[];
}

export const EditorMenu: React.FunctionComponent<Props> = ({
  className,
  editorView,
  menuItems,
}) => {
  return (
    <div className={className}>
      {menuItems.map(item => (
        <MenuItem
          key={item.shortTitle}
          onMouseDown={preventDefault}
          onClick={event => {
            item.command(editorView.state, editorView.dispatch, editorView);
          }}
        >
          {item.shortTitle}
        </MenuItem>
      ))}
    </div>
  );
};
