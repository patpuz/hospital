import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AddProcedures.css';

function AddProcedures() {
    const { patientID } = useParams();
    const [procedure, setProcedure] = useState({
        patient: {
            id: patientID
        },
        procedurename: '',
        place: '',
        date: '',
        hour: ''
    });
    const [error, setError] = useState(null);

    const handleAddProcedure = async () => {
        const { procedurename, place, date, hour } = procedure;

        // Sprawdzenie wymaganych pól
        if (!procedurename || !place || !date || !hour) {
            setError('Wszystkie pola s¹ wymagane!');
            return;
        }

        const formattedProcedure = {
            patient: {
                id: patientID
            },
            procedurename,
            place,
            date: new Date(date).toISOString().split('T')[0],
            hour: hour + ":00"
            
        };

        // Logowanie danych, które bêd¹ wysy³ane do API
        console.log('Wysy³ane dane do API:', formattedProcedure);

        try {
            await axios.post(`http://localhost:8080/api/procedures`, formattedProcedure);
            setProcedure({ patient: { id: patientID }, procedurename: '', place: '', date: '', hour: '' });
            alert('Zabieg dodany pomyœlnie!');
        } catch (error) {
            console.error('B³¹d podczas dodawania zabiegu:', error);
            setError('Nie uda³o siê dodaæ zabiegu');
        }
    };





    const handleChange = (e) => {
        const { name, value } = e.target;
        setProcedure(prevProcedure => ({ ...prevProcedure, [name]: value }));
    };

    return (
        <div className="procedure-form">
            <h1>Dodaj Zabieg</h1>
            {error && <p>{error}</p>}

            <input
                type="text"
                name="procedurename"
                placeholder="Nazwa zabiegu"
                value={procedure.procedurename}
                onChange={handleChange}
            />

            <input
                type="text"
                name="place"
                placeholder="Miejsce"
                value={procedure.place}
                onChange={handleChange}
            />

            <input
                type="date"
                name="date"
                placeholder="Data"
                value={procedure.date}
                onChange={handleChange}
            />

            <input
                type="time"
                name="hour"
                placeholder="Godzina"
                value={procedure.hour}
                onChange={handleChange}
            />

            <button onClick={handleAddProcedure}>Dodaj Zabieg</button>
        </div>
    );
}

export default AddProcedures;


