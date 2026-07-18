import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './queryClient'
import './styles/index.css'

const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#users-app')
