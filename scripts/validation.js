//formElement - форма с классом .form из массива форм formList
//inputElement - инпут с классом .form__input из массива inputList
//errorMessage - письмо ошибки. (аргумент получит inputElement.validationMessage в checkInputValidity())

//Показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  //находим <span> с текстом ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //добавляем класс невалидному инпуту (в этом классе укажем красное подчеркивание)
  inputElement.classList.add('popup__input_type_error');
  //добавим текст ошибки в <span>
  errorElement.textContent = errorMessage;
  //добавим класс для отображения <span> на странице
  errorElement.classList.add('popup__input-error_active');
};
//скрыть ошибку
const hideInputError = (formElement, inputElement) => {
  //находим <span> с текстом ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //убираем класс валидному инпуту
  inputElement.classList.remove('popup__input_type_error');
  //убираем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  //убираем текст ошибки
  errorElement.textContent = '';
};

//Чекаем валидность инпутов и выполняем: showInputError||hideInputError
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  };
};

//Функция проверяет валидность всех инпутов формы
const hasInvalidInput = (inputList) => {
  //Если хотя бы один инпут невалиден - выдаст true
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//Функция переключения доступности кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  };
};
// TO DO: Сделать кнопку неактивной по дефолту и добавлять/убирать активный элемент через ф-цию


//Вешает слушатели на инпуты в форме, которые будут чекать валидность
const setEventListeners = (formElement) => {
  //находим инпуты в форме и делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //найдем кнопку сабмита
  const buttonElement = formElement.querySelector('.popup__submit');
  //кнопка должна быть выключена в начале при пустых полях
  toggleButtonState(inputList, buttonElement);
  //навешиваем слушатель на каждый инпут
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      //проверка валидности инпутов
      checkInputValidity(formElement, inputElement);
      //переключаем кнопку в зависимости от валидности всех инпутов формы
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Вешает слушатели на сабмиты форм
const enableValidation = () => {
  //создаем массив из всех форм
  const formList = Array.from(document.querySelectorAll('.form'));
  //для каждого элемента нового массива вешаем слушатель сабмита
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      //отмена отправки формы
      evt.preventDefault()
    });
    //и вешаем слушатели на инпуты через готовую функцию
    setEventListeners(formElement);
  });
};

enableValidation();