const popupEditElement = document.querySelector('.popup');
const popupProfileElement = document.querySelector('.profile');
const popupEditNameInput = popupEditElement.querySelector('#name');
const popupEditJobInput = popupEditElement.querySelector('#job');
const popupForm = document.forms.profileEditForm; 
// 1.3 Выборка необходимых элементов
const popupEditOpenElement = popupProfileElement.querySelector('.profile__edit-btn');
const popupEditCloseElement = popupEditElement.querySelector('.popup__close');
let nameTextElement = popupProfileElement.querySelector('.profile__my-name');
let jobTextElement = popupProfileElement.querySelector('.profile__about-me');
let cardLikeElements = document.querySelectorAll('.card__like-btn');

// like is active
const likeSwitch = function (event) {
  event.target.classList.toggle('card__like-btn_active');
}



// Открытие попапа
const openPopupEdit = function (event) {
  // Вставка данных из профиля в форму при открытии
  popupEditNameInput.value = nameTextElement.textContent;
  popupEditJobInput.value = jobTextElement.textContent;

  popupEditElement.classList.add('popup_opened');
}

// Закрытие попапа
const closePopupEdit = function () {
  popupEditElement.classList.remove('popup_opened');
}

// Закрытие попапа при нажатии за пределами окна
const closePopupEditByClickOnOverlay = function (event) {
  console.log(event.target);
  // if (event.target !== event.currentTarget) {
    // return
  // }

  closePopupEdit();
}

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
  
  // И закрываем попап
  closePopupEdit();
}


// Регистрируем обработчики по клику
popupEditOpenElement.addEventListener('click', openPopupEdit);
popupEditCloseElement.addEventListener('click', closePopupEdit);
popupForm.addEventListener('submit', submitPopupEdit);
// Присвоение каждому 
cardLikeElements.forEach((element) => {
  element.addEventListener('click', likeSwitch);
});