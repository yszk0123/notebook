import { EditorView } from 'prosemirror-view';
import React from 'react';
import { styled } from '../../../styled-components';
import { MenuItem } from '../editor-type';

const StyledMenu = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.borderColorBg};
  display: flex;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.thinkSpace}px;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const MenuItem = styled.div`
  margin-top: ${({ theme }) => theme.space}px;
  padding: ${({ theme }) => theme.space}px;
  background: ${({ theme }) => theme.buttonColorBg};
  color: ${({ theme }) => theme.buttonColorFg};

  & + & {
    margin-left: ${({ theme }) => theme.space}px;
  }
`;

interface Props {
  editorView: EditorView;
  menuItems: MenuItem[];
}

export const Menu: React.FunctionComponent<Props> = ({
  editorView,
  menuItems,
}) => {
  return (
    <StyledMenu>
      {menuItems.map(item => (
        <MenuItem
          key={item.shortTitle}
          onClick={() => {
            item.command(editorView.state, editorView.dispatch, editorView);
          }}
        >
          {item.shortTitle}
        </MenuItem>
      ))}
    </StyledMenu>
  );
};
