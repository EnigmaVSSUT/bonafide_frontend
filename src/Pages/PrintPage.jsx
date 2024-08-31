import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PrintPage.css';
import axios from 'axios';
import logo from './vssut.png';

export const PrintPage = () => {
  const contentToPrint = useRef(null);

  const [regNo1, setRegNo1] = useState('');
  const [regNo2, setRegNo2] = useState('');
  
  const [student1, setStudent1] = useState({});
  const [student2, setStudent2] = useState({});
  
  const [purpose1, setPurpose1] = useState('');
  const [purpose2, setPurpose2] = useState('');

  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: 'Bonafide Certificates',
  });

  useEffect(() => {
    const fetchDetails = async (regNo, setStudent, setError) => {
      if (regNo) {
        try {
          const response = await axios.get(
            `https://bonafide-server.onrender.com/get_bonafide?regd=${regNo}`
          );
          const details = response.data.data;
          console.log(details);
          if (details) {
            setStudent({
              name: details.name || '',
              parentName: details.parent_name || '',
              semester: details.semester || '',
              branch: details.branch || '',
              program: details.programme || '',
            });
            setError('');
          } else {
            setError('No details found for this registration number.');
            setStudent({});
          }
        } catch (error) {
          console.error('Error fetching the details:', error);
          setError(
            'Error fetching the details. Please check the registration number and try again.'
          );
          setStudent({});
        }
      } else {
        setStudent({});
      }
    };

    fetchDetails(regNo1, setStudent1, setError1);
  }, [regNo1]);

  useEffect(() => {
    const fetchDetails = async (regNo, setStudent, setError) => {
      if (regNo) {
        try {
          const response = await axios.get(
            `https://bonafide-server.onrender.com/get_bonafide?regd=${regNo}`
          );
          const details = response.data.data;
          console.log(details);
          if (details) {
            setStudent({
              name: details.name || '',
              parentName: details.parent_name || '',
              semester: details.semester || '',
              branch: details.branch || '',
              program: details.programme || '',
            });
            setError('');
          } else {
            setError('No details found for this registration number.');
            setStudent({});
          }
        } catch (error) {
          console.error('Error fetching the details:', error);
          setError(
            'Error fetching the details. Please check the registration number and try again.'
          );
          setStudent({});
        }
      } else {
        setStudent({});
      }
    };

    fetchDetails(regNo2, setStudent2, setError2);
  }, [regNo2]);

  return (
    <>
      <div className="form-container">
        <label>
          Registration Number 1:
          <input
            type="text"
            name="regNo1"
            value={regNo1}
            onChange={(e) => setRegNo1(e.target.value)}
          />
          {error1 && <p className="error">{error1}</p>}
        </label>

        <label>
          Purpose 1:
          <input
            type="text"
            name="purpose1"
            value={purpose1}
            onChange={(e) => setPurpose1(e.target.value)}
          />
        </label>

        <label>
          Registration Number 2:
          <input
            type="text"
            name="regNo2"
            value={regNo2}
            onChange={(e) => setRegNo2(e.target.value)}
          />
          {error2 && <p className="error">{error2}</p>}
        </label>

        <label>
          Purpose 2:
          <input
            type="text"
            name="purpose2"
            value={purpose2}
            onChange={(e) => setPurpose2(e.target.value)}
          />
        </label>
      </div>

      <div ref={contentToPrint} className="certificates-wrapper">
        <div className="certificate-container">
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
              <strong>{student1.name || '________'}</strong>, Son/Daughter of
              Shri/Mrs <strong>{student1.parentName || '________'}</strong>, Registration
              No. <strong>{regNo1 || '________'}</strong> of{' '}
              <strong>{student1.semester || '_______'} </strong>
              Semester, Branch <strong>{student1.branch || '_______'}</strong>, Programme{' '}
              <strong>{student1.program || '_______'}</strong> is a bonafide student of
              this University.
            </p>
            <p>
              This certificate is being issued to be used by the student for the
              purpose of <strong>{purpose1 || '_______'}</strong>.
            </p>
          </div>

          <div className="certificate-footer">
            <div className="signature">
              <p>Dean, Academic Affairs</p>
              <p>VSSUT, Burla</p>
            </div>
          </div>
        </div>

        <div className="certificate-container">
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
              <strong>{student2.name || '________'}</strong>, Son/Daughter of
              Shri/Mrs <strong>{student2.parentName || '________'}</strong>, Registration
              No. <strong>{regNo2 || '________'}</strong> of{' '}
              <strong>{student2.semester || '_______'} </strong>
              Semester, Branch <strong>{student2.branch || '_______'}</strong>, Programme{' '}
              <strong>{student2.program || '_______'}</strong> is a bonafide student of
              this University.
            </p>
            <p>
              This certificate is being issued to be used by the student for the
              purpose of <strong>{purpose2 || '_______'}</strong>.
            </p>
          </div>

          <div className="certificate-footer">
            <div className="signature">
              <p>Dean, Academic Affairs</p>
              <p>VSSUT, Burla</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handlePrint} className="print-button">
        PRINT
      </button>
    </>
  );
};
