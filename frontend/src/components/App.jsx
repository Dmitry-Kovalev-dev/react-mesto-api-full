
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { authorization, register, checkToken, signOut } from '../utils/mestoAuth';
import api from './../utils/Api';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

const App = () => {

  const [cards, setCards] = useState([]); // стейт постов с сервера
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); // стейт состояния попапа Редактировать профиль
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false); // стейт состояния попапа Добавить пост
  const [isEditAvatatPopupOpen, setEditAvatarPopupOpen] = useState(false); // стейт состояния попапа Редактировать аватар
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false) // стейт состояния попапа Удалить пост
  const [selectedCard, setSelectedCard] = useState({}); // стейт поста для zoom-popup
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({}); // стейт поста для удаления 
  const [currentUser, setCurrentUser] = useState({}); // стейт текущего юзера
  const [isLoading, setIsLoading] = useState(false); // стейт загрузки
  const [loggedIn, setLoggedIn] = useState(false); //стейт входа в аккаунт
  const [activeUser, setActiveUser] = useState(''); //стейт email-а вошедшего пользователя
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false); // стейт открыти информационного попапа
  const [isRegister, setIsRegister] = useState(true); //стейт успешной регистрации
  const [message, setMessage] = useState(''); //стейт сообщения информационного попапа
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCard(), api.getProfileInfo()])
        .then(([cardsData, userData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, [loggedIn]);

/**    Submit button controllers    */

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.setLikeStatus(card._id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = () => {
    setIsLoading(true);
    api.deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== selectedDeleteCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api.editProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api.editAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlace = ({ name, link }) => {
    setIsLoading(true);
    api.createCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

 /**    Popup controllers   */

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardTrashClick = (card) => {
    setDeleteCardPopupOpen(true);
    setSelectedDeleteCard(card);
  };

  const handleClickClosePopup = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closeAllPopups();
    }
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltipPopupOpen(false)
    setTimeout(setSelectedCard({}), 300);
  };

  /**   Register and Auth   */

  const handleLogin = (password, email) => {
    authorization(password, email)
      .then((res) => {
        setActiveUser(res.email)
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        err.then(data => {
          setMessage(data.message);
        })
        setInfoTooltipPopupOpen(true);
        setIsRegister(false);
      });
  };

  const handleRegister = (password, email) => {
    register(password, email)
      .then(() => {
        handleLogin(password, email);
        setIsRegister(true);
        setMessage('Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        err.then(data => {
          setMessage(data.message);
        })
        setIsRegister(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      })
  };

  const tokenCheck = () => {
    checkToken()
      .then((res) => {
        setLoggedIn(true);
        setActiveUser(res.email);
        history.push('/');
      })
      .catch((err) => {
        setLoggedIn(false)
        err.then((res) => {
          console.log(res.message);
        });
      });
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    signOut()
      .then((res) => {
        history.push('/signin');
        setLoggedIn(false);
        setActiveUser('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        activeUser={activeUser}
        onLogout={handleLogout}
      />

      <Switch>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <ProtectedRoute
          path="/"
          loggedIn={loggedIn} >
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardTrash={handleCardTrashClick}
          />
        </ProtectedRoute>
      </Switch>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleClickClosePopup}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleClickClosePopup}
        onAddPlace={handleAddPlace}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatatPopupOpen}
        onClose={handleClickClosePopup}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={handleClickClosePopup}
        cardDelete={handleDeleteCard}
        isLoading={isLoading}
      />

      <ImagePopup
        card={selectedCard}
        onClose={handleClickClosePopup}
      />

      <InfoTooltip
        isRegister={isRegister}
        onClose={handleClickClosePopup}
        isOpen={isInfoTooltipPopupOpen}
        message={message}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
