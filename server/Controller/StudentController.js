const Student = require("../model/StudentModel.js")
const User = require("../model/UserModel.js")
const Sequelize = require('sequelize');
const Module = require('../model/ModuleModel.js');


const getStudents = async (req, res) => {
  try {
    const response = await Student.findAll({
      where:{
        Active: true,
        Deleted: false,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          where:{
            Active: true,
            Deleted: false,
          }
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get inactive Students
const getInActiveStudent = async (req, res) => {
    try {
      const response = await Student.findAll({
        where:{
          Active: false,
          Deleted: true,
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

//   activate Students
const ActivateStudent = async (req, res) => {
    try {
      const students = await Student.findOne({
        where: {
          id: req.params.id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!students) {
        return res.status(404).json({ msg: "Student not found" });
      }
      await Student.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            id: students.id,
          },
        }
      );
  
      res.status(200).json({ msg: "Student Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


const getStudentById = async (req, res) => {
  try {
    const response = await Student.findOne({
      where: {
        student_id: req.params.student_id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
        return res.status(404).json({ msg: "Student not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



const createStudent = async (req, res) => {
  const { code, first_name, last_name, email, phone_number, date_of_birth, address, city, state, zip_code, country, course_id, user_id, CreatedBy } = req.body;

  try {
    await Student.create({
      code,
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      address,
      city,
      state,
      zip_code,
      country,
      course_id,
      user_id,
      CreatedBy,
    });
    const modules = await Module.findAll({ where: { course_id } });
    res.status(201).json({ msg: "Student created successfully", modules });
    // res.status(201).json({ msg: "Student created Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateStudent = async (req, res) => {
  const students = await Student.findOne({
    where: {
      student_id: req.params.student_id,
      Active: true,
      Deleted: false,
    },
  });

  if (!students) {
    return res.status(404).json({ msg: "Student not found" });
  }

  const { code, first_name, last_name, email, phone_number, date_of_birth, address, city, state, zip_code, country, course_id, user_id, UpdatedBy } = req.body;

  try {
    await Student.update(
      {
      code,
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      address,
      city,
      state,
      zip_code,
      country,
      course_id,
      user_id,
        UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          student_id: students.student_id,
        },
      }
    );
    const modules = await Module.findAll({ where: { course_id } });
    res.status(200).json({ msg: "Student created successfully", modules });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteStudent = async (req, res) => {
    try {
      const students = await Student.findOne({
        where: {
          id: req.params.id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!students) {
        return res.status(404).json({ msg: "Student not found" });
      }
  
      await Student.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), 
        },
        {
          where: {
            id: students.id,
          },
        }
      );
  
      res.status(200).json({ msg: "Student Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getInActiveStudent,
  ActivateStudent
};
