//6 карточек "Из коробки"
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((el) => {
  //клонирование содержимого темплейта
  const cardElement = cardTemplateElement.querySelector('.card').cloneNode(true);
  //присвоение значений из массива
  cardElement.querySelector('.card__title').textContent = el.name;
  cardElement.querySelector('.card__image').src = el.link;
  cardElement.querySelector('.card__image').alt = el.name;

  cardElement.querySelector('.card__like-btn').addEventListener('click',
  function(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });

  cardElement.querySelector('.card__trash-btn').addEventListener('click', 
  function(evt) {
    cardElement.remove();
  });
  // вставляет склонированный контент на страницу через .prepend
  cardsSectionElement.prepend(cardElement);

  cardElement.querySelector('.card__image').addEventListener('click', openPopupFullScreen);

  
  
});






