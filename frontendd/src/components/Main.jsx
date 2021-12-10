import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
  loggedIn,
  logout,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  onCardDelete,
  onCardClick,
  cards,
  onCardLike,
}) {
  //Подписка на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        link="/sign-in"
        onClick={logout}
        headerText={"Выйти"}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__group">
            <img
              className="profile__avatar"
              alt="аватар"
              src={`${currentUser.avatar}`}
              onClick={isEditAvatarPopupOpen}
            />
            <div className="profile__avatar-pencil"> </div>
          </div>
          <div className="profile__info">
            <h1 className="profile__title"> {currentUser.name} </h1>
            <button
              onClick={isEditProfilePopupOpen}
              type="button"
              className="profile__edit-button"
            ></button>
            <p className="profile__subtitle"> {currentUser.about} </p>
          </div>
          <button
            onClick={isAddPlacePopupOpen}
            type="button"
            className="profile__add-button"
          ></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
