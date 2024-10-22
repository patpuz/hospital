import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MedicalStaffList.css';

function MedicalStaffList() {
    const [staff, setStaff] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/medicalStaff');
                console.log('Odpowiedź z API:', response.data);
                if (Array.isArray(response.data)) {
                    setStaff(response.data);
                } else {
                    console.error('Otrzymano nieprawidłowe dane:', response.data);
                    setError('Nie udało się pobrać listy pracowników.');
                }
            } catch (error) {
                console.error('Błąd podczas pobierania pracowników:', error);
                setError('Nie udało się pobrać listy pracowników.');
            }
        };

        fetchStaff();
    }, []);

    return (
        <div className="medical-staff-list">
            <h1>Lista Pracowników Medycznych</h1>
            {error && <p className="error-message">{error}</p>}

            {staff.length === 0 ? (
                <p>Brak dostępnych pracowników medycznych.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Rola</th>
                            <th>Departament</th>
                            <th>Dodaj Dyżur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((member) => (
                            <tr key={member.staffID}>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.role}</td>
                                <td>{member.department}</td>
                                <td>
                                    <Link to={`/add-duty-schedule/${member.staffID}`}>
                                        <button>Dodaj Dyżur</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MedicalStaffList;
