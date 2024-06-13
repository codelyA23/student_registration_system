const User = require("../model/UserModel.js")
const Staff = require("../model/StaffModel.js")
const Sequelize = require('sequelize');


const getStaffs = async (req, res) => {
  try {
    const response = await Staff.findAll({
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

// get inactive Staffs
const getInActiveStaff = async (req, res) => {
    try {
      const response = await Staff.findAll({
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

//   activate Staffs
const ActivateStaff = async (req, res) => {
    try {
      const Staffs = await Staff.findOne({
        where: {
          id: req.params.id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!Staffs) {
        return res.status(404).json({ msg: "Staff not found" });
      }
      await Staff.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            staff_id: Staffs.staff_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Staff Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


const getStaffById = async (req, res) => {
  try {
    const response = await Staff.findOne({
      where: {
        staff_id: req.params.staff_id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
        return res.status(404).json({ msg: "Staff not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createStaff = async (req, res) => {
  const { user_id, department, position, CreatedBy } = req.body;

  try {
    await Staff.create({
      user_id: user_id,
      department: department,
      position: position,
      CreatedBy:CreatedBy,
    });
    res.status(201).json({ msg: "Staff created Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateStaff = async (req, res) => {
  const Staffs = await Staff.findOne({
    where: {
      staff_id: req.params.staff_id,
      Active: true,
      Deleted: false,
    },
  });

  if (!Staffs) {
    return res.status(404).json({ msg: "Staff not found" });
  }

  const { user_id, department, position, UpdatedBy } = req.body;

  try {
    await Staff.update(
      {
        user_id: user_id,
        department: department,
        position: position,
        UpdatedBy:UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          staff_id: Staffs.staff_id,
        },
      }
    );
    res.status(200).json({ msg: "Staff Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteStaff = async (req, res) => {
    try {
      const Staffs = await Staff.findOne({
        where: {
          staff_id: req.params.staff_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!Staffs) {
        return res.status(404).json({ msg: "Staff not found" });
      }
  
      await Staff.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), 
        },
        {
          where: {
            staff_id: Staffs.staff_id,
          },
        }
      );
  
      res.status(200).json({ msg: "Staff Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getInActiveStaff,
  ActivateStaff
};
