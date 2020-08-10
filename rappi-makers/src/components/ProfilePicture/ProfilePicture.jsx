import React, { useState } from 'react';
import Button from '../Button/Button';
import UploadImage from '../UploadImage/UploadImage';
import { Link } from 'react-router-dom';
import './ProfilePicture.css';

const ProfilePicture = ({ login, profileId, photo }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const onClose = () => setOpen(false);
  const editURL = login === 'user' ? 'editUser' : 'editRestaurant';
  return (
    <div className="picture-container">
      <img src={photo} alt="" />
      <div className="profile-actions">
        <Button text="Editar imagen" type="button" className="profile-btn" handleClick={handleClick} />
        <Link to={`/${editURL}/${profileId}`}>Editar perfil</Link>
      </div>
      <UploadImage open={open} onClose={onClose} />
    </div>
  );
};

export default ProfilePicture;
