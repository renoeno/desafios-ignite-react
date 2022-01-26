import Document, { Head, Html, Main, NextScript } from 'next/document';
const repoName = process.env.PRISMIC_REPO_NAME;

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Roboto+Condensed:wght@300&family=Roboto:wght@400;700;900&family=Volkhov:ital@0;1&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/fav.png" type="image/png" />
          <script
            async
            defer
            src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
