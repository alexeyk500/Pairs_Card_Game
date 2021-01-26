(() => {
  const BACK_GROUND_COLOR = '#81CDC5';
  const BACK_GROUND_COLOR_CARD_FIELD ='#397670';
  const FONT_COLOR_LIGHT = '#397670';
  const COLOR_ACTIV_CARD_BORDER = '#2219B2';
  const BORDER_RADIUS = '12px';
  const BLOCK_MARGIN_BORDER = '5';
  const MAX_WIDTH = 1200;


  const CARDS_HORIZONTAL = 4  // кол-во карт по умолчанию по горизонтали
  const CARDS_VERTICAL = 4;   // кол-во карт по умолчанию по вертикали

  const TIME_OUT = 60;       // кол-во секунд для таймера

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

  // Определяем размер шрифта для надписей
  let wraperWidth = wraper.offsetWidth
  if (wraperWidth >= MAX_WIDTH) {
    wraperWidth = MAX_WIDTH;
  }
  let fontSizeMain = parseInt(wraperWidth / 47);
  console.log('wraper.offsetWidth, fontSize =', wraperWidth, fontSizeMain);

  // Создаем поле для игры
  const gameContainer = document.createElement('div');
  gameContainer.style.display = 'flex';
  gameContainer.style.margin = BLOCK_MARGIN_BORDER + '%';
  gameContainer.style.maxWidth = MAX_WIDTH + 'px';
  gameContainer.style.flexGrow = 1;
  gameContainer.style.justifyContent = 'center';
  gameContainer.style.backgroundColor = BACK_GROUND_COLOR_CARD_FIELD;
  gameContainer.style.borderRadius = BORDER_RADIUS;

  // Создаем форму для ввода количества карт для игры
  const gameSizeForm = document.createElement('div');
  gameSizeForm.style.display = 'flex';
  gameSizeForm.style.flexDirection = 'column'
  gameSizeForm.style.margin = BLOCK_MARGIN_BORDER + '%';
  gameSizeForm.style.padding = BLOCK_MARGIN_BORDER + '%'
  gameSizeForm.style.flexGrow = 1;
  gameSizeForm.style.alignItems = 'center';
  gameSizeForm.style.backgroundColor = BACK_GROUND_COLOR;
  gameSizeForm.style.borderRadius = BORDER_RADIUS;

  // Добавляем элементы на форму ввода размеров игры
  // Заголовок
  const gameSizeFormCaption = document.createElement('h2');
  gameSizeFormCaption.textContent = 'Количество карт для игры';
  gameSizeFormCaption.style.textAlign = 'center';
  gameSizeFormCaption.style.fontSize = fontSizeMain * 1.5 + 'px';
  gameSizeFormCaption.style.color = FONT_COLOR_LIGHT;
  gameSizeFormCaption.style.marginTop = BLOCK_MARGIN_BORDER*0.0 + '%';
  gameSizeFormCaption.style.marginBottom = BLOCK_MARGIN_BORDER*0.8 + '%';

  // INPUT для ввода количества карт
  function createInput(text, size) {
    const blockInput = document.createElement('div');
    blockInput.style.display = 'flex';
    blockInput.style.justifyContent = 'space-between';
    blockInput.style.alignItems = 'center';
    blockInput.style.marginBottom = BLOCK_MARGIN_BORDER*0.6 + '%';

    const label = document.createElement('h2');
    label.style.display = 'inline';
    label.style.textAlign = 'center';
    label.textContent = text;
    label.style.margin  = '10px 10px 10px 0px'
    label.style.color = FONT_COLOR_LIGHT;

    const input = document.createElement('input');
    input.style.backgroundColor = '#CCCCCC';
    input.style.width = '50%'
    input.style.border = 'none';
    input.style.borderRadius = BORDER_RADIUS;
    input.style.color = FONT_COLOR_LIGHT;
    input.style.fontSize = fontSizeMain + 'px';
    input.placeholder = size;
    blockInput.append(label);
    blockInput.append(input);
    return [blockInput, input];
  };

  // тескст с описанием правил ввода кол-ва карт
  const descriptionRule = document.createElement('p');
  descriptionRule.textContent = 'В поле можно ввести чётное число от 2 до 10.';
  descriptionRule.style.textAlign = 'center';
  descriptionRule.style.color = FONT_COLOR_LIGHT;
  descriptionRule.style.fontSize = fontSizeMain + 'px';
  descriptionRule.style.marginBottom = BLOCK_MARGIN_BORDER*0.6 + '%';

  // кнопка начать игру
  const buttonStartGame = document.createElement('button');
  buttonStartGame.style.padding = '10px 20px'
  buttonStartGame.style.fontSize = fontSizeMain + 'px';
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
      // console.log(inputHorizontal.value, inputVertical.value)
      // Уничтожение окна ввода размеров игры
      gameSizeForm.parentNode.removeChild(gameSizeForm);
      // Раздача карт
      console.log('newCardsHorizontal, newCardsVertical = ', newCardsHorizontal, newCardsVertical)
      cardsDistribution(newCardsHorizontal, newCardsVertical);
    });

    // Ввод в поле 'По горизонтали'
    inputHorizontal.addEventListener('input',()=>{
      newCardsHorizontal = chekInput(CARDS_HORIZONTAL, inputHorizontal);
      // console.log('CARDS_HORIZONTAL, cardsVertical = ', CARDS_HORIZONTAL, cardsVertical);
    })
    // Ввод в поле 'По вертикали'
    inputVertical.addEventListener('input',()=>{
      newCardsVertical = chekInput(CARDS_VERTICAL, inputVertical);
      //console.log('newCardsVertical', newCardsVertical)
    })

    // проверяем на корректность новые занчения размеров карточного поля
    if (!(newCardsHorizontal >= 2)&&(newCardsHorizontal <= 10)&&(newCardsHorizontal % 2 === 0)) {
      newCardsHorizontal = CARDS_HORIZONTAL;
      //console.log('newCardsHorizontal', newCardsHorizontal)
    }
    if (!(newCardsVertical >= 2)&&(newCardsVertical <= 10)&&(newCardsVertical % 2 === 0)) {
      newCardsVertical = CARDS_VERTICAL;
      //console.log('newCardsVertical', newCardsVertical)
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

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function cardsDistribution(cardsHorizontal, cardsVertical) {
    let timeGame = 0; // время игры

    let timerId = null;        // здесь будем хранить ID таймера
    let restOfTime = TIME_OUT; // остаток времени до конца хода

    //  Меняем параметры поля для игры
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.justifyContent = 'flex-start';
    gameContainer.style.alignItems = 'center';

    cardsForm = document.createElement('div');
    cardsForm.style.display = 'flex';
    cardsForm.style.flexDirection = 'column';
    cardsForm.style.width = '100%'
    cardsForm.style.flexGrow = 1;
    cardsForm.style.alignItems = 'center'
    gameContainer.append(cardsForm);

    const numCardsString = document.createElement('p');
    numCardsString.textContent = 'Количество карт в игре = ' + (cardsHorizontal * cardsVertical);
    numCardsString.style.textAlign = 'center';
    numCardsString.style.color = BACK_GROUND_COLOR;
    numCardsString.style.fontSize = fontSizeMain * 1.5 + 'px';
    numCardsString.style.marginBottom = BLOCK_MARGIN_BORDER*0.1 + '%';
    cardsForm.append(numCardsString);

    const timeToEndGame = document.createElement('p');
    timeToEndGame.textContent = 'выберите и нажмите на одну из карт';
    timeToEndGame.style.textAlign = 'center';
    timeToEndGame.style.color = BACK_GROUND_COLOR;
    timeToEndGame.style.fontSize = fontSizeMain * 1.5 + 'px';
    timeToEndGame.style.marginTop = BLOCK_MARGIN_BORDER*0.1 + '%';
    timeToEndGame.style.marginBottom = BLOCK_MARGIN_BORDER*0.4 + '%';
    cardsForm.append(timeToEndGame);

    const cardsList = document.createElement('ul');
    cardsList.style.margin = '0px 0px';
    cardsList.style.width = '90%'
    cardsList.style.padding = '0 0';
    cardsList.style.display = 'flex';
    cardsList.style.flexWrap = 'wrap'
    cardsList.style.flexGrow = 1;
    cardsList.style.justifyContent = 'space-between';
    cardsList.style.listStyleType = 'none'
    let cardWidth = () => {
      let widthOneCard = 100 / newCardsHorizontal ;
      return widthOneCard;
    };

    // Корректируем рамер шрифта для карт
    fontSizeCards= parseInt(fontSizeMain * 2);
    console.log('wraper.offsetWidth, fontSizeCards = ', fontSizeMain, fontSizeCards);

    // Заполняем массив номерами для текста в карточках
    cardsNumArray = []
    for( let i = 1; i <= (cardsHorizontal * cardsVertical)/2; i++) {
      cardsNumArray.push(i);
      cardsNumArray.push(i);
    }
    // перемешиваем массив
    shuffle(cardsNumArray);

    for (let i = 1; i <= (cardsHorizontal * cardsVertical); i++) {
      const card = document.createElement('li');
      card.style.display = 'flex';
      card.style.width = cardWidth() + '%';
      card.style.color = BACK_GROUND_COLOR;
      //card.style.fontSize = fontSizeCards + 'px';
      // содержимое карточки
      let cardContent = document.createElement('div');
      cardContent.style.display = 'flex';
      cardContent.style.flexGrow = '1';
      cardContent.style.justifyContent = 'center';
      // Текст в карточке и обложка
      let texCardContent = document.createElement('div');
      texCardContent.className = 'texCardContent';
      texCardContent.style.marginBottom = '5%';
      if (i % parseInt(cardsHorizontal) === 0) {
        texCardContent.style.marginRight  = '0';
      } else {
        texCardContent.style.marginRight  = '5%';
      };
      texCardContent.style.display = 'flex';
      texCardContent.style.flexGrow = '1';
      texCardContent.style.flexDirection = 'column';
      texCardContent.style.justifyContent = 'center';
      texCardContent.style.alignItems = 'center';
      texCardContent.style.fontSize = fontSizeCards + 'px';
      texCardContent.textContent = cardsNumArray[i-1];
      texCardContent.textAlign = 'center';
      texCardContent.style.color = BACK_GROUND_COLOR; //BACK_GROUND_COLOR_CARD_FIELD;
      texCardContent.style.backgroundColor = BACK_GROUND_COLOR;
      texCardContent.style.border = '1px solid ' + BACK_GROUND_COLOR;
      texCardContent.style.borderRadius = BORDER_RADIUS;
      // Пользовательские свойства карты
      texCardContent.numCard  = i;
      texCardContent.isClose  = true;
      texCardContent.havePair = false;

      // Нажатие на карту
      texCardContent.addEventListener('click',()=>{
        if (buttonResetGame.style.visibility === 'hidden') {
          if (!(texCardContent.havePair)) {
            if (texCardContent.isClose  === true){
              texCardContent.style.color = BACK_GROUND_COLOR;
              texCardContent.style.backgroundColor = BACK_GROUND_COLOR_CARD_FIELD;
              texCardContent.isClose = false;
              texCardContent.style.border = '1px solid ' + COLOR_ACTIV_CARD_BORDER;
            } else {
              texCardContent.style.color = BACK_GROUND_COLOR_CARD_FIELD;
              texCardContent.style.backgroundColor = BACK_GROUND_COLOR;
              texCardContent.style.border = '1px solid ' + BACK_GROUND_COLOR;
              texCardContent.isClose = true;
            };
          };

          // Получаем список всех карт
          const cards = document.getElementsByClassName("texCardContent");

          // Проверяем наличие двух открытых карт
          let numOpenCardWithoutPair = 0;
          for (curCard of cards) {
            if ((!curCard.isClose) && (!curCard.havePair)) {
              numOpenCardWithoutPair +=1;
              //console.log('Проверяем наличие двух открытых карт');
              curCard.style.border = '1px solid ' + COLOR_ACTIV_CARD_BORDER;
            };
          };
          // Если уже открыто две карты без пар то зыкрываем их и открываем текущую
          if (numOpenCardWithoutPair > 2) {
            for (curCard of cards) {
              if ((!curCard.isClose) && (!curCard.havePair)) {
                // зыкрываем их
                curCard.style.color = BACK_GROUND_COLOR;//BACK_GROUND_COLOR_CARD_FIELD;
                curCard.style.backgroundColor = BACK_GROUND_COLOR;
                curCard.style.border = '1px solid ' + BACK_GROUND_COLOR;
                curCard.isClose = true;
                numOpenCardWithoutPair = 1;
              };
            };
          }

          // открываем текущую
          if (!texCardContent.havePair) {
            texCardContent.style.color = BACK_GROUND_COLOR;
            texCardContent.style.backgroundColor = BACK_GROUND_COLOR_CARD_FIELD;
            texCardContent.style.border = '1px solid ' + COLOR_ACTIV_CARD_BORDER;
            texCardContent.isClose = false;
          }
          if (curCard.havePair) {
            curCard.style.border = '1px solid ' + BACK_GROUND_COLOR;
          }

          // Если открывается вторая карта проверяем ее на парность
          let arrCardText = []
          if (numOpenCardWithoutPair == 2) {
            for (curCard of cards) {
              if ((!curCard.isClose) && (!curCard.havePair)) {
                // смотрим, что за текст
                arrCardText.push(curCard.textContent)
              };
            };
            // Если текст в картах одинаковый, то делаем их парными
            if (arrCardText[0]==arrCardText[1]) {
              for (curCard of cards) {
                if ((!curCard.isClose) && (!curCard.havePair)) {
                  curCard.havePair = true;
                  curCard.style.border = '1px solid ' + BACK_GROUND_COLOR;
                };
                numOpenCardWithoutPair = 1;
              };
            };
          };
          // Проверяем на окончание игры и отображаем счет
          // Считаем количество карт имеющих пары (пары == кол-ву карт => конец игры)
          let cardsHavePair = 0;
          for (curCard of cards) {
            if (curCard.havePair) {
              cardsHavePair +=1;
            };
          };
          // Отображаем остаток карт в игре
          numCardsString.textContent = 'Количество карт в игре = ' + (cardsHorizontal * cardsVertical - cardsHavePair);

          // Проверяем на победу в игре
          if (cardsHavePair == (cardsHorizontal * cardsVertical)) {
            numCardsString.textContent = 'Победа';
            timeToEndGame.textContent = 'время игры = '+ timeGame +' сек.'
            buttonResetGame.style.visibility = 'visible';
          }

          if (timerId === null) {
            // заводим таймер
            restOfTime = TIME_OUT;
            clearTimeout(timerId);
            // Отображаем таймер
            timerId = setTimeout(function tick() {
              restOfTime -= 1;
              timeGame +=1;
              if (restOfTime === 0) {
                if (numCardsString.textContent !== 'Победа') {
                  timeToEndGame.textContent = 'Время игры вышло';
                }
                buttonResetGame.style.visibility = 'visible';
                clearTimeout(timerId);
                return;
              }
              if (numCardsString.textContent !== 'Победа') {
                timeToEndGame.textContent = 'До конца игры осталось = ' + restOfTime + ' сек.';
              }
              timerId = setTimeout(tick, 1000);
            }, 1000);
          }

        }
      });
      cardContent.append(texCardContent);
      card.append(cardContent);
      cardsList.append(card);
    };
    cardsForm.append(cardsList);

    // Сыграть ещё раз
    const buttonResetGame = document.createElement('button');
    buttonResetGame.style.display = 'block';
    buttonResetGame.style.margin = '1%';
    buttonResetGame.style.marginBottom = '2%';
    buttonResetGame.style.padding = '10px 20px'
    buttonResetGame.style.fontSize = fontSizeMain + 'px';
    buttonResetGame.textContent = 'Сыграть ещё раз';
    buttonResetGame.style.backgroundColor = BACK_GROUND_COLOR;
    buttonResetGame.style.border = 'none';
    buttonResetGame.style.borderRadius = BORDER_RADIUS;
    buttonResetGame.style.color = BACK_GROUND_COLOR_CARD_FIELD;
    buttonResetGame.style.visibility = 'hidden';
    cardsForm.append(buttonResetGame);
    // Нажатие на кнопку 'Сыграть ещё раз'
    buttonResetGame.addEventListener('click',()=>{
      cardsForm.parentNode.removeChild(cardsForm);
      cardsDistribution(cardsHorizontal, cardsVertical)
    });

  };

  document.addEventListener('DOMContentLoaded',() => {
    wraper.append(gameContainer);
    gameContainer.append(createGameSizeForm());
  });
})();
