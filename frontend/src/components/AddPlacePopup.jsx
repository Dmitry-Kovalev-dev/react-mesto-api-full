import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm"

const AddPlacePopup = (props) => {
  const { isOpen, onClose, onAddPlace, btnValue } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const card = {
    name: name,
    link: link
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(card);
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'add'}
      btnValue={btnValue}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <fieldset className="popup__form-inputs">
        <label className="popup__formfield">
          <input id="place-input" type="text" className="popup__input popup__input_type_place" name="name"
            placeholder="Название" minLength="2" maxLength="30" required value={name} onChange={handleChangeName} />
          <span className="popup__input-error place-input-error"></span>
        </label>
        <label className="popup__formfield">
          <input id="url-input" type="url" className="popup__input popup__input_type_link" name="link"
            placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink}/>
          <span className="popup__input-error url-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;