import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : ""
  }`;

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;
  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <button
        type="button"
        id="delete"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteCard}
      ></button>
      <div className="element__group">
        <h2 className="element__title"> {card.name} </h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleCardLike}
        ></button>
      </div>
      <span className="element__like-counter" id="counter">
        {card.likes.length}
      </span>
    </div>
  );
}
export default Card;
