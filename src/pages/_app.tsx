import type { AppProps } from 'next/app';

/**
 * Main component wrapper
 *
 * @param {AppProps} props root component props
 * @returns {JSX.Element} root component
 */
function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
