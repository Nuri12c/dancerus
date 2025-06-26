
<template>
  <div class="dashboard">
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, пользователь!</p>

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
export default {
  props: {
    amocrmData: Object,
  },
  data() {
    return {
      // Укажи ID полей, которые хочешь отображать
      allowedFieldIds: [
        414972, // Рекламный канал
        583897, // Из какого Вы города?
        581111, // Коллектив
        590703, // КП
        590011, // МК 1 адрес
        590283, // МК 1 направление
      ],
    };
  },
  methods: {
    filteredFields(fields) {
      // Проверка на null или undefined
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
  },
  mounted() {
    console.log('Данные из AmoCRM:', this.amocrmData);
  },
};
</script>

<style scoped>
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
