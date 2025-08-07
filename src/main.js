import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/main.scss';
import './styles/normaliz.css'
import './styles/font-styles.scss'
const app = createApp(App);
app.use(createPinia());
app.mount('#app');