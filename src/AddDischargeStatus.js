import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddDutySchedule.css';

function AddDischargeStatus() {
    const { patientID } = useParams();
    const [dischargeStatus, setDischargeStatus] = useState({
        patient: {
            id: patientID
        },
        dischargeDate: '',
        additionalInfo: ''
    });
    const [error, setError] = useState(null);

    const handleAddDischargeStatus = async () => {
        const { dischargeDate, additionalInfo } = dischargeStatus;

        // Walidacja pól
        if (!dischargeDate || !additionalInfo) {
            setError('Wszystkie pola są wymagane!');
            return;
        }

        const formattedDischargeStatus = {
            patient: {
                id: patientID
            },
            dischargeDate,
            additionalInfo
        };

        // Logowanie danych, które będą wysyłane do API
        console.log('Wysyłane dane do API:', formattedDischargeStatus);

        try {
            await axios.post('http://localhost:8080/api/dischargeStatus', formattedDischargeStatus);
            setDischargeStatus({ patient: { id: patientID }, dischargeDate: '', additionalInfo: '' });
            alert('Status wypisu dodany pomyślnie!');
        } catch (error) {
            console.error('Błąd podczas dodawania statusu wypisu:', error);
            setError('Nie udało się dodać statusu wypisu');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDischargeStatus(prevStatus => ({ ...prevStatus, [name]: value }));
    };

    return (
        <div className="discharge-status-container">
            <h1>Dodaj Status Wypisu</h1>
            {error && <p>{error}</p>}

            <input
                type="date"
                name="dischargeDate"
                placeholder="Data wypisu"
                value={dischargeStatus.dischargeDate}
                onChange={handleChange}
            />

            <textarea
                name="additionalInfo"
                placeholder="Dodatkowe informacje"
                value={dischargeStatus.additionalInfo}
                onChange={handleChange}
            />

            <button onClick={handleAddDischargeStatus}>Dodaj Status Wypisu</button>
        </div>
    );
}

export default AddDischargeStatus;
