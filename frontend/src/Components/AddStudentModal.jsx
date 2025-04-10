import './AddStudentModal.css';
import { useState } from 'react';
import axios from 'axios';

const AddStudentModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;  // If modal is not open, return nothing

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      registrationNo: e.target.regNo.value,
      fullname: {
        firstname: e.target.firstName.value,
        lastname: e.target.lastName.value,
      },
      classs: e.target.className.value,
      subjects: {
        subject1Marks: e.target.subject1Marks.value,
        subject2Marks: e.target.subject2Marks.value,
        subject3Marks: e.target.subject3Marks.value,
      },
    };

    // API call to register the student
    try {
      const response = await axios.post('http://localhost:4000/students/register', formData);
      if (response.data.student) {
        onSave(response.data.student);  // Add student to the parent component
        onClose();  // Close the modal after saving
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Add New Student</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Registration Number</label>
          <input type="text" name="regNo" placeholder="e.g. CS2023001" required />

          <label>First Name</label>
          <input type="text" name="firstName" placeholder="Student's first name" required />

          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Student's last name" required />

          <label>Class</label>
          <select name="className" required>
            <option value="">Select Class</option>
            <option value="IT-101">IT-101</option>
            <option value="CS-201">CS-201</option>
            <option value="EE-301">EE-301</option>
          </select>

          <label>Subject-1 IA Marks</label>
          <input type="number" name="subject1Marks" min="0" max="30" required />

          <label>Subject-2 IA Marks</label>
          <input type="number" name="subject2Marks" min="0" max="30" required />

          <label>Subject-3 IA Marks</label>
          <input type="number" name="subject3Marks" min="0" max="30" required />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
