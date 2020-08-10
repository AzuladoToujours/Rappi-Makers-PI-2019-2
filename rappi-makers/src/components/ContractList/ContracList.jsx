import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuthContext } from '../../providers/AuthProvider';
import { getAllContract } from '../../endpoints/ContractEndpoints';
import Contract from '../Contract/Contract';
import Spinner from '../Spinner/Spinner';
import { formatDate } from '../../utils/utils';
import './ContractList.css';

const ContractList = () => {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState(false);
  const { login, token } = useContext(UserAuthContext);

  const fetchContracts = useCallback(async () => {
    if (login) {
      const endpoint = `${getAllContract}${login}`;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const { data } = await axios.get(endpoint, config);
        setContracts(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [token, login]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return (
    <div className="contract-list-container">
      <h1>Contratos</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!error ? (
            <>
              {contracts.length ? (
                <div className="contract-list">
                  {contracts.map((contract) => (
                    <Contract contract={contract} key={contract.id} formatDate={formatDate} />
                  ))}
                </div>
              ) : (
                <div>No tiene contratos</div>
              )}
            </>
          ) : (
            <h2>Lo sentimos ha ocurrido algo</h2>
          )}
        </>
      )}
    </div>
  );
};

export default ContractList;
