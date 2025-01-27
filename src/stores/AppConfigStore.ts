import Store from 'electron-store'

export const AppConfigStore = new Store({
    schema: {
        apiUrl: {
            type: 'string',
        },
        firstTimeSetup: {
            type: 'boolean',
            default: true,
        },
    },
    encryptionKey: 'EUDFXXCKGFRBXBVCEVSLUGEUSACURN',
})