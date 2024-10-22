import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddDutySchedule.css';

function AddDutySchedule() {
    const { staffID } = useParams(); 
    const [dutySchedule, setDutySchedule] = useState({
        medicalStaff: {
            staffID: staffID 
        },
        dutyDate: '',
        startTime: '',
        endTime: ''
    });
    const [error, setError] = useState(null);

    const handleAddDutySchedule = async () => {
        const { dutyDate, startTime, endTime } = dutySchedule;

        if (!dutyDate || !startTime || !endTime) {
            setError('Wszystkie pola są wymagane!');
            return;
        }

        const formattedDutySchedule = {
            medicalStaff: {
                staffID: staffID
            },
            dutyDate,
            startTime: `${startTime}:00`,
            endTime: `${endTime}:00`
        };

        try {
            await axios.post('http://localhost:8080/api/dutySchedule', formattedDutySchedule);
            setDutySchedule({ medicalStaff: { staffID: staffID }, dutyDate: '', startTime: '', endTime: '' });
            alert('Dyżur dodany pomyślnie!');
        } catch (error) {
            console.error('Błąd podczas dodawania dyżuru:', error);
            setError('Nie udało się dodać dyżuru');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDutySchedule(prevSchedule => ({ ...prevSchedule, [name]: value }));
    };

    return (
        <div className="duty-schedule-container">
            <h1>Dodaj Dyżur</h1>
            {error && <p>{error}</p>}

            <input
                type="date"
                name="dutyDate"
                placeholder="Data dyżuru"
                value={dutySchedule.dutyDate}
                onChange={handleChange}
            />

            <input
                type="time"
                name="startTime"
                placeholder="Czas rozpoczęcia"
                value={dutySchedule.startTime}
                onChange={handleChange}
            />

            <input
                type="time"
                name="endTime"
                placeholder="Czas zakończenia"
                value={dutySchedule.endTime}
                onChange={handleChange}
            />

            <button onClick={handleAddDutySchedule}>Dodaj Dyżur</button>
        </div>
    );
}

export default AddDutySchedule;
