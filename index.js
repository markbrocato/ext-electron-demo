const { app, BrowserWindow } = require('electron');
const port = 9000;
const express = require('express');
const fs = require('fs');
const windowStateKeeper = require('electron-window-state');

app.on('ready', () => {
    // Load the previous state with fallback to defaults
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });

    const mainWindow = new BrowserWindow({
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height
    });
    
    // Let us register listeners on the window, so we can update the state
    // automatically (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(mainWindow);
    
    const server = express();
    const path = require('path');
    server.use(express.static(path.join(__dirname, '.')));
    server.listen(port, '0.0.0.0', () => {
        console.log(`App listening on port ${port}.`);
        mainWindow.loadURL(`http://localhost:${port}`);
    });

    server.get('/image', (req, res) => {
        const { path } = req.query;
        if (path) {
            fs.createReadStream(path).pipe(res);
        } else {
            res.sendStatus(404);
        }
    })
});