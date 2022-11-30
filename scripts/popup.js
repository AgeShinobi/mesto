// popup
const popupEditElement = document.querySelector('#popup-edit');
const popupAddElement = document.querySelector('#popup-add');
// close popup btn elements
const popupEditCloseElement = popupEditElement.querySelector('.popup__close');
const popupAddCloseElement = popupAddElement.querySelector('.popup__close');
// profile elements
const popupProfileElement = document.querySelector('.profile');
const popupEditOpenElement = popupProfileElement.querySelector('.profile__edit-btn');
let nameTextElement = popupProfileElement.querySelector('.profile__my-name');
let jobTextElement = popupProfileElement.querySelector('.profile__about-me');
const cardsSectionElement = document.querySelector('.cards');
const popupAddOpenElement = popupProfileElement.querySelector('.profile__add-btn');
// inputs
const popupEditNameInput = popupEditElement.querySelector('#name');
const popupEditJobInput = popupEditElement.querySelector('#job');
const popupEditForm = document.forms.profileEditForm;
const popupAddMestoInput = popupAddElement.querySelector('#mesto');
const popupAddImageInput = popupAddElement.querySelector('#img-link');
const popupAddForm = document.forms.profileAddForm;
// template
const cardTemplateElement = document.querySelector('#cardTemplate').content;



// Открытие попапа
const openPopupEdit = function (event) {
  // Вставка данных из профиля в форму при открытии
  popupEditNameInput.value = nameTextElement.textContent;
  popupEditJobInput.value = jobTextElement.textContent;

  popupEditElement.classList.add('popup_opened');
}
const openPopupAdd = () => {
  popupAddMestoInput.value = '';
  popupAddImageInput.value = '';
  popupAddElement.classList.add('popup_opened');
}

// Закрытие попапа
const closePopupEdit = function () {
  popupEditElement.classList.remove('popup_opened');
}
const closePopupAdd = () => {
  popupAddElement.classList.remove('popup_opened');
}


// // Закрытие попапа при нажатии за пределами окна
// const closePopupEditByClickOnOverlay = function (event) {
//   console.log(event.target);
//   // if (event.target !== event.currentTarget) {
//     // return
//   // }

//   closePopupEdit();
// }

// 2. Запись и сохранение значений в окне 'редактировать профиль'.
// При нажатии на submit должна происходить выборка содержимого input 
// и перезаписываться на страницу пользователя
const submitPopupEdit = function (event) {
  event.preventDefault()
  let nameInputValue = popupEditNameInput.value;
  let jobInputValue = popupEditJobInput.value;
  // переносим значения в html-разметку
  nameTextElement.textContent = nameInputValue;
  jobTextElement.textContent = jobInputValue;
  // И закрываем попап
  closePopupEdit();
}

const submitPopupAdd = function (event) {
  event.preventDefault()
  //клонирование содержимого темплейта
  const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
  //Это титл и линк внутри темплейта. Им нужно присвоить значения из inputs
  cardElement.querySelector('.card__title').textContent = popupAddMestoInput.value;
  cardElement.querySelector('.card__image').src = popupAddImageInput.value;
  cardElement.querySelector('.card__image').alt = popupAddMestoInput.value;
  //добавить слушатель лайка для новой карточки
  cardElement.querySelector('.card__like-btn').addEventListener('click',
  function(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });
  //добавить слушатель на кнопку корзины
  cardElement.querySelector('.card__trash-btn').addEventListener('click', 
  function(evt) {
    cardElement.remove();
  });
  // вставляет склонированный контент на страницу через .append
  cardsSectionElement.prepend(cardElement);
  // И закрываем попап
  closePopupAdd()
}


// Регистрируем обработчики по клику
popupEditOpenElement.addEventListener('click', openPopupEdit);
popupEditCloseElement.addEventListener('click', closePopupEdit);
popupEditForm.addEventListener('submit', submitPopupEdit);
popupAddOpenElement.addEventListener('click', openPopupAdd);
popupAddCloseElement.addEventListener('click', closePopupAdd);
popupAddForm.addEventListener('submit', submitPopupAdd);
