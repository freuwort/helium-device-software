import '/src/assets/css/app.sass'

import { createApp } from 'vue'
import App from './App.vue'

import IodIcon from './components/iod/IodIcon.vue'
import IodButton from './components/iod/IodButton.vue'
import IodIconButton from './components/iod/IodIconButton.vue'
import IodButtonGroup from './components/iod/IodButtonGroup.vue'
import IodInput from './components/iod/IodInput.vue'
import IodOtpInput from './components/iod/IodOtpInput.vue'



const app = createApp(App)

// Register global components
app.component('IodIcon', IodIcon)
app.component('IodButton', IodButton)
app.component('IodIconButton', IodIconButton)
app.component('IodButtonGroup', IodButtonGroup)
app.component('IodInput', IodInput)
app.component('IodOtpInput', IodOtpInput)

app.mount('#app')
