import React, { useState, useContext, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'
function EditProfilePopup({ isOpen, onClose, onUpdateUser, submitText }) {
  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext)

  //Cтейты имени и описания профиля
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  //Функция для изменения имени через поле ввода
  function handleUserName(event) {
    setName(event.target.value)
  }

  //Функция для изменения описания профиля через поле ввода
  function handleUserDescription(event) {
    setDescription(event.target.value)
  }

  //Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault()

    //Передача значений управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit-element"
      onSubmit={handleSubmit}
      submitText={submitText}
    >
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        className="popup__item popup__item_form_name"
        onChange={handleUserName}
        value={name ? name : ''}
      />
      <span className="name-error popup__input-error "> </span>
      <input
        type="text"
        name="job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        className="popup__item popup__item_form_job"
        onChange={handleUserDescription}
        value={description ? description : ''}
      />
      <span className="job-error popup__input-error "> </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
