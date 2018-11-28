import { isNull } from 'option-t/lib/Nullable';
import React, { useCallback, useRef } from 'react';
import { styled } from '../styled-components';
import { useDocumentEventHandler } from '../utils/useDocumentEventHandler';

const Menu = styled.ul`
  list-style-type: none;
  background: ${({ theme }) => theme.dropDownMenuColorBg};
  box-shadow: 0 0 ${({ theme }) => theme.space}px
    ${({ theme }) => theme.dropDownMenuShadow};
  color: ${({ theme }) => theme.dropDownMenuColorFg};
`;

interface Props {
  className?: string;
  onRequestClose: () => void;
}

export const DropDownMenu: React.FunctionComponent<Props> = ({
  className,
  children,
  onRequestClose,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const onClick = useCallback(
    (event: Event) => {
      if (isNull(menuRef.current) || isNull(event.target)) {
        return;
      }
      if (!menuRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    },
    [menuRef.current],
  );
  useDocumentEventHandler('click', onClick);

  return (
    <Menu className={className} ref={menuRef}>
      {children}
    </Menu>
  );
};
