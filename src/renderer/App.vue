<template>
    <h1>Helium Device Software™</h1>
    <p>--> A Software for Devices that run Helium modules <--</p>
    <p>{{ deviceInfo }}</p>
    <p>{{ appConfig }}</p>
</template>

<script lang="ts" setup>
    import { IpcMainEvent } from 'electron/main'
    import { ref } from 'vue'

    const deviceInfo = ref()
    const appConfig = ref()

    window.bridge.sendDeviceInfo((event: IpcMainEvent, info: any) => {
        deviceInfo.value = info
    })

    window.bridge.sendAppConfig((event: IpcMainEvent, config: any) => {
        appConfig.value = config
    })
</script>

<style lang="sass" scoped>
</style>