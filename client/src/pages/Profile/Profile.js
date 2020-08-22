import React, { useEffect, useState } from 'react';
// hooks
import { validate } from '../../hooks';
import { useForm } from '../../hooks';
import { useAuth0 } from '@auth0/auth0-react';
// components
import { GovResourceForm } from '../../components';
import { PreviousExpForm } from '../../components';
import { EducationForm } from '../../components';
import { SocialNetworkForm } from '../../components';
import { GovResourceCard } from '../../components';
// styles
import './Profile.css';
import { styles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EditIcon from '@material-ui/icons/Edit';

// helpers
import { getTime } from '../../util/getTime';

// ajax helper
import axios from 'axios';

// const CustomIcon = style(EditIcon)({
//   background:
// })

const Profile = ({ user }) => {
  const INITIAL_FORM_STATE = {
    showGovResForm: false,
    showEduForm: false,
    showSocialForm: false,
    showPrevExpForm: false
  };
  const [formState, setFormState] = useState({});
  const [forms, setShowForm] = useState(INITIAL_FORM_STATE);

  const showForm = (form) => {
    setShowForm((prev) => ({
      ...prev,
      [form]: !prev[form]
    }));
  };

  const hideForm = (form) => {
    setShowForm((prev) => ({
      ...prev,
      [form]: !prev[form]
    }));
  };

  useEffect(() => {
    console.log('inside useEffect');
    axios
      .get(`http://localhost:5000/api/profile/${user.sub}`)
      .then((response) => {
        setFormState((prev) => ({
          ...prev,
          ...response.data.profile
        }));
      })
      .catch((err) => console.log(err.message));
  }, [user.sub, setFormState]);

  const createProfile = (data) => {
    axios
      .put(
        'http://localhost:5000/api/profile',
        {
          data: { ...data, user_id: user.sub }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Creating a user profile failed!');
        }
      })
      .then((response) => {
        console.log('User profile created!');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="profile-root">
      <div className="header">
        <div>
          <img
            className="header-pic"
            src={user.picture}
            alt="profile-picture"
          />
        </div>
        <div className="header-greeting__container">
          <p className="header-greeting">
            {getTime()}, {user.given_name}!
          </p>
        </div>
      </div>
      <div className="forms-container">
        {!forms.showGovResForm ? (
          <div className="form profile-display">
            <GovResourceCard
              formState={formState}
              setFormState={setFormState}
            />
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => showForm('showGovResForm')}
              >
                <EditIcon id="edit-icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="form">
            <div>
              <GovResourceForm createProfile={createProfile} />
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => hideForm('showGovResForm')}
              >
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="forms-container">
        {!forms.showEduForm ? (
          <div className="form profile-display">
            <div>
              <h2>Show Education Form</h2>
              <p>Display user info</p>
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => showForm('showEduForm')}
              >
                <EditIcon id="edit-icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="form">
            <div>
              <EducationForm createProfile={createProfile} />
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => hideForm('showEduForm')}
              >
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="forms-container">
        {!forms.showSocialForm ? (
          <div className="form profile-display">
            <div>
              <h2>Show Social Network Form</h2>
              <p>Display user info</p>
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => showForm('showSocialForm')}
              >
                <EditIcon id="edit-icon" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="form">
              <SocialNetworkForm createProfile={createProfile} />
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => hideForm('showSocialForm')}
              >
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="forms-container">
        {!forms.showPrevExpForm ? (
          <div className="form profile-display">
            <div>
              <h2>Show Prev Exp Form</h2>
              <p>Display user info</p>
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => showForm('showPrevExpForm')}
              >
                <EditIcon id="edit-icon" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="form">
              <PreviousExpForm createProfile={createProfile} />
            </div>
            <div className="access-form__button">
              <button
                className="edit-button"
                onClick={() => hideForm('showPrevExpForm')}
              >
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
