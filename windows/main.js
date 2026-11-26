const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

function bukaJendela() {
  const w = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 380,
    minHeight: 560,
    title: 'KIMIAKU',
    backgroundColor: '#F2F9F9',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  Menu.setApplicationMenu(null);
  w.loadFile(path.join(__dirname, 'index.html'));
  // Tautan https dibuka di browser, bukan di dalam aplikasi.
  w.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  w.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) {
      e.preventDefault();
      if (/^https:\/\//.test(url)) shell.openExternal(url);
    }
  });
}

app.whenReady().then(bukaJendela);
app.on('window-all-closed', () => app.quit());
