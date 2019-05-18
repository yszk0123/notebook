import { styled } from '../../../application/styled-components';

export const Control = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space};
`;

export const ControlItem = styled.div`
  & + & {
    margin-left: ${({ theme }) => theme.space};
  }
`;
