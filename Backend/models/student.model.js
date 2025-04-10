const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registrationNo: { type: String, required: true, unique: true },
  fullname:{
    firstname  :{
        type:String,
        required:true,
        minlength:[3,'First Name must me atleast 3 characters long']
    },
    lastname:{
        type:String,
        minlength:[3,'Last  Name must me atleast 3 characters long']
    }
},
  classs: { type: String, required: true },
  subjects:{
    subject1Marks:{
        type:Number,
        required:true
    },
    subject2Marks:{
        type:Number,
        required:true
    },
    subject3Marks:{
        type:Number,
        required:true
    }   
  }
});

module.exports = mongoose.model('Student', studentSchema);
