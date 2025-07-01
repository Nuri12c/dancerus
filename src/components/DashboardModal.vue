<template>
  <div class="dashboard">
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, пользователь!</p>
    <button @click="openCamera" class="camera-button">Открыть камеру для QR</button>

    <div v-if="showCamera" class="camera-modal">
      <div class="camera-modal-content">
        <button @click="stopCamera" class="close-button">✕</button>
        <video v-if="!isCameraPaused" ref="video" autoplay playsinline class="camera-stream"></video>
        <canvas ref="canvas" :style="{ display: isCameraPaused ? 'block' : 'none' }" class="camera-stream"></canvas>
        <div v-if="successMessage" class="success-message">
          <h3>Вы участвуете в конкурсе!</h3>
        </div>
      </div>
    </div>

    <div v-if="amocrmData && amocrmData.leads && amocrmData.leads.length">
      <h3>Ваши сделки в AmoCRM:</h3>
      <div v-for="lead in amocrmData.leads" :key="lead.id" class="lead">
        <h4>Сделка: {{ lead.name || 'Без названия' }} (ID: {{ lead.id }})</h4>
        <ul>
          <li><strong>ID:</strong> {{ lead.id }}</li>
          <li><strong>Название:</strong> {{ lead.name || 'Без названия' }}</li>
          <li><strong>Ответственный:</strong> {{ lead.responsible_user_id || 'Не указан' }}</li>
          <li><strong>Сумма:</strong> {{ lead.price || 0 }} руб.</li>
          <li v-for="field in filteredFields(lead.custom_fields_values)" :key="field.field_id">
            <strong>{{ field.field_name }}:</strong>
            {{ formatFieldValue(field) }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Нет связанных сделок или запрос не выполнен.</p>
  </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
  props: {
    amocrmData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showCamera: false,
      successMessage: false,
      isCameraPaused: false,
      token: localStorage.getItem('token') || null,
      allowedFieldIds: [
        414972, // Рекламный канал
        583897, // Из какого Вы города?
        581111, // Коллектив
        590703, // КП
        590011, // МК 1 адрес
        590283, // МК 1 направление
      ],
      stream: null,
    };
  },
  methods: {
    filteredFields(fields) {
      if (!fields || !Array.isArray(fields)) {
        return [];
      }
      return fields.filter(field => this.allowedFieldIds.includes(field.field_id));
    },
    formatFieldValue(field) {
      const value = field.values[0]?.value;
      if (!value) return 'Не указано';
      if (field.field_type === 'date' || field.field_type === 'date_time') {
        return new Date(value * 1000).toLocaleString('ru-RU');
      }
      if (field.field_type === 'checkbox') {
        return value ? 'Да' : 'Нет';
      }
      return value;
    },
    async openCamera() {
      try {
        this.showCamera = true;
        this.successMessage = false;
        this.isCameraPaused = false;
        this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        this.$refs.video.srcObject = this.stream;
        this.scanQRCode();
      } catch (error) {
        console.error('Ошибка при открытии камеры:', error);
        alert('Ошибка при открытии камеры');
        this.showCamera = false;
      }
    },
    scanQRCode() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');

      const scan = () => {
        if (this.isCameraPaused) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            this.isCameraPaused = true;
            context.drawImage(video, 0, 0, canvas.width, canvas.height); // Замораживаем кадр
            this.stopCameraStream(); // Останавливаем поток
            this.handleQRCode(code.data);
            return;
          }
        }
        requestAnimationFrame(scan);
      };
      requestAnimationFrame(scan);
    },
    async handleQRCode(data) {
      try {
        console.log('handleQRCode: QR data=', data);
        console.log('handleQRCode: Token=', this.token);
        if (!this.token) {
          console.log('handleQRCode: Token not found in localStorage');
          alert('Токен не найден в localStorage');
          this.stopCamera();
          return;
        }
        console.log('handleQRCode: Sending request with headers=', {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        });
        const response = await fetch(data, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: JSON.stringify({ token: this.token }),
        });
        console.log('handleQRCode: Response status=', response.status);
        const result = await response.json();
        console.log('handleQRCode: Server response=', result);
        if (result.status === 'success') {
          this.successMessage = true;
        } else {
          alert('Ошибка: ' + result.message);
          this.stopCamera();
        }
      } catch (error) {
        console.error('handleQRCode: Error sending token:', error.name, error.message);
        alert('Ошибка при отправке токена: ' + error.message);
        this.stopCamera();
      }
    },
    stopCameraStream() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
    },
    stopCamera() {
      this.stopCameraStream();
      this.showCamera = false;
      this.successMessage = false;
      this.isCameraPaused = false;
    },
  },
  beforeUnmount() {
    this.stopCamera();
  },
  mounted() {
    console.log('mounted: amocrmData=', this.amocrmData);
    console.log('mounted: token from localStorage=', this.token);
  },
};
</script>

<style scoped>
.camera-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}
.camera-button:hover {
  background-color: #45a049;
}
.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.camera-modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;
  width: 90%;
  text-align: center;
}
.camera-stream {
  width: 100%;
  max-width: 640px;
  height: auto;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-button:hover {
  background: #cc0000;
}
.success-message {
  margin-top: 20px;
}
.success-message h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #4CAF50;
}
.dashboard {
  padding: 20px;
  background: #fff;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.dashboard h2 {
  margin-bottom: 10px;
  color: #333;
}
.dashboard h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #555;
}
.lead {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}
.lead h4 {
  margin-bottom: 10px;
  color: #333;
}
.lead ul {
  list-style: none;
  padding: 0;
}
.lead li {
  margin-bottom: 5px;
  color: #444;
}
.lead li strong {
  color: #61daff;
}
</style>