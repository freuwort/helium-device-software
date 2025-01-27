import { app, BrowserWindow, globalShortcut } from 'electron'
import path from 'path'
import started from 'electron-squirrel-startup'
import { AppConfigStore } from './stores/AppConfigStore'
import { AppSecretStore } from './stores/AppSecretStore'
import { getDeviceInfo } from './utils/system'
import args from './utils/args'



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit()
}



const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        fullscreen: !args.devMode,
        resizable: args.devMode,
        kiosk: !args.devMode,
        frame: args.devMode,
        alwaysOnTop: !args.devMode,
        autoHideMenuBar: !args.devMode,
        minimizable: args.devMode,
        title: 'Helium Device Software',
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    }
    else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }

    // Open the DevTools.
    if (args.devMode) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.setMenuBarVisibility(false)
    mainWindow.maximize()

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('sendDeviceInfo', getDeviceInfo())
        mainWindow.webContents.send('sendAppConfig', AppConfigStore.store)
    })

    // Prevent the window from being closed
    mainWindow.on('close', (event) => {
        if (!args.devMode) {
            event.preventDefault()
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow()

    if (!args.devMode) {
        globalShortcut.register('F11', () => {})
    }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Prevent the app from quitting
app.on('before-quit', (event) => {
    if (!args.devMode) {
        event.preventDefault()
    }
})