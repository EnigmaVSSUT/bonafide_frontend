import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PrintPage.css';
import axios from 'axios';
import logo from './vssut.png';

export const PrintPage = () => {
  const contentToPrint = useRef(null);

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [program, setProgram] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: 'Bonafide Certificate',
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (regNo) {
        try {
          const response = await axios.get(
            `https://bonafide-server.onrender.com/get_bonafide?regd=${regNo}`
          );
          const details = response.data.data;
          console.log(details);
          if (details) {
            setStudentName(details.name || '');
            setParentName(details.parent_name || '');
            setSemester(details.semester || '');
            setBranch(details.branch || '');
            setProgram(details.programme || '');
            setError('');
          } else {
            setError('No details found for this registration number.');
            resetFields();
          }
        } catch (error) {
          console.error('Error fetching the details:', error);
          setError(
            'Error fetching the details. Please check the registration number and try again.'
          );
          resetFields();
        }
      } else {
        resetFields();
      }
    };

    fetchDetails();
  }, [regNo]);

  const resetFields = () => {
    setStudentName('');
    setParentName('');
    setSemester('');
    setBranch('');
    setProgram('');
  };

  return (
    <>
      <div className="form-container">
        <label>
          Registration Number:
          <input
            type="text"
            name="regNo"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
        </label>

        <label>
          Purpose:
          <input
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </label>
      </div>

      <div ref={contentToPrint} className="certificate-container">
        <div className="certificate-header">
          <img src={logo} className="logo" alt="University Logo" style={{width:"200px"}} />
          <h2 className="university-name">
            VEER SURENDRA SAI UNIVERSITY OF TECHNOLOGY: BURLA
          </h2>
          <p className="address">
            (Formerly University College of Engineering, Burla Established by
            Govt. of Odisha in 1956 & Upgraded in 2009 to a State Govt.
            University Covered under Section 2(f) & 12(B) of UGC Act.)
          </p>
          <p className="address-po">
            P.O: Engineering College, Burla (Siddhi Vihar), Dist: Sambalpur
            Odisha - 768018, INDIA
          </p>
        </div>

        <p className="certificate-number">
          No. VSSUT/ACD/__________{' '}
          <span className="date">Dated: {new Date().toLocaleDateString()}</span>
        </p>
        <h3 className="certificate-title">BONAFIDE CERTIFICATE</h3>

        <div className="certificate-content">
          <p>
            This is to certify that Smt./Miss{' '}
            <strong>{studentName || '________'}</strong>, Son/Daughter of
            Shri/Mrs <strong>{parentName || '________'}</strong>, Registration
            No. <strong>{regNo || '________'}</strong> of{' '}
            <strong>{semester || '_______'} </strong>
            Semester, Branch <strong>{branch || '_______'}</strong>, Programme{' '}
            <strong>{program || '_______'}</strong> is a bonafide student of
            this University.
          </p>
          <p>
            This certificate is being issued to be used by the student for the
            purpose of <strong>{purpose || '_______'}</strong>.
          </p>
        </div>

        <div className="certificate-footer">
          <div className="signature">
            <p>Dean, Academic Affairs</p>
            <p>VSSUT, Burla</p>
          </div>
        </div>
      </div>

      <button onClick={handlePrint} className="print-button">
        PRINT
      </button>
    </>
  );
};
