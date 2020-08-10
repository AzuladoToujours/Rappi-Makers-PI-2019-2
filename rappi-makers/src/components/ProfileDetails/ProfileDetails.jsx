import React from 'react';
import ProfileBalance from '../ProfileBalance/ProfileBalance';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './ProfileDetails.css';

const ProfileDetails = ({ profile, login }) => {
  return (
    <>
      <div className="profile-body">
        <ProfilePicture login={login} profileId={profile.id} photo={profile.photo} />
        <div className="profile-info-balance">
          <h2 className="profile-info-location-title">Estado del balance</h2>
          <ProfileBalance />
        </div>
        <div className="profile-info-general">
          <h2 className="profile-info-general-title">Información general</h2>
          <div className="profile-data">
            <h3>Nombre</h3>
            <p>{login === 'user' ? profile.names : profile.name}</p>
          </div>
          <div className="profile-data">
            <h3>Descripción</h3>
            <p>{profile.description}</p>
          </div>
        </div>
        <div className="profile-info-contact">
          <h2 className="profile-info-contact-title">Información de contacto</h2>
          <div className="profile-data">
            <h3>Email</h3>
            <p>{profile.email}</p>
          </div>
          <div className="profile-data">
            <h3>Número telefonico</h3>
            <p>{profile.mobile}</p>
          </div>
        </div>
        <div className="profile-info-location">
          <h2 className="profile-info-location-title">Ubicación</h2>
          <div className="profile-data">
            <h3>País</h3>
            <p>{profile.country}</p>
          </div>
          <div className="profile-data">
            <h3>Estado</h3>
            <p>{profile.state}</p>
          </div>
          <div className="profile-data">
            <h3>Ciudad</h3>
            <p>{profile.city}</p>
          </div>
          <div className="profile-data">
            <h3>Dirrección</h3>
            <p>{profile.address}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
