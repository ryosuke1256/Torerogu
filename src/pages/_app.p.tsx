import type { AppProps } from 'next/app';
import React from 'react';
import '~/styles/globals.css';
import '~/styles/reset.css';
import { useNprogress as progressBar } from '../hooks';
import { Layout } from '../layout';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloProviderWithAuth0Token, ErrorFallback } from '~/components';
import { Auth0Provider } from '@auth0/auth0-react';

// TODO: register env vars　to vercel
function MyApp({ Component, pageProps }: AppProps) {
  progressBar();
  const REDIRECT_URI = `${process.env['NEXT_PUBLIC_BASE_URL']}`;

  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout>
          <Auth0Provider domain={process.env['NEXT_PUBLIC_AUTH0_DOMAIN'] as string} clientId={process.env['NEXT_PUBLIC_AUTH0_CLIENT_ID'] as string} redirectUri={REDIRECT_URI} audience={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}>
            <ApolloProviderWithAuth0Token>
              <Component {...pageProps} />
            </ApolloProviderWithAuth0Token>
          </Auth0Provider>
        </Layout>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default MyApp;
