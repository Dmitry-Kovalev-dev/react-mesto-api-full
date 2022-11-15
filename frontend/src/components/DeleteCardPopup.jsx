import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = (props) => {
  const {isOpen, onClose, cardDelete, btnValue} = props;

  const handleDeleteCardSubmit = (evt) => {
    evt.preventDefault();
    cardDelete();
  }

  return (
    <PopupWithForm
      title={'Вы уверены?'}
      name={'del'}
      btnValue={btnValue}
      isOpen={isOpen}
      popupContainerSelector={'popup__container_type_del'}
      onClose={onClose}
      popupTitleSelector={'popup__title_type_del'}
      onSubmit={handleDeleteCardSubmit}
    />
  );
}

export default DeleteCardPopup;