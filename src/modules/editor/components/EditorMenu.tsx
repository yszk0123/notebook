import { EditorView } from 'prosemirror-view';
import React from 'react';
import { styled } from '../../../styled-components';
import { preventDefault } from '../../../utils/preventDefault';
import { MenuItem } from '../editor-type';

const MenuItem = styled.div`
  background: ${({ theme }) => theme.buttonColorBg};
  border-radius: ${({ theme }) => theme.radius}px;
  color: ${({ theme }) => theme.buttonColorFg};
  cursor: pointer;
  text-align: center;
  min-width: 4rem;
  opacity: ${({ theme }) => theme.inactiveOpacity};
  padding: ${({ theme }) => theme.space}px;
  transition: ${({ theme }) => theme.transition};

  & + & {
    margin-left: ${({ theme }) => theme.space}px;
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
