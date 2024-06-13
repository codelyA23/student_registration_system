const Course = require("../model/CourseModel.js");
const Sequelize = require('sequelize');


const getCourses = async (req, res) => {
  try {
    const response = await Course.findAll({
      where:{
        Active: true,
        Deleted: false,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get inactive Courses
const getInActiveCourse = async (req, res) => {
    try {
      const response = await Course.findAll({
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

//   activate Courses
const ActivateCourse = async (req, res) => {
    try {
      const courses = await Course.findOne({
        where: {
          course_id: req.params.course_id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!courses) {
        return res.status(404).json({ msg: "course not found" });
      }
      await Course.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            course_id: courses.course_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Course Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


const getCourseById = async (req, res) => {
  try {
    const response = await Course.findOne({
      where: {
        course_id: req.params.course_id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
        return res.status(404).json({ msg: "Course not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createCourse = async (req, res) => {
  const { course_code, course_name, description, credits,  availability, CreatedBy } = req.body;

  try {
    await Course.create({
      course_code,
      course_name,
      description,
      credits,
      availability,
      CreatedBy,
    });
    res.status(201).json({ msg: "Course created Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateCourse = async (req, res) => {
  const courses = await Course.findOne({
    where: {
      course_id: req.params.course_id,
      Active: true,
      Deleted: false,
    },
  });

  if (!courses) {
    return res.status(404).json({ msg: "Course not found" });
  }

  const { course_code, course_name, description, credits,  availability,  UpdatedBy } = req.body;

  try {
    await Course.update(
      {
        course_code,
        course_name,
        description,
        credits,
        availability,
        UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          course_id: courses.course_id,
        },
      }
    );
    res.status(200).json({ msg: "Course Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteCourse = async (req, res) => {
    try {
      const courses = await Course.findOne({
        where: {
          course_id: req.params.course_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!courses) {
        return res.status(404).json({ msg: "Course not found" });
      }
  
      await Course.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), 
        },
        {
          where: {
            course_id: courses.course_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Course Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getInActiveCourse,
  ActivateCourse
};
