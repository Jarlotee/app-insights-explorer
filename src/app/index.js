const { BrowserWindow, app } = require('electron');
const useNext = require('./next');
const useDevTools = require('./dev-tools');

// prevent flashing between pages
app.allowRendererProcessReuse = true;

app.on('ready', async () => {
  try {
    await useDevTools();
    await useNext('./src/browser');

    new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
  } catch (error) {
    console.error(error);
    app.quit();
  }
});

app.on('window-all-closed', app.quit);

// ipcMain.on('message', (event, message) => {
//   event.sender.send('message', message);
// });
