import React from "react";
import loginSuccess from '../images/button-success.svg';
import loginFailed from '../images/button-failed.svg';

function InfoTooltip({ isOpen, onClose, isRegSuccess, regFailed, regSuccess }) {
  return(
    <>
      <div className={`popup ${isOpen && 'popup_is-opened'}`}>
        <div className="popup__container popup__reg-modal">
          <button type="button"
                  className="popup__close-button"
                  onClick={onClose}
          />
          <img className="popup__image-reg-modal"
               src={`${isRegSuccess ? loginSuccess : loginFailed}`}
               alt="Изображение статуса регистрации"
          />
          <p className="popup__reg-modal-text">
            {`${isRegSuccess ? regSuccess : regFailed}`}
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;