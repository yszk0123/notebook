import { isNull } from 'option-t/lib/Nullable';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
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
