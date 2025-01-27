<template>
    <form class="container" @submit.prevent="activateDevice">
        <IodInput label="Helium API Adresse" v-model="activateDeviceForm.url">
            <template #right>
                <IodButton type="button" label="Localhost" corner="pill" size="s" variant="contained" @click="activateDeviceForm.url = 'http://localhost:8000'"/>
            </template>
        </IodInput>
        <IodOtpInput v-model="activateDeviceForm.pin" :length="8" :dividers="[4]"/>
        <IodButton type="submit" label="Verbinden" corner="pill" icon-right="leak_add"/>
    </form>
</template>

<script lang="ts" setup>
    // @ts-ignore
    import { ref } from 'vue'



    // Setup
    const activateDeviceForm = ref({
        url: '',
        pin: '',
        name: '',
        type: 'KIOSK',
    })

    function activateDevice() {
        window.electronAPI.activateDevice(Object.assign({}, activateDeviceForm.value))
    }
</script>

<style lang="sass" scoped>
    .container
        display: flex
        flex-direction: column
        gap: 1rem
        padding: 1rem
        max-width: 500px
        margin: 0 auto
</style>