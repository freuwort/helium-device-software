// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("bridge", {
    sendDeviceInfo(deviceInfo: any) {
        return ipcRenderer.on('sendDeviceInfo', deviceInfo)
    },
    sendAppConfig(appConfig: any) {
        return ipcRenderer.on('sendAppConfig', appConfig)
    }
})