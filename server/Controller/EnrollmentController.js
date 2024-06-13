const Course = require("../model/CourseModel.js");
const Student = require("../model/StudentModel.js")
const Enrollment = require("../model/EnrollmentModel.js")
const Sequelize = require('sequelize');


const getEnrollments = async (req, res) => {
  try {
    const response = await Enrollment.findAll({
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

// get inactive Enrollments
const getInActiveEnrollment = async (req, res) => {
    try {
      const response = await Enrollment.findAll({
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

//   activate Enrollments
const ActivateEnrollment = async (req, res) => {
    try {
      const enrollments = await Enrollment.findOne({
        where: {
          enrollment_id: req.params.enrollment_id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!enrollments) {
        return res.status(404).json({ msg: "Enrollment not found" });
      }
      await Enrollment.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            enrollment_id: enrollments.enrollment_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Enrollment Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


const getEnrollmentById = async (req, res) => {
  try {
    const response = await Enrollment.findOne({
      where: {
        enrollment_id: req.params.enrollment_id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
        return res.status(404).json({ msg: "Enrollment not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createEnrollment = async (req, res) => {
  const { enrollment_id, student_id, course_id, enrollment_date, CreatedBy } = req.body;

  try {
    await Enrollment.create({
      enrollment_id: enrollment_id,
      student_id: student_id,
      course_id: course_id,
      enrollment_date: enrollment_date,
      CreatedBy:CreatedBy,
    });
    res.status(201).json({ msg: "Enrollment created Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateEnrollment = async (req, res) => {
  const enrollments = await Enrollment.findOne({
    where: {
      enrollment_id: req.params.enrollment_id,
      Active: true,
      Deleted: false,
    },
  });

  if (!enrollments) {
    return res.status(404).json({ msg: "Enrollment not found" });
  }

  const { enrollment_id, student_id, course_id, enrollment_date, CreatedBy } = req.body;

  try {
    await Enrollment.update(
      {
        enrollment_id: enrollment_id,
        student_id: student_id,
        course_id: course_id,
        enrollment_date: enrollment_date,
        UpdatedBy:UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          enrollment_id: enrollments.enrollment_id,
        },
      }
    );
    res.status(200).json({ msg: "Enrollment Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteEnrollment = async (req, res) => {
    try {
      const enrollments = await Enrollment.findOne({
        where: {
          enrollment_id: req.params.enrollment_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!enrollments) {
        return res.status(404).json({ msg: "Enrollment not found" });
      }
  
      await Enrollment.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), 
        },
        {
          where: {
            enrollment_id: enrollments.enrollment_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Enrollment Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getInActiveEnrollment,
  ActivateEnrollment
};
