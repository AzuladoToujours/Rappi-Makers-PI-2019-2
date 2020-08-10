import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { UserAuthContext } from '../../providers/AuthProvider';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import { getUserById } from '../../endpoints/UserEndpoints';
import { getRestaurantById } from '../../endpoints/RestaurantEndpoints';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const { login } = useContext(UserAuthContext);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const endpoint = login === 'user' ? `${getUserById}/${id}` : `${getRestaurantById}/${id}`;
    const response = await axios.get(endpoint);
    setProfile(response.data);
    setLoading(false);
  }, [id, login]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="profile-container">
      {loading ? (
        <div className="spinner-container">
          {' '}
          <Spinner />
        </div>
      ) : (
        <ProfileDetails profile={profile} login={login} />
      )}
    </div>
  );
};

export default Profile;
