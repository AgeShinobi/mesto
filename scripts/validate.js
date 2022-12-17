//функция показа ошибки валидации
const showValidationErrors = (input, config, err) => {
  err.classList.add(config.errorClass);
  err.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

const hideValidationErrors = (input, config, err) => {
  err.classList.remove(config.errorClass);
  err.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

//Чекаем валидность инпутов
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showValidationErrors(input, config, error);
  } else {
    hideValidationErrors(input, config, error);
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

//Установка слушателей
const setEventListeners = (form, inputs, button, config) => {
  //отмена отправки формы на сабмит
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    //деактивируем кноку после сабмита
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  });
  //проверка валидности и активация кнопки сабмита
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, config);
      toggleButton(inputs, button, config);
    });
  });
}

const enableValidation = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);
    //деактивация кнопки сабмита при открытии попапа
    toggleButton(inputs, button, config);

    setEventListeners(form, inputs, button, config);
  });

};

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});