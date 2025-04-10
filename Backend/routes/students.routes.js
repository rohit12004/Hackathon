const express = require('express')
const router = express.Router()
const registerStudent = require('../models/student.model')
const { body,param } = require('express-validator')
const studentController = require('../controllers/studentController')
// const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be atleast 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last Name must be atleast 3 characters long'),
    body('classs').isLength({ min: 1 }).withMessage('Class is required'),
    body('subjects.subject1Marks').toFloat().isNumeric().withMessage('Subject 1 marks must be a number'),
    body('subjects.subject2Marks').toFloat().isNumeric().withMessage('Subject 2 marks must be a number'),
    body('subjects.subject3Marks').toFloat().isNumeric().withMessage('Subject 3 marks must be a number'),
    body('registrationNo').isLength({ min: 1 }).withMessage('Registration number is required'),
], studentController.registerStudent)

// Update student route
router.put('/update/:registrationNo', [
    param('registrationNo').notEmpty().withMessage('Registration number is required'),
    body('fullname.firstname').optional().isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
    body('classs').optional().isLength({ min: 1 }).withMessage('Class is required'),
    body('subjects.subject1Marks').optional().toFloat().isNumeric().withMessage('Subject 1 marks must be a number'),
    body('subjects.subject2Marks').optional().toFloat().isNumeric().withMessage('Subject 2 marks must be a number'),
    body('subjects.subject3Marks').optional().toFloat().isNumeric().withMessage('Subject 3 marks must be a number'),
], studentController.updateStudent);

// Get all students
router.get('/all', studentController.getAllStudents);

// Get a student by registration number
router.get('/:registrationNo', studentController.getStudentByRegNo);


module.exports = router 