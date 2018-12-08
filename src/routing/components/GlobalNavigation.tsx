import React, { useCallback, useContext, useState } from 'react';
import { AppState } from '../../app/app-type';
import useRedux from '../../app/useRedux';
import { DropDownMenu } from '../../components/DropDownMenu';
import { MenuIcon } from '../../components/icons/MenuIcon';
import { Text } from '../../components/Text';
import { routingPaths } from '../../config/RoutingConfig';
import { HistoryContext } from '../../HistoryContext';
import { styled } from '../../styled-components';
import { NavLink } from './NavLink';

const Layout = styled.header`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.headerHeight}px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Header = styled(Layout)`
  background: ${({ theme }) => theme.headerColorBg};
  color: ${({ theme }) => theme.headerColorFg};
  padding: ${({ theme }) => theme.space}px;
`;

const LeftLayout = styled.div`
  display: flex;
  margin: 0;
`;

const RightLayout = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Link = styled(NavLink)`
  & + & {
    margin-left: ${({ theme }) => theme.space}px;
  }
`;

const Menu = styled(DropDownMenu)`
  padding: ${({ theme }) => theme.space}px;
`;

const MenuLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80px;
  position: fixed;
  right: ${({ theme }) => theme.space}px;
  top: ${({ theme }) => theme.space}px;
  z-index: 2000;
`;

const MenuItemLayout = styled.div`
  & + & {
    margin-top: ${({ theme }) => theme.space}px;
  }
`;

interface Props {}

export const GlobalNavigation: React.FunctionComponent<Props> = () => {
  const history = useContext(HistoryContext);
  if (!history) {
    throw new Error('history must be provided');
  }

  const [{ loading, user }] = useRedux(mapState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onRequestClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const onToggleMenu = useCallback(
    () => {
      setIsMenuOpen(!isMenuOpen);
    },
    [isMenuOpen],
  );

  return (
    <Header>
      <LeftLayout>
        <Link path={routingPaths.home}>Home</Link>
        <Link path={routingPaths.counter}>Counter</Link>
        <Link path={routingPaths.note}>Note</Link>
      </LeftLayout>
      <RightLayout>
        {loading ? (
          <Link path={routingPaths.login}>Login</Link>
        ) : (
          <>
            {isMenuOpen ? (
              <MenuLayout>
                <Menu onRequestClose={onRequestClose}>
                  <MenuItemLayout>
                    {user && (
                      <Text>
                        {user.displayName} ({user.visitCount})
                      </Text>
                    )}
                  </MenuItemLayout>
                  <MenuItemLayout>
                    <Link path={routingPaths.logout}>Logout</Link>
                  </MenuItemLayout>
                </Menu>
              </MenuLayout>
            ) : null}
            <MenuIcon onClick={onToggleMenu} />
          </>
        )}
      </RightLayout>
    </Header>
  );
};

function mapState(state: AppState) {
  const { loading, user } = state.routing;

  return {
    loading,
    user,
  };
}
