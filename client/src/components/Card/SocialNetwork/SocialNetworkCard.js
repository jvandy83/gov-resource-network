import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Loading } from '../../../components';

import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

import EditIcon from '@material-ui/icons/Edit';

export default (props) => {
  const [socialData, setSocialData] = useState({});
  const [showSocial, setShowSocial] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${user.sub}`).then((res) => {
      if (res.status !== 200) {
        const err = `An error occurred while trying to fetch social network data.`;
        props.setState((prev) => ({
          ...prev,
          error: err
        }));
      }
      setSocialData((prev) => ({
        ...prev,
        data: res.data
      }));
      setShowSocial(true);
    });
  }, []);

  if (!showSocial) {
    return <Loading />;
  }

  console.log(props.profileData.profile.card.socialNetwork);

  const createSocialNetworksProfile = () => {
    const socialNetworks = props.profileData.profile.card.socialNetwork;
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
