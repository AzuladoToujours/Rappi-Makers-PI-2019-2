import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuthContext } from '../../providers/AuthProvider';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import { getUserById } from '../../endpoints/UserEndpoints';
import './Candidate.css';

const Candidate = ({ candidateId, vacancyId, hiredCandidate, isHired, getPositionName, loadingHired }) => {
  const [candidate, setCandidate] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserAuthContext);
  const fetchCandidate = useCallback(async () => {
    try {
      const endpoint = `${getUserById}/${candidateId}`;
      const { data } = await axios.get(endpoint);
      setCandidate(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [candidateId]);

  useEffect(() => {
    fetchCandidate();
  }, [fetchCandidate]);

  return (
    <div className="candidate-container">
      {loading ? (
        <div className="candidate-spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="candidate-header">
            <h2>
              {candidate.names} {candidate.last_names}
            </h2>
          </div>
          <div className="candidate-body">
            <h3>Información de contacto</h3>
            <h4>Email</h4>
            <p>{candidate.email}</p>
            <h4>Número de celular</h4>
            <p>{candidate.mobile}</p>
            <h4>Habilidades</h4>
            {candidate.positions.map((position) => (
              <p key={position}>{getPositionName(position)}</p>
            ))}
          </div>
          <div className="candidate-actions">
            {!isHired && (
              <>
                {loadingHired ? (
                  <div className="hired-spinner-container">
                    <Spinner />
                  </div>
                ) : (
                  <Button
                    text="Contratar"
                    type="button"
                    handleClick={() => hiredCandidate(vacancyId, candidateId, token)}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Candidate;
