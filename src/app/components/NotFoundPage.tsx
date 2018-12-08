import React from 'react';
import { Text } from '../../components/Text';
import { CenterLayout } from './layouts/CenterLayout';

const Layout = CenterLayout;

interface Props {}

export const NotFoundPage: React.FunctionComponent<Props> = () => {
  return (
    <Layout>
      <Text>Not Found</Text>
    </Layout>
  );
};
