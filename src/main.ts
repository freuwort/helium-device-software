import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import path from 'path'
// @ts-ignore
import started from 'electron-squirrel-startup'
// @ts-ignore
import { appConfig } from './stores/AppConfig'
import { getDeviceInfo } from './utils/system'
import args from './utils/args'
import axios from 'axios'



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
        icon: path.join(__dirname, 'assets/images/icon.png'),
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
    
    if (args.devMode) {
        mainWindow.webContents.openDevTools()
    }
    
    mainWindow.setMenuBarVisibility(false)
    mainWindow.maximize()

    // Prevent the window from being closed
    mainWindow.on('close', (event) => {
        if (!args.devMode) {
            event.preventDefault()
        }
    })

    ipcMain.on('activate-device', (event, request) => {
        axios.patch(request.url+'/api/devices/activate', {
            pin: request.pin,
            type: request.type,
            name: request.name || getDeviceInfo().hostname,
            os_platform: getDeviceInfo().osPlatform,
            os_arch: getDeviceInfo().osArch,
            os_release: getDeviceInfo().osRelease,
            app_version: getDeviceInfo().appVersion,
        })
        .then((response) => {
            console.log(response.data)
            
            appConfig.set({
                apiUrl: request.url,
                deviceId: response.data.id,
                deviceToken: response.data.token,
                firstTimeSetup: false,
            })
        })
        .catch((error) => {
            console.error(error)
        })
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