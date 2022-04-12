import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import '../styles/reset.css';
import { useNprogress as progressBar } from '../hooks';
import { Layout } from '../layout';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/graphql/apolloClient';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '~/components/Error/index';

function MyApp({ Component, pageProps }: AppProps) {
  progressBar();
  const client = initializeApollo();
  return (
    <RecoilRoot>
      <Layout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ErrorBoundary>
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
