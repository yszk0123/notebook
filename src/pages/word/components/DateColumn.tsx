import { format } from 'date-fns';
import React from 'react';
import { styled } from '../../../application/styled-components';

const DateText = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.subtitleColorFg};
  padding: ${({ theme }) => theme.space};
  display: flex;
  align-items: center;
`;

interface Props {
  value: number;
  onClick: () => void;
}

export const DateColumn: React.FunctionComponent<Props> = ({ value, onClick }) => {
  return <DateText onClick={onClick}>{value ? format(value, 'YYYY/MM/DD') : null}</DateText>;
};
