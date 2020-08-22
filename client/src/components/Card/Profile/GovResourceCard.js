import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Divider } from '@material-ui/core';

const GovResourceCard = ({ formState, setFormState }) => {
  const { user } = useAuth0();

  const cardDisplay = () => {
    const { firstName, lastName } = formState;
    return <h2>{`${firstName} ${lastName}`}</h2>;
  };
  return (
    <div>
      {formState.firstName ? (
        cardDisplay()
      ) : (
        <div>
          <h2>Create GRN Profile</h2>
        </div>
      )}
    </div>
  );
};

export default GovResourceCard;
