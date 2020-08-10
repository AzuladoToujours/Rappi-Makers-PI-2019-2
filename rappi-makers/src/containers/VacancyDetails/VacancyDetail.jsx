import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VacancyDetail from '../../components/VacancyDetails/VacancyDetail';
import Spinner from '../../components/Spinner/Spinner';
import { getVacancyById } from '../../endpoints/VacancyEndpoints';
import { formatDate, formatPayment } from '../../utils/utils';
import './VacancyDetail.css';

const VacancyDetailProvider = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [vacancy, setVacancy] = useState({});

  const fetchVacancy = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = `${getVacancyById}/${id}`;
      const { data } = await axios.get(endpoint);
      setVacancy(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVacancy();
  }, [fetchVacancy]);

  return (
    <div className="vacancy-detail-container">
      <>
        {loading ? (
          <Spinner />
        ) : (
          <VacancyDetail vacancy={vacancy} formatPayment={formatPayment} formatDate={formatDate} />
        )}
      </>
    </div>
  );
};

export default VacancyDetailProvider;
