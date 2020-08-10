import React, { useContext, useState } from 'react';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../../providers/AuthProvider';
import { userEditPhoto } from '../../endpoints/UserEndpoints';
import { restaurantEditPhoto } from '../../endpoints/RestaurantEndpoints';

const UploadImage = ({ open, onClose }) => {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token, login } = useContext(UserAuthContext);

  

  const fileChangedHandler = (event) => {
    // console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const uploadHandler = () => {
    if (selectedFile) {
      setLoading(true);
      let body = new FormData();
      console.log(selectedFile);
      body.append('photo', selectedFile);

     

      const config = {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json'},
      };
      let endpoint = login === 'user' ? userEditPhoto : restaurantEditPhoto;
  
      let endpointUpdate = `${endpoint}/${id}`
  
      axios.put(endpointUpdate, body, config);
      setLoading(false);
    }
  };
  return (
    <div className="message wrapper">
      <Popup open={open} onClose={onClose}>
        <div className="upload-image-container">
          <label>Seleccionar imagen</label>
          <input type="file" onChange={fileChangedHandler} />
          {loading ? <Spinner /> : <Button text="Subir imagen" type="button" handleClick={uploadHandler} />}
        </div>
      </Popup>
    </div>
  );
};

export default UploadImage;
