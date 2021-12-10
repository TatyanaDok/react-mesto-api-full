import React, { useState, useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePlacePopup from "./ConfirmDeletePlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  withRouter,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Error from "./Error";
function App() {
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [cardIdForDelete, setCardIdForDelete] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    api
      .getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.reverse());
      })
      .catch((err) => console.log(`Ошибка при получении данных: ${err}`));
  }, [loggedIn]);

  function checkToken() {
    auth
      .getUser()
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          setLoggedIn(false);
          setCurrentUser({});
          history.push("/signin");
        } else {
          setIsAuth(true);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
    window.addEventListener("keydown", handleClosePopupWithEsc);
    window.addEventListener("click", handleClosePopupWithOverlayClick);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
    window.addEventListener("keydown", handleClosePopupWithEsc);
    window.addEventListener("click", handleClosePopupWithOverlayClick);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    window.addEventListener("keydown", handleClosePopupWithEsc);
    window.addEventListener("click", handleClosePopupWithOverlayClick);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    window.addEventListener("keydown", handleClosePopupWithEsc);
    window.addEventListener("click", handleClosePopupWithOverlayClick);
  }

  function handleDeleteCardClick(e) {
    setIsConfirmDeletePopupOpen(true);
    setCardIdForDelete(e._id);
    window.addEventListener("keydown", handleClosePopupWithEsc);
    window.addEventListener("click", handleClosePopupWithOverlayClick);
  }

  function openRegModal() {
    setIsTooltipOpened(true);
    window.addEventListener("click", handleClosePopupWithOverlayClick);
  }

  function handleClosePopupWithEsc(event) {
    if (event.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleClosePopupWithOverlayClick(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsTooltipOpened(false);
    setSelectedCard(null);
    window.removeEventListener("keydown", handleClosePopupWithEsc);
    window.removeEventListener("click", handleClosePopupWithOverlayClick);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

        setCards(newCards);
      })
      .catch((err) =>
        console.log(`Ошибка при попытке поставить/снять лайк: ${err}`)
      );
  }

  function handleDeleteClick(cardId) {
    setIsLoading(true);
    api
      .deleteCardFromServer(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .updateProfile(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))

      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .updateAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        setIsAuth(true);

        history.push("/sign-in");
      })

      .catch((err) => {
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((user) => {
        setCurrentUser(user);
        setIsAuth(true);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
      });
  }
  const handleLogout = () => {
    auth
      .signout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="root">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              logout={handleLogout}
              isEditAvatarPopupOpen={handleEditAvatarClick}
              isEditProfilePopupOpen={handleEditProfileClick}
              isAddPlacePopupOpen={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleDeleteCardClick}
            />

            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="*">
              <Redirect to="/" />
              <Error />
            </Route>
          </Switch>
          <Footer />
          <PopupWithForm />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            submitText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            submitText={isLoading ? "Сохранение..." : "Создать"}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            submitText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ConfirmDeletePlacePopup
            isOpen={isConfirmDeletePopupOpen}
            onDeleteCard={handleDeleteClick}
            cardId={cardIdForDelete}
            onClose={closeAllPopups}
            submitText={isLoading ? "Удаляем..." : "Да"}
          />
          <InfoTooltip
            isOpen={isTooltipOpened}
            onClose={closeAllPopups}
            isRegSuccess={isAuth}
            regSuccess="Вы успешно зарегестрировались!"
            regFailed="Что-то пошло не так! Попробуйте еще раз."
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
