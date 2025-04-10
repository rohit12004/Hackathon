const EditStudentModal = ({ isOpen, onClose, student, onSave }) => {
    if (!isOpen) return null;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedStudent = {
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
  
      onSave(updatedStudent); // Call the save function passed from parent
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <div className="modal-header">
            <h2>Edit Student</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            <label>Registration Number</label>
            <input
              type="text"
              name="regNo"
              defaultValue={student.registrationNo}
              disabled
            />
  
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={student.fullname.firstname}
              required
            />
  
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={student.fullname.lastname}
              required
            />
  
            <label>Class</label>
            <select name="className" defaultValue={student.classs} required>
              <option value="IT-101">IT-101</option>
              <option value="CS-201">CS-201</option>
              <option value="EE-301">EE-301</option>
            </select>
  
            <label>Subject-1 IA Marks</label>
            <input
              type="number"
              name="subject1Marks"
              min="0"
              max="30"
              defaultValue={student.subjects.subject1Marks}
              required
            />
  
            <label>Subject-2 IA Marks</label>
            <input
              type="number"
              name="subject2Marks"
              min="0"
              max="30"
              defaultValue={student.subjects.subject2Marks}
              required
            />
  
            <label>Subject-3 IA Marks</label>
            <input
              type="number"
              name="subject3Marks"
              min="0"
              max="30"
              defaultValue={student.subjects.subject3Marks}
              required
            />
  
            <div className="modal-buttons">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditStudentModal;
  