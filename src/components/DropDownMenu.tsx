import { isNull } from 'option-t/lib/Nullable';
import React, { useCallback, useRef } from 'react';
import { styled } from '../app/styled-components';
import { useDocumentEventHandler } from '../app/utils/useDocumentEventHandler';

const Menu = styled.ul`
  list-style-type: none;
  padding-left: 0;
  background: ${({ theme }) => theme.dropDownMenuColorBg};
  // FIXME: Avoid magic number
  box-shadow: 0 2px ${({ theme }) => theme.space} ${({ theme }) => theme.dropDownMenuShadow};
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
