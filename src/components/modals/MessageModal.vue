<template>
  <div class="modal-overlay">
    <button class="close-btn" @click="$emit('close')">✕</button>

    <div class="modal-content">

      <!-- Верх -->
      <div class="header">
        <div class="logo-placeholder"></div>
        <div class="company-info">
          <strong>
            ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ
            НУРМУХАМЕТОВ АЙДАР НАИЛЕВИЧ
          </strong>
          <p>
            Юридический адрес организации 427283, РОССИЯ, РЕСП УДМУРТСКАЯ,
            СЕЛТИНСКИЙ Р-Н, С УТЬ СЮМСИ, УЛ МОЛОДЕЖНАЯ, Д 1
          </p>
          <p>ИНН 165051646716</p>
          <p>ОГРН/ОГРНИП 315165000014031</p>
          <p>Р/с 4080281030000020877</p>
          <p>АО «ТИНЬКОФФ БАНК»</p>
          <p>БИК 044525974</p>
        </div>
      </div>

      <!-- Текст -->
      <div class="body">
        <h2>Уважаемые руководители!</h2>

        <p>
          Мы искренне благодарны вам за то, что вы идёте с нами по этому творческому пути.
          Международное хореографическое сообщество «Танцуй, Россия» объединяет лучшие
          танцевальные коллективы, педагогов и участников со всей России и ближнего зарубежья.
        </p>

        <p>
          Хотим поздравить вас со вступлением в ряды нашего международного хореографического движения!
          Для нас большая честь приветствовать вас в числе наших резидентов.
        </p>

        <p>
          Мы рады предоставлять вам эксклюзивные бонусы, возможности для профессионального роста
          и участия в уникальных проектах сообщества.
        </p>

        <p>
          Мы искренне благодарим вас за доверие и сотрудничество.
          Желаем вам успехов, вдохновения и удачи на вашем профессиональном пути!
        </p>
      </div>

      <!-- Низ -->
      <div class="footer">
        <div class="signature">
          <p>С уважением,</p>
          <p>
            Генеральный директор Международного
            хореографического движения «Танцуй, Россия»
          </p>
        </div>

        <div class="stamp-placeholder"></div>

        <strong class="name">
          Нурмухаметов Айдар Наилевич
        </strong>
      </div>

    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 1000;
  padding-top: 19vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Кнопка закрытия */
.close-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  font-size: 26px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
}

/* Контент */
.modal-content {
  max-width: 900px;
  margin: 0 auto;

  padding: 10vw 30vw 5vw;
}
/* Верх */
.header {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.logo-placeholder {
  width: 70px;
  height: 70px;
  background: #f5c400;
  flex-shrink: 0;
}


/* Низ */
.footer {
  margin-top: 48px;
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}


.stamp-placeholder {
  width: 90px;
  height: 90px;
  border: 2px dashed #ccc;
}


/* 📱 Телефон */
@media (max-width: 768px) {

  .header {
    flex-direction: column;
  }
.modal-content {
  max-width: 900px;
  margin: 0 auto;

  padding: 140vw 10vw 5vw;
}


  .footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
