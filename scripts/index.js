import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from './FormValidator.js';
import { closePopup, closePopupByClickOnOverlay, closePopupByEscape } from './common.js';

// popup
const popupEditElement = document.querySelector('#popup-edit');
const popupAddElement = document.querySelector('#popup-add');
const popupFullScreenElement = document.querySelector('#popup-full-screen');
const popupFullScreenImg = popupFullScreenElement.querySelector('.popup__image');
const popupFullScreenCaption = popupFullScreenElement.querySelector('.popup__caption');
// close popup buttons
const popupEditCloseButton = popupEditElement.querySelector('.popup__close');
const popupAddCloseButton = popupAddElement.querySelector('.popup__close');
const popupFullScreenCloseButton = popupFullScreenElement.querySelector('.popup__close');
// profile elements
const popupProfileElement = document.querySelector('.profile');
const popupEditOpenElement = popupProfileElement.querySelector('.profile__edit-btn');
const nameTextElement = popupProfileElement.querySelector('.profile__my-name');
const jobTextElement = popupProfileElement.querySelector('.profile__about-me');
const popupAddOpenElement = popupProfileElement.querySelector('.profile__add-btn');
// inputs
const popupEditNameInput = popupEditElement.querySelector('#name-input');
const popupEditJobInput = popupEditElement.querySelector('#job-input');
const popupEditForm = document.forms.profileEditForm;
const popupAddMestoInput = popupAddElement.querySelector('#title-input');
const popupAddImageInput = popupAddElement.querySelector('#link-input');
const popupAddForm = document.forms.profileAddForm;

//6 карточек по умолчанию создаются при загрузке страницы
initialCards.forEach((item) => {
  const card = new Card(item, Card.selectors.template);
  const cardElement = card.generateCard();
  document.querySelector(Card.selectors.prependPlace).prepend(cardElement);
});

//Создание карточки через попап
const submitPopupAdd = function (event) {
  event.preventDefault()
  //берет содержимое инпутов и записывает в новый элемент
  const cardInfo = {
    name: popupAddMestoInput.value,
    link: popupAddImageInput.value
  };
  //тут создается темплейт с вышеуказанными данными и делаем препенд 
  const card = new Card(cardInfo, Card.selectors.template);
  const cardElement = card.generateCard();

  document.querySelector(Card.selectors.prependPlace).prepend(cardElement);
  closePopup(popupAddElement);
}

//конфиг для FormValidator
const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
//для каждой формы вешаем валидатор
const forms = [...document.querySelectorAll(config.formSelector)];
forms.forEach(form => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});


// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClickOnOverlay);
  document.addEventListener('keydown', closePopupByEscape);
};

const openPopupEdit = function (event) {
  // Вставка данных из профиля в форму при открытии
  popupEditNameInput.value = nameTextElement.textContent;
  popupEditJobInput.value = jobTextElement.textContent;
  openPopup(popupEditElement);
}
const openPopupAdd = () => {
  popupAddForm.reset();
  openPopup(popupAddElement);
}

// 2. Запись и сохранение значений в окне 'редактировать профиль'.
// При нажатии на submit должна происходить выборка содержимого input 
// и перезаписываться на страницу пользователя
const submitPopupEdit = function (event) {
  event.preventDefault()
  nameTextElement.textContent = popupEditNameInput.value;
  jobTextElement.textContent = popupEditJobInput.value;
  // И закрываем попап
  closePopup(popupEditElement);
}

// Регистрируем обработчики по клику
popupEditOpenElement.addEventListener('click', openPopupEdit);
popupEditCloseButton.addEventListener('click', () => { closePopup(popupEditElement) });
popupEditForm.addEventListener('submit', submitPopupEdit);
popupAddOpenElement.addEventListener('click', openPopupAdd);
popupAddCloseButton.addEventListener('click', () => { closePopup(popupAddElement) });
popupAddForm.addEventListener('submit', submitPopupAdd);
popupFullScreenCloseButton.addEventListener('click', () => { closePopup(popupFullScreenElement) });