import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserAuthContext } from '../../providers/AuthProvider';
import Spinner from '../Spinner/Spinner';
import { rechargeBalance } from '../../endpoints/RestaurantEndpoints';
import { formatPayment } from '../../utils/utils';
import './ProfileBalance.css';

const ProfileBalance = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateTokenBalance, user, token, balance, login } = useContext(UserAuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const request = { amount };
      const response = await axios.post(rechargeBalance, request, config);
      updateTokenBalance(response.data.token, response.data.balance);
      setAmount('');
      setLoading(false);
      setMessage('Recarga exitosa');
    } catch (error) {
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user && (
        <div className="balance-form-container">
          <p>Balance actual ${formatPayment(balance)}</p>
          {login === 'restaurant' && (
            <>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Recarga tu balance"
                  className="balance-input"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
                {loading ? (
                  <div className="balance-spinner">
                    {' '}
                    <Spinner />{' '}
                  </div>
                ) : (
                  <button type="submit" className="balance-btn">
                    Recarga
                  </button>
                )}
              </form>
              {message}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileBalance;
