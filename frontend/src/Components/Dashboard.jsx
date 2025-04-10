import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import AddStudentModal from './AddStudentModal';
import EditStudentModal from './EditStudentModal';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStudentData, setEditStudentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/students/all');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = (student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
    setIsModalOpen(false);
  };

  const openEditModal = (student) => {
    setEditStudentData(student);
    setIsEditModalOpen(true);
  };

  const updateStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(
        `https://hackathon-jgfy.onrender.com/students/update/${updatedStudent.registrationNo}`,
        updatedStudent
      );
      const updatedStudentData = response.data.student;
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.registrationNo === updatedStudentData.registrationNo
            ? updatedStudentData
            : student
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.fullname.firstname} ${student.fullname.lastname}`;
    const regNo = student.registrationNo.toLowerCase();
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      regNo.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="dashboard">
      <div className="cards">
        <Card title="Total Students" value={students.length} icon="👥" />
        <Card
          title="Average Marks"
          value={
            students.length > 0
              ? Math.round(
                  students.reduce(
                    (sum, s) =>
                      sum +
                      s.subjects.subject1Marks +
                      s.subjects.subject2Marks +
                      s.subjects.subject3Marks,
                    0
                  ) /
                    (students.length * 3)
                )
              : 0
          }
          icon="✅"
        />
      </div>

      <div className="student-section">
        <div className="section-header">
          <h2>Students</h2>
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            Add Student
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>Reg Number</th>
              <th>Name</th>
              <th>Class</th>
              <th>Subject-1 IA Marks</th>
              <th>Subject-2 IA Marks</th>
              <th>Subject-3 IA Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.registrationNo}</td>
                <td>{student.fullname.firstname} {student.fullname.lastname}</td>
                <td>{student.classs}</td>
                <td>{student.subjects.subject1Marks}</td>
                <td>{student.subjects.subject2Marks}</td>
                <td>{student.subjects.subject3Marks}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(student)}
                  >
                    Edit
                  </button>
                  {/* <button className="delete-btn">Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addStudent}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={editStudentData}
        onSave={updateStudent}
      />
    </div>
  );
};

const Card = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
