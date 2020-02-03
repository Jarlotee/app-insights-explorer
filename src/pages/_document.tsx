import React from 'react';

import Document, { DocumentContext } from 'next/document';

import { ServerStyleSheets } from '@material-ui/core/styles';

class _Document extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = context.renderPage;

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }
}

export default _Document;
