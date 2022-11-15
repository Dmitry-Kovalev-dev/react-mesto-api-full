import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const { isOpen, onClose, onUpdateAvatar, btnValue } = props;
  const avatarLink = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarLink.current.value });
  };
  useEffect(() => {
    avatarLink.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'edit-avatar'}
      btnValue={btnValue}
      isOpen={isOpen}
      popupContainerSelector={'popup__container_type_edit-avatar'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-inputs">
        <label className="popup__formfield">
          <input id="url-input-ava" type="url" className="popup__input popup__input_type_link" name="avatar"
            placeholder="Ссылка на картинку" required ref={avatarLink} />
          <span className="popup__input-error url-input-ava-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;