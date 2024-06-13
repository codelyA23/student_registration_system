const User = require("../model/UserModel.js");
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
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


// get inactive users
const getInActive = async (req, res) => {
    try {
      const response = await User.findAll({
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



//   activate users
const ActivateUser = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
          Active: false,
          Deleted: true,
        },
      });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found or not eligible for reactivation" });
      }
      await User.update(
        {
          Active: true,
          Deleted: false,
          DateDeleted: null, 
        },
        {
          where: {
            id: user.id,
          },
        }
      );
  
      res.status(200).json({ msg: "User Reactivated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  

const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        user_id: req.params.user_id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
        return res.status(404).json({ msg: "User not found" });
      }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, first_name, last_name, email, password,confPassword, role,CreatedBy } =
    req.body;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({
        msg: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and symbols",
      });
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });

  const hashedPass = bcrypt.hashSync(password, 10);

  // const createdBy = req.user.userName
  try {
    await User.create({
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPass,
      role: role,
      CreatedBy:CreatedBy,
    });
    res.status(201).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      user_id: req.params.user_id,
      Active: true,
      Deleted: false,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const { username, first_name, last_name, email, role,UpdatedBy } = req.body;

  try {
    await User.update(
      {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        UpdatedBy:UpdatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateTokenUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      token: req.params.user_id,
      token: req.params.token,
    },
  });
  const { password, confPassword } = req.body;
  let hashedPass;
  if (password === "" || password === null) {
    hashedPass = user.password;
  } else {
    hashedPass = bcrypt.hashSync(password, 10);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  try {
    await User.update(
      {
        password: hashedPass,
      },
      {
        where: {
          token: req.params.user_id,
          token: req.params.token,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const deleteUser = async (req, res) => {
    try {
      // Find the user by ID and ensure they are active and not deleted
      const user = await User.findOne({
        where: {
          user_id: req.params.user_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Update the user to mark them as deleted
      await User.update(
        {
          Active: false,
          Deleted: true,
          DateDeleted: new Date(), // Set the current date and time
        },
        {
          where: {
            user_id: user.user_id,
          },
        }
      );
  
      res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateTokenUser,
  deleteUser,
  getInActive,
  ActivateUser
};
