import React, { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitText }) {
  //Реф для прямого доступа к DOM-элементу инпута и его значению
  const avatarRef = useRef('')

  //Очистка поля ввода ссылки после закрытия
  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  //Обработчик сабмита формы (обновление аватарки)
  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      onSubmit={handleSubmit}
      submitText={submitText}
    >
      <input
        type="url"
        name="link"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
        className="popup__item popup__item_form_avatar"
        ref={avatarRef}
      />
      <span className="avatar-error popup__input-error"> </span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup
