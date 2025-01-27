import os from 'os'
import { app } from 'electron'

export function getDeviceInfo() {
    return {
        hostname: os.hostname(),
        osPlatform: os.platform(),
        osArch: os.arch(),
        osRelease: os.release(),

        appVersion: app.getVersion(),
        
        cpu: os.cpus()[0].model,
        memory: os.totalmem(),

        ip: os.networkInterfaces().Ethernet[0].address,
        mac: os.networkInterfaces().Ethernet[0].mac,
    }
}