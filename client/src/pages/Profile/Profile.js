import React, { useState } from 'react';

import {
  AboutMeCard,
  IntroCard,
  EducationCard,
  SocialNetworkCard,
  ExperienceCard,
  AccomplishmentsCard,
  AccomplishmentsForm,
  ContactCard,
  ModalContext
} from '../../components';

// styles
import './Profile.css';
import { styles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EditIcon from '@material-ui/icons/Edit';

// helpers
import { getTime } from '../../util/getTime';

// 3rd party
import axios from 'axios';

const Profile = ({ forms, setShowForms, showForms, user }) => {
  const [showCardContent, setShowCardContent] = useState(false);

  const toggleForm = (form) => {
    setShowForms((prev) => ({
      ...prev,
      [form]: !prev[form]
    }));
  };

  return (
    <div className="profile-root">
      <div className="profile-container">
        <div className="forms-container" id="intro-container">
          <div className="header"></div>
          <div className="profile-display" id="intro-display">
            <div className="access-profile__display">
              <img
                className="header-pic"
                src={user.picture}
                alt="profile-picture"
              />
              <div className="access-form__button edit">
                <button
                  className="edit-button"
                  onClick={() => toggleForm('showIntroForm')}
                >
                  <EditIcon id="edit-icon" />
                </button>
              </div>
            </div>
            <div>
              <IntroCard
                toggleForm={toggleForm}
                showCardContent={showCardContent}
                setShowCardContent={setShowCardContent}
                user={user}
              />
            </div>
          </div>
        </div>
        <div className="forms-container">
          <div className="form profile-display">
            <AboutMeCard
              toggleForm={toggleForm}
              user={user}
              showCardContent={showCardContent}
              setShowCardContent={setShowCardContent}
            />
          </div>
        </div>
        <div className="forms-container" id="education">
          <div className="form profile-display">
            <EducationCard
              toggleForm={toggleForm}
              user={user}
              showCardContent={showCardContent}
              setShowCardContent={setShowCardContent}
            />
          </div>
        </div>
        <div className="forms-container" id="experience">
          <div className="form profile-display">
            <ExperienceCard
              toggleForm={toggleForm}
              user={user}
              showCardContent={showCardContent}
              setShowCardContent={setShowCardContent}
            />
          </div>
        </div>
        <div className="forms-container">
          <div className="form profile-display">
            <SocialNetworkCard
              toggleForm={toggleForm}
              user={user}
              showCardContent={showCardContent}
              setShowCardContent={setShowCardContent}
            />
          </div>
        </div>
        <div className="forms-container">
          <div className="form profile-display">
            <AccomplishmentsCard
              toggleForm={toggleForm}
              user={user}
              showCardContent={showCardContent}
              setShowCardContent={setShowCardContent}
            />
          </div>
        </div>
        <div className="forms-container">
          <div className="form profile-display">
            <ContactCard
              toggleForm={toggleForm}
              user={user}
              showCardContent={showCardContent}
              setShowCardContent={setShowCardContent}
            />
          </div>
        </div>
      </div>
      <div className="aside">
        <div className="aside-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            repellat sapiente nam, perferendis esse aut cumque magni voluptates
            ducimus? Debitis corrupti vitae assumenda distinctio corporis
            tempora consectetur deserunt autem ab ipsam iure cupiditate, vel
            totam amet molestias nesciunt ducimus quisquam quam veniam at quo
            aperiam laboriosam? Iure autem reprehenderit id nam cumque neque,
            obcaecati aspernatur. Odio cumque commodi sit rerum facere
            perspiciatis ex culpa, hic illum nemo alias molestiae provident
            asperiores fugit nesciunt optio temporibus doloribus soluta
            aspernatur. Fugiat eligendi molestiae id quos, repellendus enim
            dicta! Vel reiciendis, quo, consequatur cum voluptas porro beatae
            aperiam hic ducimus odit voluptatum accusantium placeat non sed
            itaque voluptate mollitia quas molestias accusamus. Sed, itaque
            minima nulla amet aspernatur ratione beatae aut ipsam nobis velit
            eveniet vitae facere eaque autem a quibusdam! Odit officia minus non
            distinctio ullam vitae! Vitae qui, voluptate voluptatibus facere
            eius, fugiat assumenda omnis tenetur suscipit eaque fugit libero
            sequi! Vitae quasi nobis esse quisquam minima? Illo dolorum est,
            atque voluptatibus quae quia blanditiis amet qui beatae expedita a
            libero asperiores sit incidunt alias ullam magni deleniti
            consequuntur nisi ea aliquid velit laborum eaque. Eum dolorum esse
            accusamus dolorem! Libero facere animi incidunt dolores fugit
            impedit? Minus officiis aperiam quasi!
          </p>
        </div>
        <div className="aside-content">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            similique nostrum voluptatum natus sint reprehenderit facere tempora
            ut omnis! Distinctio dicta fugiat, doloribus cum magni atque quaerat
            officia ipsa dolor tempore suscipit repellat quasi excepturi
            laudantium, ut qui iure reiciendis cumque nesciunt illo, optio nobis
            minus? Animi error obcaecati distinctio placeat quas repellat sunt
            veniam impedit perferendis! Corrupti eum accusantium possimus
            expedita, rerum repellat rem reiciendis laborum suscipit soluta
            illum vel blanditiis accusamus molestias temporibus sunt magni
            aliquam repudiandae. Architecto, quaerat, tenetur sunt, culpa facere
            perferendis minima libero aspernatur sapiente et qui beatae
            cupiditate natus nesciunt ipsam eos reprehenderit quia?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
