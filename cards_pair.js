(() => {
  // Создаем контейнер для игры
  const container = document.getElementById('cardsPairApp');
  container.classList.add('container');
  container.setAttribute("style", "margin: 0 auto; max-width: 1200px;");
  // Создаем поле для карт
  const card_field = document.createElement('div');
  card_field.setAttribute("style", "display: flex; height: 100%; margin: 50px 50px; padding: 50px 50px; border-radius: 12px; background-color: #F1996B;");

  document.addEventListener('DOMContentLoaded',() => {
    container.append(card_field);
  });
})();
