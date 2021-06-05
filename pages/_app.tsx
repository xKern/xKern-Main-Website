import { useRouter } from 'next/router';

import '../styles/base.scss';

const xKernApp = ({ Component, pageProps }) => {

  return (
    <main className="app">
      <Component {...pageProps} />
    </main>
  );
};

export default xKernApp;
