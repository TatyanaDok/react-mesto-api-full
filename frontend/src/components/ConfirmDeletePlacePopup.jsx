import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function ConfirmDeletePlacePopup({
  onClose,
  isOpen,
  cardId,
  onDeleteCard,
  submitText,
}) {
  function handleSubmit(e) {
    e.preventDefault()

    onDeleteCard(cardId)
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitText={submitText}
    ></PopupWithForm>
  )
}
