import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = (props) => {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    cards,
    onCardClick,
    onCardLike,
    onCardTrash
  } = props;

  const currentUser = useContext(CurrentUserContext)


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <div className="profile__avatar-overlay"></div>
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
      </section>

      <section className='photo-feed'>
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              handleCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardTrash={onCardTrash}
            />
          );
        })}
      </section>

    </main>
  );
}

export default Main;