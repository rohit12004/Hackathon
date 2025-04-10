import { createContext, useState } from 'react';

export const studentDataContext = createContext();

const studentContext = ({ children }) => {
  const [student, setStudent] = useState({
    fullName: {
      firstName: '',
      lastName: ''
    },
    registrationNo: '',
    classs: '',
    subjects: {
      subject1Marks: '',
      subject2Marks: '',
      subject3Marks: ''
    }
  });

  return (
    <studentDataContext.Provider value={{ student, setStudent }}>
      {children}
    </studentDataContext.Provider>
  );
};

export default studentContext;
