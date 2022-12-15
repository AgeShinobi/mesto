// const forms = [...document.querySelectorAll('.form')]
//  const inputs = [...document.querySelectorAll('.popup__input')]

//Чекаем валидность инпутов
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    error.classList.add(config.errorClass);
    error.textContent = input.validationMessage;
  } else {
    error.classList.remove(config.errorClass);
    error.textContent = '';
  };
};

//Функция переключения доступности кнопки
const toggleButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid);
  if (!isFormValid) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  };
};

const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);
    //функция здесь для деактивации кнопки сабмита при открытии попапа
    toggleButton(inputs, button, config);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, config);
        toggleButton(inputs, button, config);
      });
    });
  });

};