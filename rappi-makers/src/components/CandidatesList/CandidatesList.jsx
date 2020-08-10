import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../../providers/AuthProvider';
import Candidate from '../Candidate/Candidate';
import HiredCandidate from '../HiredCandidateList/HiredCandidateList';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { getVacancyById } from '../../endpoints/VacancyEndpoints';
import { hiredCandidateEndpoint } from '../../endpoints/RestaurantEndpoints';
import { getPositionName } from '../../utils/utils';
import './CandidateList.css';

const CandidatesList = () => {
  const { vacancyId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [hireds, setHireds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHired, setLoadingHired] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [title, setTitle] = useState('');
  const { token } = useContext(UserAuthContext);

  const fetchCandidates = useCallback(async () => {
    const endpoint = `${getVacancyById}/${vacancyId}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      setLoading(true);
      const { data } = await axios.get(endpoint, config);
      setCandidates(data.candidates);
      setHireds(data.hireds ? data.hireds : []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [vacancyId, token]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const hiredCandidate = async (vacancyId, candidateId, token) => {
    const endpoint = `${hiredCandidateEndpoint}/${vacancyId}/hirecandidate`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const request = {
      userId: candidateId,
    };
    try {
      setLoadingHired(true);
      const { data } = await axios.put(endpoint, request, config);
      setMessage(data.message);
      setTitle('Contratado');
      setOpen(true);
    } catch (error) {
      setMessage(error.response.data.error);
      setTitle('Lo sentimos, un error ha ocurrido');
      setOpen(true);
    } finally {
      setLoadingHired(false);
    }
  };

  const onclose = () => {
    window.location.reload(false);
  };

  return (
    <div className="candidate-list-container">
      <h1>Candidatos</h1>
      <div className="candidate-list">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {candidates.length ? (
              <>
                {candidates.map((candidateId) => (
                  <Candidate
                    key={candidateId}
                    candidateId={candidateId}
                    vacancyId={vacancyId}
                    hiredCandidate={hiredCandidate}
                    isHired={false}
                    getPositionName={getPositionName}
                    loadingHired={loadingHired}
                  />
                ))}
              </>
            ) : (
              <h2>No hay candidatos para esta oferta</h2>
            )}
          </>
        )}
      </div>
      <h1>Contratados</h1>
      <HiredCandidate hireds={hireds} getPositionName={getPositionName} loading={loading} />
      <Message open={open} messageTitle={title} messageBody={message} onClose={onclose} />
    </div>
  );
};

export default CandidatesList;
