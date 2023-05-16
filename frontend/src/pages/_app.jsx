function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return <Component {...pageProps} key={router.route} />;
}

export default MyApp;
