import { Nullable } from 'option-t/lib/Nullable';
import React from 'react';
import { Icon } from '../../components/Icon';
import { GlobalNavigation } from '../../routing/components/GlobalNavigation';
import { Page } from '../../routing/routing-type';
import { styled } from '../../styled-components';
import { AppState } from '../app-type';
import useRedux from '../useRedux';

interface Props {
  page: Page;
}

const Wrapper = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  font-size: 96px;
  display: flex;
  color: ${({ theme }) => theme.loadingColorFg};
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: ${({ theme }) => 2 * theme.space}px;
`;

const Main = styled.main`
  position: relative;
  top: 0;
`;

export const Loading: React.FunctionComponent<Props> = ({ page }) => {
  const [{ loading }, dispatch] = useRedux(mapState);
  const { content, loading: loadingContent } = page;

  let main: Nullable<JSX.Element> = null;

  if (loading) {
    main = loadingContent ? (
      loadingContent
    ) : (
      <Container>
        <Icon icon="spinner" spin={true} pulse={true} />
      </Container>
    );
  }

  main = <StyledLoading>{content}</StyledLoading>;

  return (
    <Wrapper>
      <GlobalNavigation />
      <Main>{main}</Main>
    </Wrapper>
  );
};

function mapState(state: AppState) {
  const { loading } = state.routing;

  return {
    loading,
  };
}
