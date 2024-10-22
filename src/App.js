import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddCanteenMenu from './AddCanteenMenu'; 
import AddUser from './AddUser';
import AddMedicalStaff from './AddMedicalStaff'; 
import Login from './Login';
import AddPatient from './AddPatient';
import './App.css';
import MedicalStaffList from './MedicalStaffList'
import AddDutySchedule from './AddDutySchedule';
import DutySchedule from './DutySchedule';
import PatientList from './PatientList';
import AddDischargeStatus from './AddDischargeStatus';
import EditQuestion from './EditQuestion';
import QuestionList from './QuestionList';
import CanteenMenuList from './CanteenMenuList';
import MedicalStaffListAdmin from './AdminMedic'
import UserAnswersList from './UserAnswersList'
import AddProcedures from './AddProcedures';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                </header>

                {/* Routing do innych stron */}
                <Routes>

                    <Route path="/" element={<Home />} />

                    {/* Strona AddCanteenMenu */}
                    <Route path="/add-canteen-menu" element={<AddCanteenMenu />} />

                    {/* Strona AddUser */}
                    <Route path="/add-user" element={<AddUser />} />

                    {/* Strona AddMedicalStaff */}
                    <Route path="/add-medical-staff" element={<AddMedicalStaff />} />

                    {/* Strona Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Strona AddPatient */}
                    <Route path="/add-patient" element={<AddPatient />} />

                    {/* Strona MedicalStaffList */}
                    <Route path="/medical-staff-list" element={<MedicalStaffList />} />

                    {/* Strona AddDutySchedule */}
                    <Route path="/add-duty-schedule/:staffID" element={<AddDutySchedule />} />

                    {/* Strona DutySchedule */}
                    <Route path="/duty-schedule" element={<DutySchedule />} />

                    {/* Strona PateintList */}
                    <Route path="/patient-list" element={<PatientList />} />

                    {/* Strona AddDischargeStatus */}
                    <Route path="/add-discharge-status/:patientID" element={<AddDischargeStatus />} />

                    {/* Strona QuestionList */}
                    <Route path="/question-list" element={<QuestionList />} />

                    {/* Strona EditQuestion */}
                    <Route path="/edit-question/:questionId" element={<EditQuestion />} />

                    {/* Strona CanteenMenuList */}
                    <Route path="/canteen-menu-list" element={<CanteenMenuList />} />

                    {/* Strona MedicalStaffListAdmin */}
                    <Route path="/admin-medic" element={<MedicalStaffListAdmin />} />

                    {/* Strona UserAnswersList */}
                    <Route path="/user-answers-list/:patientID" element={<UserAnswersList />} />

                    {/* Strona AddProcedures */}
                    <Route path="/add-procedures/:patientID" element={<AddProcedures/>} />



                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Witamy na stronie glownej!</h2>
            <Link to="/add-canteen-menu">
                <button>Dodaj Menu Kantyny</button>
            </Link>
            <Link to="/add-user">
                <button>Dodaj Obsluge</button>
            </Link>
            <Link to="/login">
                <button>Zaloguj</button>
            </Link>
            <Link to="/add-patient">
                <button>Dodaj pacjenta</button>
            </Link>
            <Link to="/medical-staff-list">
                <button>Lista pracownikow</button>
            </Link>
            <Link to="/duty-schedule">
                <button>Lista dyzurow</button>
            </Link>
            <Link to="/patient-list">
                <button>Lista pacjentow</button>
            </Link>
            <Link to="/question-list">
                <button>Lista pytan</button>
            </Link>
            
            <Link to="/canteen-menu-list">
                <button>Lista dan</button>
            </Link>

            <Link to="/admin-medic">
                <button>Lista adm</button>
            </Link>

        </div>
    );
}

export default App;