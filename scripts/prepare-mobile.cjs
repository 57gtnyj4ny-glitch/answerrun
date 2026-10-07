const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const webDirectory = path.join(projectRoot, 'app', 'www');
fs.mkdirSync(webDirectory, { recursive: true });
fs.copyFileSync(
	path.join(projectRoot, 'runner.html'),
	path.join(webDirectory, 'index.html')
);
