import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CanteenMenuList.css';

function CanteenMenuList() {
    const [canteenMenus, setCanteenMenus] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCanteenMenus = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/canteenMenu');
            const sortedMenus = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setCanteenMenus(sortedMenus);
        } catch (error) {
            console.error('Błąd podczas pobierania menu kantyny:', error);
            setError('Nie udało się pobrać menu kantyny.');
        } finally {
            setLoading(false);
        }
    };


    const deleteMenu = async (menuID) => {
        console.log('Usuwanie menu o ID:', menuID);
        if (!menuID) {
            console.error('Nieprawidłowe ID:', menuID);
            setError('Nieprawidłowe ID menu.');
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/canteenMenu/${menuID}`);
            setCanteenMenus(canteenMenus.filter(menu => menu.menuID !== menuID)); 
        } catch (error) {
            console.error('Błąd podczas usuwania menu kantyny:', error);
            setError('Nie udało się usunąć menu kantyny.');
        }
    };

    useEffect(() => {
        fetchCanteenMenus();
    }, []);

    return (
        <div className="canteen-menu-list-container">
            <h1>Lista Menu Kantyny</h1>
            {loading && <p>Ładowanie...</p>}
            {error && <p>{error}</p>}
            <ul>
                {canteenMenus.length > 0 ? (
                    canteenMenus.map(menu => {
                        console.log('menu:', menu);
                        return (
                            <li key={menu.menuID} className="canteen-menu-item">
                                <div className="menu-details">
                                    <p><strong>Data:</strong> {menu.date}</p>
                                    <p><strong>Typ posiłku:</strong> {menu.mealType}</p>
                                    <p><strong>Opis:</strong> {menu.mealDescription}</p>
                                    <p><strong>Czas serwowania:</strong> {menu.servingTime}</p>
                                    <button onClick={() => deleteMenu(menu.menuID)} className="delete-button">Usuń</button>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p>Brak menu do wyświetlenia.</p>
                )}
            </ul>
        </div>
    );
}

export default CanteenMenuList;
