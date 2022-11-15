const ImagePopup = (props) => {

  const { card, onClose } = props;
  const className = Object.keys(card).length === 0 ? 'popup popup_type_img' : 'popup popup_type_img popup_open';

  return (
    <div className={className} onClick={onClose}>
      <div className="popup__img-container">
        <button className="popup__close-btn" type="button"></button>
        <img src={card.link} alt={card.name} className="popup__zoom-img" />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
