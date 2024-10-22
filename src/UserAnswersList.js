import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserAnswersList = () => {
    const {patientID } = useParams();
    const [userAnswers, setUserAnswers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserAnswers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/userAnswers/user/${patientID}`);
                setUserAnswers(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania odpowiedzi użytkownika:', error);
                setError('Nie udało się pobrać odpowiedzi użytkownika.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAnswers();
    }, [patientID]);

    return (
        <div>
            <h1>Odpowiedzi Użytkownika</h1>
            {loading && <p>Ładowanie odpowiedzi...</p>}
            {error && <p className="error-message">{error}</p>}
            {userAnswers.length > 0 ? (
                <ul>
                    {userAnswers.map((userAnswer) => (
                        <li key={userAnswer.userAnswerID}>
                            Pytanie: {userAnswer.question.questionText} <br />
                            Odpowiedź: {userAnswer.answer.answerText}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak odpowiedzi użytkownika.</p>
            )}
        </div>
    );
};

export default UserAnswersList;
