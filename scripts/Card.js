import { closePopupByClickOnOverlay, closePopupByEscape } from './common.js';

export default class Card {

  static selectors = {
    template: '#cardTemplate',
    prependPlace: '.cards',
    card: '.card',
    name: '.card__title',
    link: '.card__image',
    likeButton: '.card__like-btn',
    likeIsActive: 'card__like-btn_active',
    deleteButton: '.card__trash-btn',

    popupFullScreen: '#popup-full-screen',
    fullScreenImage: '.popup__image',
    fullScreenCaption: '.popup__caption'
  }

  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }


  // забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(Card.selectors.card)
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector(Card.selectors.name).textContent = this._name;
    this._element.querySelector(Card.selectors.link).alt = this._name;
    this._element.querySelector(Card.selectors.link).src = this._link;
    // Вернём элемент наружу
    return this._element;
  }



  //listeners
  _setEventListeners() {
    //listeners__like
    this._element.querySelector(Card.selectors.likeButton).addEventListener('click', () => {
      this._handleToggleLike();
    });
    //listeners__delete
    this._element.querySelector(Card.selectors.deleteButton).addEventListener('click', () => {
      this._handleDeleteCard();
    });
    //listeners__fullScreen
    this._element.querySelector(Card.selectors.link).addEventListener('click', () => {
      this._openPopupFullScreen();
    })
  }

  //Like
  _handleToggleLike() {
    this._element.querySelector(Card.selectors.likeButton).classList.toggle(Card.selectors.likeIsActive);
  }
  //delete
  _handleDeleteCard() {
    this._element.closest(Card.selectors.card).remove();
  }
  //fullScreen
  _openPopupFullScreen() {
    const popupFullScreen = document.querySelector(Card.selectors.popupFullScreen);
    const popupFullScreenImage = popupFullScreen.querySelector(Card.selectors.fullScreenImage);
    const popupFullScreenCaption = popupFullScreen.querySelector(Card.selectors.fullScreenCaption);

    popupFullScreenImage.src = this._element.querySelector(Card.selectors.link).src;
    popupFullScreenImage.alt = this._element.querySelector(Card.selectors.name).textContent;
    popupFullScreenCaption.textContent = this._element.querySelector(Card.selectors.name).textContent;
    popupFullScreen.classList.add('popup_opened');

    popupFullScreen.addEventListener('click', closePopupByClickOnOverlay);
    document.addEventListener('keydown', closePopupByEscape);
  }
}

