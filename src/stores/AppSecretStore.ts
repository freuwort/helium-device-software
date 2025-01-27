import Store from 'electron-store'

export const AppSecretStore = new Store({
    schema: {
        deviceBearerToken: {
            type: 'string',
        },
    },
    encryptionKey: 'ELUUADPZSSADMVLPJXZHWPEXPLXZSV',
})