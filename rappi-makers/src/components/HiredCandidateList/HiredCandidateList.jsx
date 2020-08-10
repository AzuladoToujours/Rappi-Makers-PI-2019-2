import React from 'react';
import Candidate from '../Candidate/Candidate';
import Spinner from '../Spinner/Spinner';
import './HiredCandidateList.css';

const HiredCandidateList = ({ hireds, getPositionName, loading }) => {
  return (
    <div className="hired-list">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {hireds.length ? (
            <>
              {hireds.map((hiredId) => (
                <Candidate
                  key={hiredId}
                  candidateId={hiredId}
                  getPositionName={getPositionName}
                  isHired={true}
                />
              ))}
            </>
          ) : (
            <h2>No hay candidatos contratados</h2>
          )}
        </>
      )}
    </div>
  );
};

export default HiredCandidateList;
