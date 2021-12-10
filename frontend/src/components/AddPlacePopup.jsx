import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, submitText }) {
  //Стейты для имени и ссылки на картинку
  const [cardName, setCardName] = useState('')
  const [cardLink, setCardLink] = useState('')

  //Обработчик установки названия места
  function handleCardName(e) {
    setCardName(e.target.value)
  }

  //Обработчик установки картинки (ссылки на картинку)
  function handleCardLink(e) {
    setCardLink(e.target.value)
  }

  //Обработчик сабмита формы поп-апа добавления карточки
  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: cardName,
      link: cardLink,
    })
  }

  useEffect(() => {
    setCardLink('')
    setCardName('')
  }, [isOpen])

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Новое место"
      name="add-element"
      buttonName="Создать"
      onSubmit={handleSubmit}
      submitText={submitText}
    >
      <input
        type="text"
        name="name"
        id="names"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        className="popup__item popup__item_form_names"
        onChange={handleCardName}
        value={cardName ? cardName : ''}
      />
      <span className="names-error popup__input-error "> </span>
      <input
        type="url"
        name="link"
        id="url"
        placeholder="Ссылка на картинку"
        required
        className="popup__item popup__item_form_url"
        onChange={handleCardLink}
        value={cardLink ? cardLink : ''}
      />
      <span className="url-error popup__input-error"> </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
