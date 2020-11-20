import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Loading } from '../../../components';

import axios from 'axios';

import EditIcon from '@material-ui/icons/Edit';

const SocialNetworkCard = (props) => {
  // const [socialData, setSocialData] = useState({});
  const [showSocial, setShowSocial] = useState(false);

  const { user, profileData } = props;

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/api/profile/${user}`).then((res) => {
  //     if (res.status !== 200) {
  //       const err = `An error occurred while trying to fetch social network data.`;
  //       console.error(err);
  //     }
  //     setSocialData((prev) => ({
  //       ...prev,
  //       data: res.data
  //     }));
  //     setShowSocial(true);
  //   });
  // }, [user]);

  if (!showSocial) {
    return <Loading />;
  }

  const createSocialNetworksProfile = () => {
    const socialNetworks = profileData.profile.card.socialNetwork;
    const { instagram, linkedin, twitter } = socialNetworks;
    return (
      <>
        <div className="card__element">
          <span style={{ fontWeight: 500 }}>LinkedIn: </span>
          {linkedin ? <Link to={linkedin}>{linkedin}</Link> : 'N/A'}
        </div>
        <div className="card__element">
          <span style={{ fontWeight: 500 }}>Instagram: </span>
          {instagram ? <Link to={instagram}>{instagram}</Link> : 'N/A'}
        </div>
        <div className="card__element">
          <span style={{ fontWeight: 500 }}>Twitter: </span>
          {twitter ? <Link to={twitter}>{twitter}</Link> : 'N/A'}
        </div>
      </>
    );
  };

  return (
    <div className="card-item__container">
      <div>
        <h3 className="card-item__title">{props.title}</h3>
        {createSocialNetworksProfile()}
      </div>
      <div>
        <EditIcon
          id="edit-icon"
          onClick={() => props.onEditHandler('editSocial')}
        />
      </div>
    </div>
  );
};

export default SocialNetworkCard;
