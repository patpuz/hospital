import React, { useState } from 'react';
import axios from 'axios';
import './AddCanteenMenu.css';

function AddCanteenMenu() {
    const [canteenMenu, setCanteenMenu] = useState({
        date: '',
        mealType: '',
        mealDescription: '',
        servingTime: ''
    });
    const [error, setError] = useState(null);

    const handleAddMenu = async () => {
        const { date, mealType, mealDescription, servingTime } = canteenMenu;

        if (!date || !mealType || !mealDescription || !servingTime) {
            setError('Wszystkie pola są wymagane!');
            return;
        }

        const formattedMenu = {
            date: new Date(date).toISOString().split('T')[0],
            mealType,
            mealDescription,
            servingTime: servingTime + ":00"
        };

        try {
            await axios.post('http://localhost:8080/api/canteenMenu', formattedMenu);
            setCanteenMenu({ date: '', mealType: '', mealDescription: '', servingTime: '' });
            alert('Menu kantyny dodane pomyślnie!');
        } catch (error) {
            console.error('Błąd podczas dodawania menu kantyny:', error);
            setError('Nie udało się dodać menu kantyny');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCanteenMenu(prevMenu => ({ ...prevMenu, [name]: value }));
    };

    return (
        <div className="canteen-menu-container">
            <h1>Dodaj Menu Kantyny</h1>
            {error && <p>{error}</p>}

            <input
                type="date"
                name="date"
                placeholder="Data"
                value={canteenMenu.date}
                onChange={handleChange}
            />

            <input
                type="text"
                name="mealType"
                placeholder="Typ posiłku"
                value={canteenMenu.mealType}
                onChange={handleChange}
            />

            <textarea
                name="mealDescription"
                placeholder="Opis posiłku"
                value={canteenMenu.mealDescription}
                onChange={handleChange}
            />

            <input
                type="time"
                name="servingTime"
                placeholder="Czas serwowania"
                value={canteenMenu.servingTime}
                onChange={handleChange}
            />

            <button onClick={handleAddMenu}>Dodaj Menu</button>
        </div>
    );
}

export default AddCanteenMenu;
