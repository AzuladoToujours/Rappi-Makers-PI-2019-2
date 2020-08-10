import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuthContext } from '../../providers/AuthProvider';
import { getContractById } from '../../endpoints/ContractEndpoints';
import HiredCandidateList from '../HiredCandidateList/HiredCandidateList';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { getPositionName, formatPayment } from '../../utils/utils';
import './ContractDetails.css';

const ContractDetails = () => {
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { contractId } = useParams();
  const { token, login } = useContext(UserAuthContext);
  const fetchContract = useCallback(async () => {
    if (login) {
      try {
        const endpoint = `${getContractById}${login}/${contractId}`;
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(endpoint, config);
        setContract(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [token, login, contractId]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return (
    <div className="contract-details-container">
      <h1>Detalles de contrato</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!error ? (
            <div>
              <div className="contract-info-container">
                <div className="contract-info-data">
                  <h3>Descripción</h3>
                  <p>{contract.description}</p>
                </div>
                <div className="contract-info-data">
                  <h3>Pago por hora</h3>
                  <p>{formatPayment(contract.payment_per_hour)}</p>
                </div>
                <div className="contract-info-data">
                  <h3>Estado</h3>
                  <p>{contract.state}</p>
                </div>
                <div className="contract-info-data">
                  <h3>Ciudad</h3>
                  <p>{contract.city}</p>
                </div>
                <div className="contract-info-data">
                  <h3>Habilidad requerida</h3>
                  <p>{getPositionName(contract.position_id)}</p>
                </div>
              </div>
              <h3>Contratados</h3>
              <HiredCandidateList
                hireds={contract.workers}
                getPositionName={getPositionName}
                loading={false}
              />
            </div>
          ) : (
            <h2>Lo sentimos, un error ha ocurrido</h2>
          )}
        </>
      )}
    </div>
  );
};

export default ContractDetails;
