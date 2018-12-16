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

const HeaderLayout = styled.header`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.headerHeight};
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Header = styled(HeaderLayout)`
  background: ${({ theme }) => theme.headerColorBg};
  color: ${({ theme }) => theme.headerColorFg};
  padding: 0 ${({ theme }) => theme.space};
  // FIXME: Avoid magic number
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
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
  padding: ${({ theme }) => theme.space};
`;

const Menu = styled(DropDownMenu)`
  padding: ${({ theme }) => theme.space};
`;

const MenuLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80px;
  position: fixed;
  right: ${({ theme }) => theme.space};
  top: ${({ theme }) => theme.space};
  z-index: 2000;
`;

const MenuItemLayout = styled.div`
  & + & {
    margin-top: ${({ theme }) => theme.space};
  }
`;

const MenuButton = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => theme.space};
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
        <Link path={routingPaths.word}>Word</Link>
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
                    <NavLink path={routingPaths.logout}>Logout</NavLink>
                  </MenuItemLayout>
                </Menu>
              </MenuLayout>
            ) : null}
            <MenuButton onClick={onToggleMenu}>
              <MenuIcon />
            </MenuButton>
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
