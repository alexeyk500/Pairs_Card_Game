(() => {
  const BACK_GROUND_COLOR = '#81CDC5';
  const BACK_GROUND_COLOR_CARD_FIELD ='#397670';
  const FONT_COLOR_LIGHT = '#397670';
  const BORDER_RADIUS = '12px';
  // const FONT_COLOR_LIGHT = '#123EAB';
  const BLOCK_MARGIN_BORDER = '5vh';
  const FONT_SIZE_MAIN = '24px';

  const sizeHorizontal = 4
  const sizeVertical = 4;

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
    let [stringHorizontal, inputHorizontal] = createInput('По горизонтали', sizeHorizontal);
    gameSizeForm.append(stringHorizontal);
    let [stringVertical, inputVertical] = createInput('По вертикали', sizeVertical);
    gameSizeForm.append(stringVertical);
    gameSizeForm.append(descriptionRule);
    gameSizeForm.append(buttonStartGame);
    buttonStartGame.addEventListener('click',()=>{
      console.log(inputHorizontal.value, inputVertical.value)
      gameSizeForm.parentNode.removeChild(gameSizeForm);
    });
    return gameSizeForm
  };

  document.addEventListener('DOMContentLoaded',() => {
    wraper.append(gameContainer);
    gameContainer.append(createGameSizeForm());
    console.log('11111111');
    // gameContainer.append(gameSizeForm);
    // gameSizeForm.append(gameSizeFormCaption);
    // let [stringHorizontal, inputHorizontal] = createInput('По горизонтали', sizeHorizontal);
    // gameSizeForm.append(stringHorizontal);
    // let [stringVertical, inputVertical] = createInput('По вертикали', sizeVertical);
    // gameSizeForm.append(stringVertical);
    // gameSizeForm.append(descriptionRule);
    // gameSizeForm.append(buttonStartGame);
    // buttonStartGame.addEventListener('click',()=>{
    //   console.log(inputHorizontal.value, inputVertical.value)
    //   gameSizeForm.parentNode.removeChild(gameSizeForm);
    // });
  });
})();
