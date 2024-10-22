import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DutySchedule.css';
const DutySchedule = () => {
    const [dutySchedules, setDutySchedules] = useState([]);

    useEffect(() => {
        const fetchDutySchedules = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dutySchedule');
                setDutySchedules(response.data);
            } catch (error) {
                console.error('Error fetching duty schedules:', error);
            }
        };

        fetchDutySchedules();
    }, []);

    return (
        <div className="duty-schedule">
            <h1>Aktualne dyżury</h1>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Godzina rozpoczęcia</th>
                        <th>Godzina zakończenia</th>
                        <th>Pracownik</th>
                        <th>Rola</th>
                    </tr>
                </thead>
                <tbody>
                    {dutySchedules.map((schedule) => (
                        <tr key={schedule.dutyID}>
                            <td>{schedule.dutyDate}</td>
                            <td>{schedule.startTime}</td>
                            <td>{schedule.endTime}</td>
                            <td>{schedule.medicalStaff?.firstName} {schedule.medicalStaff?.lastName}</td>
                            <td>{schedule.medicalStaff?.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DutySchedule;
