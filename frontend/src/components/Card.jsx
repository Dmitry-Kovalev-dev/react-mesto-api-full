import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const { card, handleCardClick, onCardLike, onCardTrash } = props;

  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    handleCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleTrashClick = () => {
    onCardTrash(card);
  }

  const isOwn = card.owner/*._id*/ === currentUser._id;
  const trashBtnClassName = (`post__trash-btn ${isOwn ? '' : 'post__trash-btn_hidden'}`);

  const isLiked = card.likes.some(owner => owner/*._id*/ === currentUser._id);
  const likeBtnClassName = `post__like-btn ${isLiked ? 'post__like-btn_active' : ''}`;

  return (
    <article className="post">
      <img src={card.link} alt={card.name} className="post__img" onClick={handleClick} />
      <button className={trashBtnClassName} type="button" onClick={handleTrashClick}></button>
      <div className="post__info">
        <h2 className="post__title">{card.name}</h2>
        <div className="post__like">
          <button className={likeBtnClassName} type="button" onClick={handleLikeClick}></button>
          <p className="post__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;