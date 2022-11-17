// 1. Открытие/закрытие попапа
// 1.1 Выборка самого попапа
const popupEditElement = document.querySelector('.popup');
// 1.2 Выборка элемента с кнопками вызова попапа
const popupProfileElement = document.querySelector('.profile');
// 1.3 Выборка необходимых элементов
const popupEditOpenElement = popupProfileElement.querySelector('.profile__edit-btn');
const popupEditCloseElement = popupEditElement.querySelector('.popup__close');
// Inputs
const popupEditNameInput = popupEditElement.querySelector('#name');
const popupEditJobInput = popupEditElement.querySelector('#job');
// Элементы из profile
let nameTextElement = popupProfileElement.querySelector('.profile__my-name');
let jobTextElement = popupProfileElement.querySelector('.profile__about-me');


// Открытие попапа
const openPopupEdit = function (event) {
  // Вставка данных из профиля в форму при открытии
  popupEditNameInput.value = nameTextElement.textContent;
  popupEditJobInput.value = jobTextElement.textContent;

  popupEditElement.classList.add('popup_is-opened');
}

// Закрытие попапа
const closePopupEdit = function () {
  popupEditElement.classList.remove('popup_is-opened');
}

// Закрытие попапа при нажатии за пределами окна
// const closePopupEditByClickOnOverlay = function (event) {
//   if (event.target !== event.currentTarget) {
//     return
//   }

//   closePopupEdit();
// }






// 2. Запись и сохранение значений в окне 'редактировать профиль'.
// При нажатии на submit должна происходить выборка содержимого input 
// и перезаписываться в profile
const submitPopupEdit = function (event) {
  event.preventDefault()
  let nameInputValue = popupEditNameInput.value;
  let jobInputValue = popupEditJobInput.value;
  // переносим значения в html-разметку
  nameTextElement.textContent = nameInputValue;
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
popupEditElement.addEventListener('submit', submitPopupEdit);