import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import withAuth from './withAuth';

const QuestionsList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/questions');
                console.log('Odpowiedź z API:', response.data); 
                if (Array.isArray(response.data)) {
                    setQuestions(response.data);
                } else {
                    setError('Odpowiedź nie jest tablicą.');
                }
            } catch (error) {
                console.error('Błąd podczas pobierania pytań:', error);
                setError('Nie udało się pobrać pytań.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleEdit = (questionId) => {
        navigate(`/edit-question/${questionId}`);
    };

    const handleDelete = async (questionId) => {
        try {
            await axios.delete(`http://localhost:8080/api/questions/${questionId}`);
            console.log(`Pytanie o ID: ${questionId} zostało usunięte.`);
            setQuestions(questions.filter(question => question.id !== questionId));
        } catch (error) {
            console.error('Błąd podczas usuwania pytania:', error);
            setError('Nie udało się usunąć pytania.');
        }
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/questions', {
                questionText: newQuestion,
            });
            console.log('Dodano nowe pytanie:', response.data);
            setQuestions([...questions, response.data]);
            setNewQuestion('');
        } catch (error) {
            console.error('Błąd podczas dodawania pytania:', error);
            setError('Nie udało się dodać pytania.');
        }
    };

    return (
        <div>
            <h1>Lista Pytań</h1>
            {loading && <p>Ładowanie pytań...</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleAddQuestion}>
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Wpisz nowe pytanie"
                    required
                />
                <button type="submit">Dodaj Pytanie</button>
            </form>

            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.questionText}
                        <button onClick={() => handleEdit(question.id)}>Edytuj</button>
                        <button onClick={() => handleDelete(question.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(QuestionsList, ['Admin']);
