export default class FormValidator {

  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._button = form.querySelector(selectors.submitButtonSelector);
    this._inputs = [...form.querySelectorAll(selectors.inputSelector)];
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }

  //метод показа ошибки валидации
  _showValidationErrors(input, err) {
    input.classList.add(this._inputErrorClass);
    err.textContent = input.validationMessage;
    err.classList.add(this._errorClass);
  }
  //метод скрытия ошибки валидации
  _hideValidationErrors(input, err) {
    input.classList.remove(this._inputErrorClass);
    err.textContent = '';
    err.classList.remove(this._errorClass);
  }
  //Чекаем валидность инпутов
  _checkInputValidity(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showValidationErrors(input, error);
    } else {
      this._hideValidationErrors(input, error);
    };
  };

  //Метод переключения доступности кнопки
  _toggleButton() {
    const isFormValid = this._inputs.every(input => input.validity.valid);
    if (!isFormValid) {
      this._button.classList.add(this._selectors.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._selectors.inactiveButtonClass);
      this._button.disabled = false;
    };
  }
  //Установка слушателей
  _setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      //деактивируем кноку после сабмита
      this._button.classList.add(this._selectors.inactiveButtonClass);
      this._button.disabled = true;
    });
    //проверка валидности и активация кнопки сабмита
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    const inputs = [...this._form.querySelectorAll(this._selectors.inputSelector)];
    const button = this._form.querySelector(this._selectors.submitButtonSelector);
    //деактивация кнопки сабмита при открытии попапа
    this._toggleButton();
    this._setEventListeners();
  };
}

