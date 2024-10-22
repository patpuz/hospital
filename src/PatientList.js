import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MedicalStaffList';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/patient');
                console.log('Odpowiedź z API:', response.data)
                if (Array.isArray(response.data)) {
                    setPatients(response.data);
                } else {
                    console.error('Otrzymano nieprawidłowe dane:', response.data);
                    setError('Nie udało się pobrać listy pacjentów.');
                }
            } catch (error) {
                console.error('Błąd podczas pobierania pacjentów:', error);
                setError('Nie udało się pobrać listy pacjentów.');
            }
        };

        fetchPatients();
    }, []);

    const deletePatient = async (patientID) => {
        try {
            await axios.delete(`http://localhost:8080/api/patient/${patientID}`);
            console.log(`Pacjent o ID: ${patientID} został usunięty.`);
            setPatients(patients.filter(patient => patient.id !== patientID));
        } catch (error) {
            console.error('Błąd podczas usuwania pacjenta:', error);
            setError('Nie udało się usunąć pacjenta.');
        }
    };

    return (
        <div className="patient-list">
            <h1>Lista Pacjentów</h1>
            {error && <p className="error-message">{error}</p>}

            {patients.length === 0 ? (
                <p>Brak dostępnych pacjentów.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Data Urodzenia</th>
                            <th>Numer Pokoju</th>
                            <th>Dodaj Status Wypisu</th>
                            <th>Dodaj Zabiegi</th> {/* New column */}
                            <th>Usuń Pacjenta</th>
                            <th>Zobacz Odpowiedzi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.birthDate ? patient.birthDate.toString().slice(0, 10) : 'Brak daty'}</td>
                                <td>{patient.roomNumber}</td>
                                <td>
                                    <Link to={`/add-discharge-status/${patient.id}`}>
                                        <button>Dodaj Status Wypisu</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/add-procedures/${patient.id}`}>
                                        <button>Dodaj Zabiegi</button> 
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => deletePatient(patient.id)}>Usuń</button>
                                </td>
                                <td>
                                    <Link to={`/user-answers-list/${patient.id}`}>
                                        <button>Zobacz Odpowiedzi</button>
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

export default PatientList;
