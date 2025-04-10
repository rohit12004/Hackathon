const studentModel = require('../models/student.model')

module.exports.createStudent = async({
    firstname,lastname,classs,registrationNo,subject1Marks,subject2Marks,subject3Marks
}) => {
    if(!firstname || !lastname || !classs || !registrationNo || !subject1Marks || !subject2Marks || !subject3Marks){
        throw new Error('Please provide all fields')
    }

    const student = studentModel.create({
        fullname:{
            firstname,
            lastname
        },
        classs,
        registrationNo,
        subjects:{
            subject1Marks,
            subject2Marks,
            subject3Marks
        }
    })

    return student
}