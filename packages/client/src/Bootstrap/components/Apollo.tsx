import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { isNull } from '../../application/utils/Maybe';
import { useApolloClient } from '../ApolloFactory';

type Props = {
  token: string;
};

export const Apollo: React.FunctionComponent<Props> = ({ children, token }) => {
  const client = useApolloClient(token);

  if (isNull(client)) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
