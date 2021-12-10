import React from 'react'

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_cards ${card && 'popup_is-opened'}`}>
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__close-button popup__close-image"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ''}
          alt={card ? card.name : ''}
          className="popup__image"
        />
        <h2 className="popup__text"> {card ? card.name : ''} </h2>
      </div>
    </div>
  )
}
export default ImagePopup
