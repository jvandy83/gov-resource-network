import React, { useState, useEffect } from 'react';

import { ProfileCard, Loading, ErrorHandler } from '../../components';

import { useAuth0 } from '@auth0/auth0-react';

// styles
import './Profile.css';

// 3rd party
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth0();

  const [profileCards, setProfileCards] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const introUrl = {
      url: `http://localhost:5000/api/profile/${user.sub}`,
      name: 'intro'
    };
    const accompUrl = {
      url: `http://localhost:5000/api/accomplishments/${user.sub}`,
      name: 'accomplishments'
    };
    const eduUrl = {
      url: `http://localhost:5000/api/education/${user.sub}`,
      name: 'education'
    };
    const expUrl = {
      url: `http://localhost:5000/api/experience/${user.sub}`,
      name: 'experience'
    };

    const urlArray = [introUrl, accompUrl, eduUrl, expUrl];

    const fetchedData = Promise.all(
      urlArray.map((request) => {
        return axios
          .get(request.url)
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              const fetchError = new Error(
                `An error occured while fetching: ${res.name}`
              );
              catchError(fetchError);
            }
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
    fetchedData.then((data) => {
      setProfileCards((prev) => {
        return [...prev, ...data];
      });
    });
  }, [user.sub]);

  const errorHandler = () => {
    setError({ error: null });
  };

  const catchError = (error) => {
    setError({ error });
  };

  if (Object.keys(profileCards).length === 4) {
    const introResult = profileCards.find((p) => p.card.intro);
    const expResult = profileCards.find((p) => p.card.experience);
    const eduResult = profileCards.find((p) => p.card.education);
    const accompResult = profileCards.find((p) => p.card.accomplishments);
    const { intro } = introResult.card;
    const { experience } = expResult.card;
    const { education } = eduResult.card;
    const { accomplishments } = accompResult.card;
    console.log('intro', intro);
    console.log('experience', experience);
    console.log('education', education);
    console.log('accomplishments', accomplishments);
    return (
      <>
        <ErrorHandler error={error} onHandle={errorHandler} />
        <div className="profile-root">
          <div className="profile-container">
            <div className="forms-container" id="intro-container">
              <div className="header"></div>
              <div className="profile-display" id="intro-display">
                <div className="access-profile__display">
                  <img
                    className="header-pic"
                    src={user.picture}
                    alt="profile"
                  />
                </div>
                <div>
                  <ProfileCard
                    title={`${intro.firstName} ${intro.lastName}`}
                    description={intro.currentPosition}
                    subItem={`${intro.location.city}, ${intro.location.state}, ${intro.location.country}`}
                    cardType="intro"
                  />
                </div>
              </div>
            </div>
            {/* <div className="forms-container">
              <div className="form profile-display">
                <ProfileCard
                  toggleForm={toggleForm}
                  card={experience}
                  title="Experience"
                  cardType="exp"
                />
              </div>
            </div> */}
            <div className="forms-container" id="education">
              <div className="form profile-display">
                <ProfileCard
                  card={education}
                  title="Education"
                  cardType="edu"
                />
              </div>
            </div>
            <div className="forms-container" id="experience">
              <div className="form profile-display">
                <ProfileCard
                  card={experience}
                  title="Experience"
                  cardType="exp"
                />
              </div>
            </div>
            <div className="forms-container">
              <div className="form profile-display">
                <ProfileCard
                  // social network info is in introResponse
                  title="Social Network"
                />
              </div>
            </div>
            <div className="forms-container">
              <div className="form profile-display">
                <ProfileCard />
              </div>
            </div>
            <div className="forms-container">
              <div className="form profile-display">
                <ProfileCard
                // contact info is in introResponse
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
                quam veniam at quo aperiam laboriosam? Iure autem reprehenderit
                id nam cumque neque, obcaecati aspernatur. Odio cumque commodi
                sit rerum facere perspiciatis ex culpa, hic illum nemo alias
                molestiae provident asperiores fugit nesciunt optio temporibus
                doloribus soluta aspernatur. Fugiat eligendi molestiae id quos,
                repellendus enim dicta! Vel reiciendis, quo, consequatur cum
                voluptas porro beatae aperiam hic ducimus odit voluptatum
                accusantium placeat non sed itaque voluptate mollitia quas
                molestias accusamus. Sed, itaque minima nulla amet aspernatur
                ratione beatae aut ipsam nobis velit eveniet vitae facere eaque
                autem a quibusdam! Odit officia minus non distinctio ullam
                vitae! Vitae qui, voluptate voluptatibus facere eius, fugiat
                assumenda omnis tenetur suscipit eaque fugit libero sequi! Vitae
                quasi nobis esse quisquam minima? Illo dolorum est, atque
                voluptatibus quae quia blanditiis amet qui beatae expedita a
                libero asperiores sit incidunt alias ullam magni deleniti
                consequuntur nisi ea aliquid velit laborum eaque. Eum dolorum
                esse accusamus dolorem! Libero facere animi incidunt dolores
                fugit impedit? Minus officiis aperiam quasi!
              </p>
            </div>
            <div className="aside-content">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                similique nostrum voluptatum natus sint reprehenderit facere
                tempora ut omnis! Distinctio dicta fugiat, doloribus cum magni
                atque quaerat officia ipsa dolor tempore suscipit repellat quasi
                excepturi laudantium, ut qui iure reiciendis cumque nesciunt
                illo, optio nobis minus? Animi error obcaecati distinctio
                placeat quas repellat sunt veniam impedit perferendis! Corrupti
                eum accusantium possimus expedita, rerum repellat rem reiciendis
                laborum suscipit soluta illum vel blanditiis accusamus molestias
                temporibus sunt magni aliquam repudiandae. Architecto, quaerat,
                tenetur sunt, culpa facere perferendis minima libero aspernatur
                sapiente et qui beatae cupiditate natus nesciunt ipsam eos
                reprehenderit quia?
              </p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default Profile;
