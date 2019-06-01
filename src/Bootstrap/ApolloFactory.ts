/**
 * @see https://github.com/hasura/graphql-engine/blob/36cb6f8b13fd2e523c7859ad4c56dbb8933be330/community/sample-apps/react-apollo-todo/src/apollo.js
 */
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { Nullable } from 'option-t/lib/Nullable';
import { useEffect, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { appConfig } from '../config/AppConfig';

type Client = ApolloClient<NormalizedCacheObject>;

type GetToken = () => Nullable<string>;

type Headers = { authorization?: string };

function getHeaders(getToken: GetToken): Headers {
  const headers: Headers = {};
  const token = getToken();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
}

function createApolloClient(getToken: GetToken): Client {
  // Create an http link:
  const httpLink = new HttpLink({
    fetch,
    headers: getHeaders(getToken),
    uri: appConfig.hasura.endpoints.graphql,
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink(
    new SubscriptionClient(appConfig.hasura.endpoints.graphqlSubscription, {
      connectionCallback: err => {
        if (err) {
          (wsLink as any).subscriptionClient.close(false, false);
        }
      },
      connectionParams: () => {
        return { headers: getHeaders(getToken) };
      },
      reconnect: true,
      timeout: 30000,
    }),
  );

  // chose the link to use based on operation
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: true,
    }),
    link,
  });

  return client;
}

export function useApolloClient(getToken: GetToken): Nullable<Client> {
  const [client, setClient] = useState<Nullable<Client>>(null);

  useEffect(() => {
    const newClient = createApolloClient(getToken);
    setClient(newClient);
  }, []);

  return client;
}
