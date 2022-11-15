// Проверка подключения скрипта
console.log('123123');

// 1. Открытие/закрытие попапа
// 1.1 Выборка самого попапа
const popupEditElement = document.querySelector('.popup-edit');
// 1.2 Выборка элемента с кнопками вызова попапа
const popupProfileElement = document.querySelector('.profile');
// 1.3 Выборка необходимых элементов
const popupEditOpenElement = popupProfileElement.querySelector('.profile__edit-btn');
const popupEditCloseElement = popupEditElement.querySelector('.popup-edit__close');
// Inputs
const popupEditNameInput = popupEditElement.querySelector('#name');
const popupEditJobInput = popupEditElement.querySelector('#job');
// Submit Button
const popupEditSubmitButton = popupEditElement.querySelector('.popup-edit__submit');

console.log(popupEditNameInput);
console.log(popupEditJobInput);
console.log(popupEditSubmitButton);

// Открытие попапа
const openPopupEdit = function (event) {
  popupEditElement.classList.add('popup-edit_is-opened');
  console.log('popup-edit is opened');
}

// Закрытие попапа
const closePopupEdit = function () {
  popupEditElement.classList.remove('popup-edit_is-opened');
  console.log('popup-edit is closed');
}

// Закрытие попапа при нажатии за пределами окна
const closePopupEditByClickOnOverlay = function (event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return
  }

  closePopupEdit();
}




let profileElement = document.querySelector('.profile');
let nameTextElement = profileElement.querySelector('.profile__my-name');
let jobTextElement = profileElement.querySelector('.profile__about-me');


// 2. Запись и сохранение значений в окне 'редактировать профиль'.
// При нажатии на submit должна происходить выборка содержимого input 
// и перезаписываться в profile
const submitPopupEdit = function () {
  let nameInputValue = popupEditNameInput.value;
  let jobInputValue = popupEditJobInput.value;
  // переносим значения в html-разметку
  nameTextElement.innerHTML = nameInputValue;
  jobTextElement.textContent = jobInputValue;
  // при повторном открытии окна мы должны видеть указанные значения ранее
  popupEditNameInput.defaultValue = nameInputValue;
  popupEditJobInput.defaultValue = jobInputValue;
  
  // И закрываем попап
  closePopupEdit();
}


// Регистрируем обработчики по клику
popupEditOpenElement.addEventListener('click', openPopupEdit);
popupEditCloseElement.addEventListener('click', closePopupEdit);
popupEditElement.addEventListener('click', closePopupEditByClickOnOverlay);
popupEditSubmitButton.addEventListener('click', submitPopupEdit);
