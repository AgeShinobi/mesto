// Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClickOnOverlay);
  document.removeEventListener('keydown', closePopupByEscape);
}

// Закрытие попапа при нажатии за пределами окна
export const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    closePopup(event.currentTarget);
  }
}

//Закрытие попапа при нажатии на Escape
export const closePopupByEscape = (event) => {
  if (event.key !== 'Escape') {
    return;
  } else {
    const popupIsOpened = document.querySelector('.popup_opened');
    closePopup(popupIsOpened);
  }
}
