import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


const EditProfilePopup = (props) => {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const currentUser = useContext(CurrentUserContext);

  const [userName, setName] = useState('');
  const [userDescription, setDescription] = useState('');
  const user = {
    name: userName,
    about: userDescription,
  };

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about)
    }
  }, [currentUser, isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleEditProfileSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(user);
  };

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'edit'}
      btnValue={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditProfileSubmit}
    >
      <fieldset className="popup__form-inputs">
        <label className="popup__formfield">
          <input id="name-input" type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя"
            minLength="2" maxLength="40" onChange={handleChangeName} value={userName} required />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__formfield">
          <input id="job-input" type="text" className="popup__input popup__input_type_job" name="about" placeholder="О себе"
            minLength="2" maxLength="200" onChange={handleChangeDescription} value={userDescription} required />
          <span className="popup__input-error job-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;