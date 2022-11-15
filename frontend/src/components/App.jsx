
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

  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatatPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [addPlaceBtnValue, setAddPlaceBtnValue] = useState('Создать');
  const [editProfileBtnValue, setEditProfileBtnValue] = useState('Сохранить');
  const [editAvatarBtnValue, setEditAvatarBtnValue] = useState('Сохранить');
  const [deleteCardBtnValue, setDeleteCardBtnValue] = useState('Да');
  const [loggedIn, setLoggedIn] = useState(false); //стейт входа в аккаунт

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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.setLikeStatus(card._id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = () => {
    setDeleteCardBtnValue('Удаление...')
    api.deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== selectedDeleteCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeleteCardBtnValue('Да');
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setEditProfileBtnValue('Сохранение...');
    api.editProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setEditProfileBtnValue('Сохранить')
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setEditAvatarBtnValue('Сохранение...')
    api.editAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setEditAvatarBtnValue('Сохранить');
      });
  };

  const handleAddPlace = ({ name, link }) => {
    setAddPlaceBtnValue('Сохранение...');
    api.createCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddPlaceBtnValue('Создать');
      });
  };

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
    setSelectedCard({});
  };

  /**         12th SPRINT             */
  const [activeUser, setActiveUser] = useState(''); //стейт email-а вошедшего пользователя
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false); // стейт открыти информационного попапа
  const [isRegister, setIsRegister] = useState(true); //стейт успешной регистрации
  const [message, setMessage] = useState(''); //стейт сообщения информационного попапа
  const history = useHistory();
  
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
        btnValue={editProfileBtnValue}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleClickClosePopup}
        onAddPlace={handleAddPlace}
        btnValue={addPlaceBtnValue}
      />

      <EditAvatarPopup
        isOpen={isEditAvatatPopupOpen}
        onClose={handleClickClosePopup}
        onUpdateAvatar={handleUpdateAvatar}
        btnValue={editAvatarBtnValue}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={handleClickClosePopup}
        cardDelete={handleDeleteCard}
        btnValue={deleteCardBtnValue}
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