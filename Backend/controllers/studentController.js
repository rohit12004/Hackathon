const studentModel = require('../models/student.model')
const studentService = require('../services/student.services')
const {validationResult} = require('express-validator')

module.exports.registerStudent = async (req, res,next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    console.log(req.body)

    const {fullname,registrationNo,classs,subjects} = req.body
    const isStudentAlreadyExist = await studentModel.findOne({registrationNo})
    if(isStudentAlreadyExist){
        return res.status(400).json({message:'Student already exists'})
    }

    // const hashedPassword = await userModel.hashPassword(password)

    const student = await studentService.createStudent({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        classs,
        registrationNo,
        subject1Marks:subjects.subject1Marks,
        subject2Marks:subjects.subject2Marks,
        subject3Marks:subjects.subject3Marks
    })

    // const token = user.generateAuthToken()
    // console.log(token)

    res.status(201).json({student})
}

module.exports.updateStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { registrationNo } = req.params;
    const { fullname, classs, subjects } = req.body;

    try {
        // Find student by registration number
        const student = await studentModel.findOne({ registrationNo });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update student details
        if (fullname) {
            student.fullname = {
                firstname: fullname.firstname || student.fullname.firstname,
                lastname: fullname.lastname || student.fullname.lastname,
            };
        }

        if (classs) student.classs = classs;
        if (subjects) {
            student.subjects.subject1Marks = subjects.subject1Marks || student.subjects.subject1Marks;
            student.subjects.subject2Marks = subjects.subject2Marks || student.subjects.subject2Marks;
            student.subjects.subject3Marks = subjects.subject3Marks || student.subjects.subject3Marks;
        }

        // Save updated student
        await student.save();
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all students
module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.find();
        res.status(200).json({ students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a student by registration number
module.exports.getStudentByRegNo = async (req, res) => {
    const { registrationNo } = req.params;

    try {
        const student = await studentModel.findOne({ registrationNo });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
