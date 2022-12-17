// popup
const popupEditElement = document.querySelector('#popup-edit');
const popupAddElement = document.querySelector('#popup-add');
const popupFullScreenElement = document.querySelector('#popup-full-screen');
// close popup buttons
const popupEditCloseButton = popupEditElement.querySelector('.popup__close');
const popupAddCloseButton = popupAddElement.querySelector('.popup__close');
const popupFullScreenCloseButton = popupFullScreenElement.querySelector('.popup__close');
// profile elements
const popupProfileElement = document.querySelector('.profile');
const popupEditOpenElement = popupProfileElement.querySelector('.profile__edit-btn');
const nameTextElement = popupProfileElement.querySelector('.profile__my-name');
const jobTextElement = popupProfileElement.querySelector('.profile__about-me');
const cardsSectionElement = document.querySelector('.cards');
const popupAddOpenElement = popupProfileElement.querySelector('.profile__add-btn');
// inputs
const popupEditNameInput = popupEditElement.querySelector('#name-input');
const popupEditJobInput = popupEditElement.querySelector('#job-input');
const popupEditForm = document.forms.profileEditForm;
const popupAddMestoInput = popupAddElement.querySelector('#title-input');
const popupAddImageInput = popupAddElement.querySelector('#link-input');
const popupAddForm = document.forms.profileAddForm;
// template
const cardTemplateElement = document.querySelector('#cardTemplate').content;


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
const openPopupFullScreen = (event) => {
  const popupFullScreenImg = popupFullScreenElement.querySelector('.popup__image');
  const popupFullScreenCaption = popupFullScreenElement.querySelector('.popup__caption');
  //получить свойста пикчи и присвоить тегу img свойства src & alt
  popupFullScreenImg.src = event.target.src;
  popupFullScreenImg.alt = event.target.alt;
  popupFullScreenCaption.textContent = event.target.alt;
  //открыть попап
  openPopup(popupFullScreenElement);
}


// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClickOnOverlay);
  document.removeEventListener('keydown', closePopupByEscape);
}
const closePopupEdit = () => {
  closePopup(popupEditElement);
}
const closePopupAdd = () => {
  closePopup(popupAddElement);
}
const closePopupFullScreen = () => {
  closePopup(popupFullScreenElement);
}

// Закрытие попапа при нажатии за пределами окна
const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
      return;
    } else {
      closePopup(event.currentTarget);
    }
}

//Закрытие попапа при нажатии на Escape
const closePopupByEscape = (event) => {
  if (event.key !== 'Escape') {
    return;
  } else {
    const popupIsOpened = document.querySelector('.popup_opened');
    closePopup(popupIsOpened);
  }
}

//Like
const LikeSwitch = function (evt) {
  evt.target.classList.toggle('card__like-btn_active');
}
//Delete
const DeleteCard = function (evt) {
  evt.target.closest('.card').remove();
}


// 2. Запись и сохранение значений в окне 'редактировать профиль'.
// При нажатии на submit должна происходить выборка содержимого input 
// и перезаписываться на страницу пользователя
const submitPopupEdit = function (event) {
  event.preventDefault()
  nameTextElement.textContent = popupEditNameInput.value;
  jobTextElement.textContent = popupEditJobInput.value;
  // И закрываем попап
  closePopupEdit();
}

//создаем новую карточку. Это часть функции prependCard
const createCard = function (item) {
  const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-btn');
  const cardDeleteButton = cardElement.querySelector('.card__trash-btn');

  cardTitleElement.textContent = item.name;
  cardImageElement.src = item.link;
  cardImageElement.alt = item.name;

  cardLikeButton.addEventListener('click', LikeSwitch);
  cardDeleteButton.addEventListener('click', DeleteCard);
  cardImageElement.addEventListener('click', openPopupFullScreen);

  return cardElement;
}
//создаем новую карточку и говорим куда ее добавить
const prependCard = function (item, prependPlace) {
  card = createCard(item);
  prependPlace.prepend(card);
}


//6 карточек из массива добавим на страницу 
initialCards.forEach((el) => {
  prependCard(el, cardsSectionElement);
});

//Добавление новой карточки
const submitPopupAdd = function (event) {
  event.preventDefault()
  //берет содержимое инпутов и записывает в новый элемент
  const cardElement = {
    name: popupAddMestoInput.value,
    link: popupAddImageInput.value
  };
  //тут создается темплейт с вышеуказанными данными и делаем препенд 
  prependCard(cardElement, cardsSectionElement);

  closePopupAdd();
}

// Регистрируем обработчики по клику
popupEditOpenElement.addEventListener('click', openPopupEdit);
popupEditCloseButton.addEventListener('click', closePopupEdit);
popupEditForm.addEventListener('submit', submitPopupEdit);
popupAddOpenElement.addEventListener('click', openPopupAdd);
popupAddCloseButton.addEventListener('click', closePopupAdd);
popupAddForm.addEventListener('submit', submitPopupAdd);
popupFullScreenCloseButton.addEventListener('click', closePopupFullScreen);