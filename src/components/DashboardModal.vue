<template>
  <div class="dashboard">
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, пользователь!</p>

    <div v-if="amocrmData && amocrmData.leads && amocrmData.leads.length">
      <h3>Ваши сделки в AmoCRM:</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Ответственный</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in amocrmData.leads" :key="lead.id">
            <td>{{ lead.id }}</td>
            <td>{{ lead.name || 'Без названия' }}</td>
            <td>{{ lead.responsible_user_id || 'Не указан' }}</td>
            <td>{{ lead.price || 0 }} руб.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>Нет связанных сделок или запрос не выполнен.</p>
  </div>
</template>

<script>
export default {
  props: {
    amocrmData: Object,
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #61daff;
  color: #fff;
}

tr:hover {
  background-color: #eef9ff;
}
</style>

