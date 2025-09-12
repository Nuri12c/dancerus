<template>
  <section class="tab-content">
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, пользователь!</p>
    <div v-if="amocrmData">
      <h3>Ваши данные в AmoCRM:</h3>
      <div class="contact">
        <h4>
          Контакт: {{ amocrmData.name || "Без имени" }} (ID:
          {{ amocrmData.id }})
        </h4>
        <ul>
          <li><strong>ID:</strong> {{ amocrmData.id }}</li>
          <li><strong>Имя:</strong> {{ amocrmData.name || "Не указано" }}</li>
          <li
            v-for="field in filteredFields(amocrmData.custom_fields_values)"
            :key="field.field_id"
          >
            <strong>{{ field.field_name }}:</strong>
            {{ formatFieldValue(field) }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Нет данных контакта или запрос не выполнен.</p>
  </section>
</template>

<script>
export default {
  props: {
    amocrmData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      allowedFieldIds: [
        596967, // ПВ Прямой эфир
      ],
    };
  },
  methods: {
    filteredFields(fields) {
      if (!fields || !Array.isArray(fields)) {
        return [];
      }
      return fields.filter((field) =>
        this.allowedFieldIds.includes(field.field_id)
      );
    },
    formatFieldValue(field) {
      const value = field.values[0]?.value;
      if (!value) return "Не указано";
      if (field.field_type === "date" || field.field_type === "date_time") {
        return new Date(value * 1000).toLocaleString("ru-RU");
      }
      if (field.field_type === "checkbox") {
        return value ? "Да" : "Нет";
      }
      return value;
    },
  },
};
</script>

<style scoped>
.tab-content {
  max-width: 800px;
}

h2 {
  margin-bottom: 20px;
}

.contact ul {
  list-style: none;
  padding: 0;
}

.contact li {
  margin-bottom: 10px;
}
</style>