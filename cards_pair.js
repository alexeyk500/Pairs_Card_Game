(() => {
  const BACK_GROUND_COLOR = '#81CDC5';
  const BACK_GROUND_COLOR_CARD_FIELD ='#397670';
  const FONT_COLOR_LIGHT = '#397670';
  const BORDER_RADIUS = '12px';
  const BLOCK_MARGIN_BORDER = '5vh';
  const FONT_SIZE_MAIN = '24px';

  const CARDS_HORIZONTAL = 4
  const CARDS_VERTICAL = 4;

  let newCardsHorizontal = CARDS_HORIZONTAL;
  let newCardsVertical = CARDS_VERTICAL;

  // Полноэкранная оберка для игры
  const wraper = document.getElementById('cardsPairApp');
  wraper.style.margin = 0;
  wraper.style.padding = 0;
  wraper.style.height = '100vh';
  wraper.style.display = 'flex';
  wraper.style.justifyContent = 'center';
  wraper.style.backgroundColor = BACK_GROUND_COLOR;

  // Создаем поле для игры
  const gameContainer = document.createElement('div');
  gameContainer.style.display = 'flex';
  gameContainer.style.margin = BLOCK_MARGIN_BORDER;
  gameContainer.style.maxWidth = '1200px';
  gameContainer.style.flexGrow = 1;
  gameContainer.style.justifyContent = 'center';
  gameContainer.style.backgroundColor = BACK_GROUND_COLOR_CARD_FIELD;
  gameContainer.style.borderRadius = BORDER_RADIUS;

  // Создаем форму для ввода количества карт для игры
  const gameSizeForm = document.createElement('div');
  gameSizeForm.style.display = 'flex';
  gameSizeForm.style.flexDirection = 'column'
  gameSizeForm.style.margin = BLOCK_MARGIN_BORDER;
  gameSizeForm.style.padding = BLOCK_MARGIN_BORDER
  gameSizeForm.style.flexGrow = 1;
  gameSizeForm.style.alignItems = 'center';
  gameSizeForm.style.backgroundColor = BACK_GROUND_COLOR;
  gameSizeForm.style.borderRadius = BORDER_RADIUS;

  // Добавляем элементы на форму ввода размеров игры
  // Заголовок
  const gameSizeFormCaption = document.createElement('h2');
  gameSizeFormCaption.textContent = 'Количество карт для игры';
  gameSizeFormCaption.style.fontSize = FONT_SIZE_MAIN*1.5;
  gameSizeFormCaption.style.color = FONT_COLOR_LIGHT;
  gameSizeFormCaption.style.marginBottom = BLOCK_MARGIN_BORDER*0.8;

  // INPUT для ввода количества карт
  function createInput(text, size) {
    const blockInput = document.createElement('div');
    blockInput.style.display = 'flex';
    blockInput.style.justifyContent = 'space-between';
    blockInput.style.alignItems = 'center';
    blockInput.style.marginBottom = BLOCK_MARGIN_BORDER*0.6;

    const label = document.createElement('h2');
    label.style.display = 'inline';
    label.textContent = text;
    label.style.margin  = '10px 10px 10px 0px'
    label.style.color = FONT_COLOR_LIGHT;

    const input = document.createElement('input');
    input.style.backgroundColor = '#CCCCCC';
    input.style.width = '10vh'
    input.style.border = 'none';
    input.style.borderRadius = BORDER_RADIUS;
    input.style.color = FONT_COLOR_LIGHT;
    input.style.fontSize = FONT_SIZE_MAIN
    input.placeholder = size;
    blockInput.append(label);
    blockInput.append(input);
    return [blockInput, input];
  };

  // тескст с описанием правил ввода кол-ва карт
  const descriptionRule = document.createElement('p');
  descriptionRule.textContent = 'В поле можно ввести чётное число от 2 до 10.'
  descriptionRule.style.color = FONT_COLOR_LIGHT;
  descriptionRule.style.fontSize = FONT_SIZE_MAIN*0.75
  descriptionRule.style.marginBottom = BLOCK_MARGIN_BORDER*0.6;

  // кнопка начать игру
  const buttonStartGame = document.createElement('button');
  buttonStartGame.style.padding = '10px 20px'
  buttonStartGame.style.fontSize = FONT_SIZE_MAIN
  buttonStartGame.textContent = 'Начать игру';
  buttonStartGame.style.backgroundColor = BACK_GROUND_COLOR_CARD_FIELD;
  buttonStartGame.style.border = 'none';
  buttonStartGame.style.borderRadius = BORDER_RADIUS;
  buttonStartGame.style.color = BACK_GROUND_COLOR;

  // Функция создания игровой формы для ввода кол-ва карт в игре
  function createGameSizeForm() {
    gameSizeForm.append(gameSizeFormCaption);
    let [stringHorizontal, inputHorizontal] = createInput('По горизонтали', CARDS_HORIZONTAL);
    gameSizeForm.append(stringHorizontal);
    let [stringVertical, inputVertical] = createInput('По вертикали', CARDS_VERTICAL);
    gameSizeForm.append(stringVertical);
    gameSizeForm.append(descriptionRule);
    gameSizeForm.append(buttonStartGame);
    // Нажатие на кнопку 'Начать игру'
    buttonStartGame.addEventListener('click',()=>{
      console.log(inputHorizontal.value, inputVertical.value)
      // Уничтожение окна ввода размеров игры
      gameSizeForm.parentNode.removeChild(gameSizeForm);
      // Раздача карт
      cardsDistribution(newCardsHorizontal, newCardsVertical);
    });

    // Ввод в поле 'По горизонтали'
    inputHorizontal.addEventListener('input',()=>{
      newCardsHorizontal = chekInput(CARDS_HORIZONTAL, inputHorizontal)
      // console.log('CARDS_HORIZONTAL, cardsVertical = ', CARDS_HORIZONTAL, cardsVertical);
    })
    // Ввод в поле 'По вертикали'
    inputVertical.addEventListener('input',()=>{
      let newCardsVertical = chekInput(CARDS_VERTICAL, inputVertical)
    })

    // проверяем на корректность новые занчения размеров карточного поля
     if (!(newCardsHorizontal >= 2)&&(newCardsHorizontal <= 10)&&(newCardsHorizontal % 2 === 0)) {
      newCardsHorizontal = CARDS_HORIZONTAL;
     }
     if (!(newCardsVertical >= 2)&&(newCardsVertical <= 10)&&(newCardsVertical % 2 === 0)) {
      newCardsVertical = CARDS_VERTICAL;
     }
    return gameSizeForm
  };
  // Функция ограничения ввода чисел в input
  function chekInput(cardsNow, input) {
    if (parseInt(input.value)) {
      let newSize = parseInt(input.value)
      if ( ((newSize >= 2)&&(newSize <= 10)&&(newSize % 2 === 0)) || (newSize === 1) ){     //
        return (newSize);
      } else {
        input.value = '';
        input.placeholder = cardsNow;
        return (cardsNow);
        }
    } else {
      input.value = '';
      input.placeholder = cardsNow;
      return (cardsNow);
    }
  };

  function cardsDistribution(cardsHorizontal, cardsVertical) {
    //  Меняем параметры поля для игры
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.justifyContent = 'flex-start';
    gameContainer.style.alignItems = 'center';

    const numCardsString = document.createElement('p');
    numCardsString.textContent = 'Количество карт для игры = ' + (cardsHorizontal * cardsVertical) + ' ' + gameContainer.offsetWidth;
    numCardsString.style.color = BACK_GROUND_COLOR;
    numCardsString.style.fontSize = FONT_SIZE_MAIN*0.75
    numCardsString.style.marginBottom = BLOCK_MARGIN_BORDER*0.6;
    gameContainer.append(numCardsString);

    const cardsList = document.createElement('ul');
    const cardPadding = 20;
    cardsList.style.margin = '0px 0px';
    cardsList.style.padding = cardPadding + 'px';
    cardsList.style.display = 'flex';
    cardsList.style.flexWrap = 'wrap'
    cardsList.style.flexGrow = 1;
    cardsList.style.justifyContent = 'space-between';
    cardsList.style.listStyleType = 'none'
    let cardWidth = () => {
      let widthContainer = gameContainer.offsetWidth - 2 * cardPadding;
      let widthOneCard = widthContainer / cardsHorizontal;
      //let widthOneCardWithoutPadding = widthOneCard -  0.1 * widthOneCard;
      return widthOneCard //widthOneCardWithoutPadding;
    };
    console.log('card.style.width', cardWidth())

    cardArray = []
    for (let i = 0; i < (cardsHorizontal * cardsVertical); i++) {
      const card = document.createElement('li');
      card.style.display = 'flex';
      card.style.justifyContent = 'center';
      card.style.alignItems = 'center';
      card.textContent = 'Карта № = ' + (parseInt(i)+1);
      card.style.width = cardWidth()+ 'px';
      card.style.color = BACK_GROUND_COLOR;
      card.style.fontSize = FONT_SIZE_MAIN*0.75
      card.style.marginBottom = BLOCK_MARGIN_BORDER*0.2;
      cardsList.append(card);
    }
    gameContainer.append(cardsList);
  }

  document.addEventListener('DOMContentLoaded',() => {
    wraper.append(gameContainer);
    gameContainer.append(createGameSizeForm());
    console.log('cardsHorizontal, cardsVertical = ', newCardsHorizontal, newCardsVertical);
  });
})();
