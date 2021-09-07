/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import fetchReports from './services/fetchReports';
import updateReport from './services/updateReport';

const wrapText = text =>
  !text || text.length < 12 ? text : text.slice(0, 12) + '...';

const Report = ({ report, handleClick }) => (
  <div className="container" style={{ border: 'solid black 0.01px' }}>
    <div className="row">
      <div className="col">
        <p
          onMouseEnter={e => (e.target.textContent = report.id)}
          onMouseLeave={e =>
            (e.target.textContent = `Id: ${wrapText(report.id)}`)
          }
        >
          Id: {wrapText(report.id)}
        </p>
        <p>State: {report.state}</p>
        <a href="#">Details</a>
      </div>
      <div className="col">
        <p>Type: {report.payload?.reportType}</p>
        <p
          onMouseEnter={e => (e.target.textContent = report.payload?.message)}
          onMouseLeave={e =>
            (e.target.textContent = `Message: ${
              wrapText(report.payload?.message) || ''
            }`)
          }
        >
          Message: {wrapText(report.payload?.message)}
        </p>
      </div>
      <div className="col align-self-center">
        <div className="d-grid gap-1 col-8 mx-auto">
          <button
            type="button"
            className="btn btn-outline-secondary"
            // style={{ display: 'block' }}
            onClick={() => handleClick(report.id, 'Blocked')}
          >
            Block
          </button>
          <button
            type="button"
            // style={{ display: 'block' }}
            className="btn btn-outline-secondary"
            onClick={() => handleClick(report.id, 'Resolved')}
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setReports(await fetchReports());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (id, state) => {
    setLoading(true);
    await updateReport(id, state);
    await fetchData();
    await new Promise(res =>
      setTimeout(() => {
        return res();
      }, 5000)
    );
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h1>Reports</h1>
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border"
            style={{ width: '10rem', height: '10rem' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading &&
        reports
          .filter(r => r.state === 'OPEN')
          .map(r => <Report key={r.id} report={r} handleClick={handleClick} />)}
    </div>
  );
};

export default App;
