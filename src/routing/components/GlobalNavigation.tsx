import React, { useContext } from 'react';
import { AppState } from '../../app/app-type';
import useRedux from '../../app/useRedux';
import { Text } from '../../components/Text';
import { HistoryContext } from '../../HistoryContext';
import { styled } from '../../styled-components';
import { getCurrentPath } from '../utils/getCurrentPath';
import { NavLink } from './NavLink';

const StyledGlobalNavigation = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.headerColorBg};
  color: ${({ theme }) => theme.headerColorFg};
  padding: ${({ theme }) => theme.space}px;
`;

const Left = styled.div`
  display: flex;
  margin: 0;
`;

const Icon = styled.div`
  margin: 0 ${({ theme }) => theme.space}px;
  font-weight: ${({ theme }) => theme.fontWeight.normal};
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 100px;
`;

const Link = styled(NavLink)`
  & + & {
    margin-left: ${({ theme }) => theme.space}px;
  }
`;

interface Props {}

export const GlobalNavigation: React.FunctionComponent<Props> = () => {
  const history = useContext(HistoryContext);
  if (!history) {
    throw new Error('history must be provided');
  }

  const [{ loading, user }] = useRedux(mapState);

  const currentPath = getCurrentPath(history);

  return (
    <StyledGlobalNavigation>
      <Left>
        <Link path="/">
          <Icon>Icon</Icon>
        </Link>
        <Link path="/">Home</Link>
        <Link path="/counter">Counter</Link>
        <Link path="/foo">Foo</Link>
      </Left>
      <Right>
        {loading ? (
          <Link path="/login">Login</Link>
        ) : (
          <>
            {user && (
              <Text>
                {user.displayName} ({user.visitCount})
              </Text>
            )}
            <Link path="/logout">Logout</Link>
          </>
        )}
      </Right>
    </StyledGlobalNavigation>
  );
};

function mapState(state: AppState) {
  const { loading, user } = state.global;

  return {
    loading,
    user,
  };
}
