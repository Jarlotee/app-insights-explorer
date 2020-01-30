const { createServer } = require('http');
const { fileURLToPath } = require('url');
const path = require('path');
const root = require('app-root-path');
const { app, protocol } = require('electron');
const isDev = require('electron-is-dev');
const next = require('next');

const useNext = async (dir, port = 3000) => {
  if (isDev) {
    const nextApp = next({ dev: true, dir });
    await nextApp.prepare();
    const server = createServer(nextApp.getRequestHandler());
    server.listen(port, () => {
      app.on('before-quit', () => server.close());
    });

    app.on('browser-window-created', (_event, window) => {
      window.loadURL(`http://localhost:${port}`);
    });
  } else {
    protocol.interceptFileProtocol('file', (request, callback) => {
      let uri = fileURLToPath(request.url);

      uri = path.join(root.path, dir, '.static', uri);

      if (uri.endsWith('/')) {
        uri = `${uri}index.html`;
      }

      if (!path.extname(uri)) {
        uri = `${uri}.html`;
      }

      // console.log('uri', uri);

      callback({ path: uri });
    });

    app.on('browser-window-created', (_event, window) => {
      window.loadFile('/index.html');
    });
  }
};

module.exports = useNext;
