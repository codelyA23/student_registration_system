const User = require("../model/UserModel.js")
const Faculty = require("../model/FacultyModel.js")
const Sequelize = require('sequelize');


const getFacultys = async (req, res) => {
  try {
    const response = await Faculty.findAll({
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


const getFacultyByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await Faculty.findOne({
      where: {
        user_id: userId,
        Active: true,
        Deleted: false,
      },
      include: [
        {
          model: User,
          where: {
            user_id: userId,
            Active: true,
            Deleted: false,
          },
        },
      ],
    });

    if (!response) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// get inactive Facultys
const getInActiveFaculty = async (req, res) => {
    try {
      const response = await Faculty.findAll({
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

//   activate Facultys
const ActivateFaculty = async (req, res) => {
    try {
      const Facultys = await Faculty.findOne({
        where: {
          faculty_id: req.params.faculty_id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!Facultys) {
        return res.status(404).json({ msg: "Faculty not found" });
      }
      await Faculty.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            faculty_id: Facultys.faculty_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Faculty Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


const getFacultyById = async (req, res) => {
  try {
    const response = await Faculty.findOne({
      where: {
        faculty_id: req.params.faculty_id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
        return res.status(404).json({ msg: "Faculty not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createFaculty = async (req, res) => {
  const { user_id, department, office_number, phone_number, CreatedBy } = req.body;

  try {
    await Faculty.create({
      user_id: user_id,
      department: department,
      office_number: office_number,
      phone_number: phone_number,
      CreatedBy:CreatedBy,
    });
    res.status(201).json({ msg: "Faculty created Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateFaculty = async (req, res) => {
  const Facultys = await Faculty.findOne({
    where: {
      id: req.params.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!Facultys) {
    return res.status(404).json({ msg: "Faculty not found" });
  }

  const { faculty_id, department, office_number, phone_number, UpdatedBy } = req.body;

  try {
    await Faculty.update(
      {
        faculty_id: faculty_id,
        department: department,
        office_number: office_number,
        phone_number: phone_number,
        UpdatedBy:UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          faculty_id: Facultys.faculty_id,
        },
      }
    );
    res.status(200).json({ msg: "Faculty Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteFaculty = async (req, res) => {
    try {
      const Facultys = await Faculty.findOne({
        where: {
          faculty_id: req.params.faculty_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!Facultys) {
        return res.status(404).json({ msg: "Faculty not found" });
      }
  
      await Faculty.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), 
        },
        {
          where: {
            faculty_id: Facultys.faculty_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Faculty Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getFacultys,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getInActiveFaculty,
  ActivateFaculty,
  getFacultyByUserId
};
