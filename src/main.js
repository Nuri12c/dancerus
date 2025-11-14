// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/main.scss'
import './styles/normaliz.css'
import './styles/font-styles.scss'

// Импортируем reCAPTCHA
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App)
app.use(createPinia())

// === ДОБАВЛЯЕМ reCAPTCHA ===
app.use(VueReCaptcha, {
  siteKey: '6LcKNQosAAAAADfdTv4ty2B4C1jE35nDDcPnSb1F', // ← ВСТАВЬ СВОЙ SITE KEY
  loaderOptions: {
    autoHideBadge: false, // false = показывать значок Google, true = скрыть
    // Можно true, если не хочешь значок внизу экрана
  }
})
// === КОНЕЦ ===

app.mount('#app')