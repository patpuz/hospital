import React, {
    useEffect, useState
}

    from 'react';
import axios from 'axios';
import {
    Link
}

    from 'react-router-dom';
import './MedicalStaffList.css';

function MedicalStaffListAdmin() {
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
    const deleteStaffMember = async (staffID) => {
        console.log('Usuwanie pracownika o ID:', staffID);
        try {
            const response = await axios.delete(`http://localhost:8080/api/medicalStaff/${staffID}`);
            console.log('Odpowiedź po usunięciu:', response);
            setStaff(staff.filter(member => member.staffID !== staffID));
        }

        catch (error) {
            console.error('Błąd podczas usuwania pracownika:', error);
            setError('Nie udało się usunąć pracownika.');
        }

    }
        ;

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
                            <th>Usuń</th>
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
                                <td>
                                    <button onClick={() => deleteStaffMember(member.staffID)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MedicalStaffListAdmin;
