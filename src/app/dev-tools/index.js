const {BrowserWindow} = require('electron');
const localShortcut = require('electron-localshortcut');

const toggleDevTools = () => {
    const window = BrowserWindow.getFocusedWindow();

    if(window) {
        if(window.webContents.isDevToolsOpened()) {
            window.webContents.closeDevTools();
        } else {
            window.webContents.openDevTools();
        }
    }
};

const hardReload = () => {
    const window = BrowserWindow.getFocusedWindow();

    if(window) {
        window.webContents.reloadIgnoringCache();
    }
}

const useDevTools = async () => {
    const isMacOS = process.platform === 'darwin';

    localShortcut.register(isMacOS ? 'Command+Alt+I' : 'Control+Shift+I', toggleDevTools);
    localShortcut.register('F12', toggleDevTools);

    localShortcut.register('CommandOrControl+R', hardReload);
    localShortcut.register('F5', hardReload);
}

module.exports = useDevTools;
