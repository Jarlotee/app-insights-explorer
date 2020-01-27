const { createServer } = require('http');
const { app } = require('electron');
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
    app.on('browser-window-created', (_event, window) => {
      window.loadFile(`../../${dir}/.static/index.html`);
    });
  }
};

module.exports = useNext;
