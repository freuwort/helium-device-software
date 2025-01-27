import Store from 'electron-store'

export const appConfig = new Store({
    schema: {
        apiUrl: {
            type: 'string',
        },
        deviceId: {
            type: 'number',
        },
        deviceName: {
            type: 'string',
        },
        deviceToken: {
            type: 'string',
        },
        firstTimeSetup: {
            type: 'boolean',
            default: true,
        },
    },
    // encryptionKey: 'EUDFXXCKGFRBXBVCEVSLUGEUSACURN',
})