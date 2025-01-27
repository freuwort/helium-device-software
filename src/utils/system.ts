import os from 'os'
import { app } from 'electron'

export function getDeviceInfo() {
    return {
        hostname: os.hostname(),
        arch: os.arch(),
        os: os.platform(),
        osVersion: os.release(),

        appVersion: app.getVersion(),
        
        cpu: os.cpus()[0].model,
        memory: os.totalmem(),

        ip: os.networkInterfaces().Ethernet[0].address,
        mac: os.networkInterfaces().Ethernet[0].mac,
    }
}