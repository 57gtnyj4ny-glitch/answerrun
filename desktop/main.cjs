const path = require('node:path');
const { app, BrowserWindow } = require('electron');

function createWindow() {
	const window = new BrowserWindow({
		width: 480,
		height: 900,
		minWidth: 360,
		minHeight: 640,
		autoHideMenuBar: true,
		backgroundColor: '#171039',
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: true
		}
	});

	window.loadFile(path.join(__dirname, '..', 'runner.html'));
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
