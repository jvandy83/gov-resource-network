import React, { useState, useEffect } from 'react';

import {
  Loading,
  ErrorHandler,
  AccomplishmentsCard,
  ExperienceCard,
  EducationCard,
  SocialNetworkCard,
  IntroCard,
  AboutMeCard,
  EditIntroForm,
  EditAboutMeForm,
  EditExperienceForm,
  EditEducationForm,
  EditSocialNetworkForm,
  EditAccomplishmentsForm
} from '../../components';

import { useAuth0 } from '@auth0/auth0-react';

// styles
import './Profile.css';

// 3rd party
import axios from 'axios';

const INITIAL_STATE = {
  isEditing: false,
  showCard: false,
  editPost: null,
  editLoading: false,
  error: null
};

const EDIT_MODE = {
  editIntro: false,
  editSocial: false,
  editAccomp: false,
  editExp: false,
  editAboutMe: false,
  editEdu: false,
  editContact: false
};

const Profile = () => {
  const { user } = useAuth0();

  const [state, setState] = useState(INITIAL_STATE);

  const [editMode, setEditMode] = useState(EDIT_MODE);

  const [profileData, setProfileData] = useState({});

  const [error, setError] = useState(null);

  const onEditHandler = (mode) => {
    setState((prev) => ({
      ...prev,
      isEditing: true
    }));
    setEditMode((prev) => ({
      ...prev,
      [mode]: true
    }));
  };

  const cancelEditHandler = (mode) => {
    setState((prev) => ({ ...prev, isEditing: false, editPost: null }));
    setEditMode((prev) => ({
      ...prev,
      [mode]: false
    }));
  };

  const catchError = (err) => {
    setState((prev) => ({
      ...prev,
      error: err
    }));
  };

  const errorHandler = () => {
    setState({ error: null });
  };

  // Since createProfile is used in more than one
  // card, place function inside profile page to
  // reduce repitition
  const createProfile = async (values) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/profile`, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: { ...values, auth_0_user: user.sub }
      });
      if (res.status !== 200 && res.status !== 201) {
        const err = new Error(
          'There was an error that occurred while trying to create or update a profile.'
        );
      }
    } catch (err) {
      catchError(err);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile/${user.sub}`)
      .then((res) => {
        if (res.status !== 200) {
          const err = new Error(
            'An error occured while trying to fetch a profile.'
          );
          setState((prev) => ({
            ...prev,
            error: err
          }));
        }
        const profile = res.data;
        setProfileData((prev) => ({
          ...prev,
          profile
        }));
        setState((prev) => ({
          ...prev,
          showCard: true
        }));
      })
      .catch(catchError);
  }, []);

  if (!state.showCard) {
    return <Loading />;
  }

  return (
    <>
      <ErrorHandler error={error} onHandle={errorHandler} />
      <div className="profile-root">
        <div className="profile-container">
          <div className="forms-container" id="intro-container">
            <div className="header"></div>
            <div className="profile-display" id="intro-display">
              <div className="access-profile__display">
                <img className="header-pic" src={user.picture} alt="profile" />
              </div>
              <div>
                {editMode.editIntro && (
                  <EditIntroForm
                    createProfile={() => createProfile}
                    onCancelModal={cancelEditHandler}
                    mode="editIntro"
                  />
                )}
                <div>
                  <IntroCard
                    title="Intro"
                    mode="editIntro"
                    profileData={profileData}
                    onEditHandler={onEditHandler}
                    onCancelModal={cancelEditHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="forms-container">
            <div className="form profile-display">
              {editMode.editAboutMe && (
                <EditAboutMeForm
                  createProfile={createProfile}
                  onCancelModal={cancelEditHandler}
                  mode="editAboutMe"
                />
              )}
              <div>
                <AboutMeCard
                  title="About Me"
                  mode="editAboutMe"
                  profileData={profileData}
                  onEditHandler={onEditHandler}
                  error={error}
                  errorHandler={errorHandler}
                />
              </div>
            </div>
          </div>
          <div className="forms-container" id="experience">
            <div className="form profile-display">
              {editMode.editExp && (
                <EditExperienceForm
                  onCancelModal={cancelEditHandler}
                  mode="editExp"
                />
              )}
              <ExperienceCard
                title="Experience"
                mode="editExp"
                onEditHandler={onEditHandler}
                catchError={catchError}
                errorHandler={errorHandler}
              />
            </div>
          </div>
          <div className="forms-container" id="education">
            <div className="form profile-display">
              {editMode.editEdu && (
                <EditEducationForm
                  onCancelModal={cancelEditHandler}
                  mode="editEdu"
                />
              )}
              <EducationCard
                title="Education"
                mode="editEdu"
                onEditHandler={onEditHandler}
                error={error}
                errorHandler={errorHandler}
              />
            </div>
          </div>
          <div className="forms-container">
            <div className="form profile-display">
              {editMode.editSocial && (
                <EditSocialNetworkForm
                  createProfile={createProfile}
                  onCancelModal={cancelEditHandler}
                  mode="editSocial"
                />
              )}
              <SocialNetworkCard
                title="Social Network"
                mode="editSocial"
                onEditHandler={onEditHandler}
                profileData={profileData}
              />
            </div>
          </div>
          <div className="forms-container">
            <div className="form profile-display">
              {editMode.editAccomp && (
                <EditAccomplishmentsForm
                  onCancelModal={cancelEditHandler}
                  mode="editAccomp"
                />
              )}
              <AccomplishmentsCard
                title="Accomplishments"
                mode="editAccomp"
                onEditHandler={onEditHandler}
                error={error}
                errorHandler={errorHandler}
              />
            </div>
          </div>
        </div>
        <div className="aside">
          <div className="aside-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              repellat sapiente nam, perferendis esse aut cumque magni
              voluptates ducimus? Debitis corrupti vitae assumenda distinctio
              corporis tempora consectetur deserunt autem ab ipsam iure
              cupiditate, vel totam amet molestias nesciunt ducimus quisquam
              quam veniam at quo aperiam laboriosam? Iure autem reprehenderit id
              nam cumque neque, obcaecati aspernatur. Odio cumque commodi sit
              rerum facere perspiciatis ex culpa, hic illum nemo alias molestiae
              provident asperiores fugit nesciunt optio temporibus doloribus
              soluta aspernatur. Fugiat eligendi molestiae id quos, repellendus
              enim dicta! Vel reiciendis, quo, consequatur cum voluptas porro
              beatae aperiam hic ducimus odit voluptatum accusantium placeat non
              sed itaque voluptate mollitia quas molestias accusamus. Sed,
              itaque minima nulla amet aspernatur ratione beatae aut ipsam nobis
              velit eveniet vitae facere eaque autem a quibusdam! Odit officia
              minus non distinctio ullam vitae! Vitae qui, voluptate
              voluptatibus facere eius, fugiat assumenda omnis tenetur suscipit
              eaque fugit libero sequi! Vitae quasi nobis esse quisquam minima?
              Illo dolorum est, atque voluptatibus quae quia blanditiis amet qui
              beatae expedita a libero asperiores sit incidunt alias ullam magni
              deleniti consequuntur nisi ea aliquid velit laborum eaque. Eum
              dolorum esse accusamus dolorem! Libero facere animi incidunt
              dolores fugit impedit? Minus officiis aperiam quasi!
            </p>
          </div>
          <div className="aside-content">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
              similique nostrum voluptatum natus sint reprehenderit facere
              tempora ut omnis! Distinctio dicta fugiat, doloribus cum magni
              atque quaerat officia ipsa dolor tempore suscipit repellat quasi
              excepturi laudantium, ut qui iure reiciendis cumque nesciunt illo,
              optio nobis minus? Animi error obcaecati distinctio placeat quas
              repellat sunt veniam impedit perferendis! Corrupti eum accusantium
              possimus expedita, rerum repellat rem reiciendis laborum suscipit
              soluta illum vel blanditiis accusamus molestias temporibus sunt
              magni aliquam repudiandae. Architecto, quaerat, tenetur sunt,
              culpa facere perferendis minima libero aspernatur sapiente et qui
              beatae cupiditate natus nesciunt ipsam eos reprehenderit quia?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
