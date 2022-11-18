import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = (props) => {
  const {isOpen, onClose, cardDelete, /*btnValue*/isLoading} = props;

  const handleDeleteCardSubmit = (evt) => {
    evt.preventDefault();
    cardDelete();
  }

  return (
    <PopupWithForm
      title={'Вы уверены?'}
      name={'del'}
      btnValue={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      popupContainerSelector={'popup__container_type_del'}
      onClose={onClose}
      popupTitleSelector={'popup__title_type_del'}
      onSubmit={handleDeleteCardSubmit}
    />
  );
}

export default DeleteCardPopup;