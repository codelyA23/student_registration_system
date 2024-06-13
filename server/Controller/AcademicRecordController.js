const AcademicRecord = require("../model/AcademicRecord.js");
const Student = require("../model/StudentModel.js")
const Course = require("../model/CourseModel.js")
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

const getAcademicRecords = async (req, res) => {
  try {
    const response = await AcademicRecord.findAll({
      where:{
        Active: true,
        Deleted: false,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Course,
          where:{
            Active: true,
            Deleted: false,
          }
        },
      ],
      include: [
        {
          model: Student,
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

// get inactive AcademicRecords
const getInActiveAcademicRecord = async (req, res) => {
    try {
      const response = await AcademicRecord.findAll({
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

//   activate AcademicRecords
const ActivateAcademicRecord = async (req, res) => {
    try {
      const record = await AcademicRecord.findOne({
        where: {
          id: req.params.id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!record) {
        return res.status(404).json({ msg: "Academic Record not found" });
      }
      await AcademicRecord.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            id: record.id,
          },
        }
      );
  
      res.status(200).json({ msg: "Academic Record Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


const getAcademicRecordById = async (req, res) => {
  try {
    const response = await AcademicRecord.findOne({
      where: {
        record_id: req.params.record_id,
        Active: true,
        Deleted: false,
      },
      include: [
        {
          model: Course,
          where:{
            Active: true,
            Deleted: false,
          }
        },
      ],
      include: [
        {
          model: Student,
          where:{
            Active: true,
            Deleted: false,
          }
        },
      ],
    });

    if (!response) {
        return res.status(404).json({ msg: "Academic Record not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createAcademicRecord = async (req, res) => {
  const { student_id, course_id, grade, term, year, CreatedBy } = req.body;

  try {
    await AcademicRecord.create({
      student_id: student_id,
      course_id: course_id,
      grade: grade,
      term: term,
      year: year,
      CreatedBy:CreatedBy,
    });
    res.status(201).json({ msg: "Academic Record created Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateAcademicRecord = async (req, res) => {
  const record = await AcademicRecord.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!record) {
    return res.status(404).json({ msg: "Academic Record not found" });
  }

  const { student_id, course_id, grade, term, year, UpdatedBy } =
    req.body;

  try {
    await AcademicRecord.update(
      {
        student_id: student_id,
      course_id: course_id,
      grade: grade,
      term: term,
      year: year,
        UpdatedBy:UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          record_id: record.record_id,
        },
      }
    );
    res.status(200).json({ msg: "Academic Record Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteAcademicRecord = async (req, res) => {
    try {
      const record = await AcademicRecord.findOne({
        where: {
          record_id: req.params.record_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!record) {
        return res.status(404).json({ msg: "Academic Record not found" });
      }
  
      await AcademicRecord.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), 
        },
        {
          where: {
            record_id: record.record_id,
          },
        }
      );
  
      res.status(200).json({ msg: "AcademicRecord Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getAcademicRecords,
  getAcademicRecordById,
  createAcademicRecord,
  updateAcademicRecord,
  deleteAcademicRecord,
  getInActiveAcademicRecord,
  ActivateAcademicRecord
};
