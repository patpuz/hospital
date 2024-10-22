import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import withAuth from './withAuth';

const EditQuestion = () => {
    const { questionId } = useParams();
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');
    const [updatedAnswers, setUpdatedAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchQuestion = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/questions/${questionId}`);
            console.log('Odpowiedź z API:', response.data);
            setQuestionText(response.data.questionText);
        } catch (error) {
            console.error('Błąd podczas pobierania pytania:', error);
            setError('Nie udało się pobrać pytania.');
        } finally {
            setLoading(false);
        }
    };


    const fetchAnswers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/answers/questions/${questionId}/answers`);
            setAnswers(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania odpowiedzi:', error);
            setError('Nie udało się pobrać odpowiedzi.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/questions/${questionId}`, { questionText });
            alert('Pytanie zostało zaktualizowane.');
            window.location.reload();
        } catch (error) {
            console.error('Błąd podczas aktualizacji pytania:', error);
            setError('Nie udało się zaktualizować pytania.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAnswer = async () => {
        if (!newAnswer) return;
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/api/answers?questionId=${questionId}`, {
                answerText: newAnswer
            });
            setNewAnswer('');
            fetchAnswers();
        } catch (error) {
            console.error('Błąd podczas dodawania odpowiedzi:', error);
            setError('Nie udało się dodać odpowiedzi.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateAnswer = async (answerId) => {
        const updatedText = updatedAnswers[answerId];
        if (!updatedText) return;
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/answers/${answerId}`, { answerText: updatedText });
            alert('Odpowiedź została zaktualizowana.');
            fetchAnswers(); 
        } catch (error) {
            console.error('Błąd podczas aktualizacji odpowiedzi:', error);
            setError('Nie udało się zaktualizować odpowiedzi.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/api/answers/${answerId}`);
            alert('Odpowiedź została usunięta.');
            fetchAnswers();
        } catch (error) {
            console.error('Błąd podczas usuwania odpowiedzi:', error);
            setError('Nie udało się usunąć odpowiedzi.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
        fetchAnswers();
    }, [questionId]);

    return (
        <div>
            <h1>Edytuj Pytanie</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleUpdateQuestion}>
                <div>
                    <label>Pytanie:</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Aktualizowanie...' : 'Zaktualizuj Pytanie'}
                </button>
            </form>

            <h2>Odpowiedzi</h2>
            <ul>
                {answers.length > 0 ? (
                    answers.map((answer) => (
                        <li key={answer.answerID}>
                            <input
                                type="text"
                                value={updatedAnswers[answer.answerID] || answer.answerText}
                                onChange={(e) => setUpdatedAnswers({ ...updatedAnswers, [answer.answerID]: e.target.value })}
                            />
                            <button onClick={() => handleUpdateAnswer(answer.answerID)} disabled={loading}>
                                Zaktualizuj
                            </button>
                            <button onClick={() => handleDeleteAnswer(answer.answerID)} disabled={loading}>
                                Usuń
                            </button>
                        </li>
                    ))
                ) : (
                    <li>Brak odpowiedzi</li>
                )}
            </ul>

            <div>
                <h3>Dodaj Nową Odpowiedź</h3>
                <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                />
                <button onClick={handleAddAnswer} disabled={loading || !newAnswer}>
                    Dodaj Odpowiedź
                </button>
            </div>
        </div>
    );
};

export default withAuth(EditQuestion, ['Admin']);
