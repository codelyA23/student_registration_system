const { Sequelize } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");
const Course = require("../model/CourseModel.js");
const Student = require("../model/StudentModel.js")
const { DataTypes } = Sequelize;

const Enrollment = db.define('enrollment', {
    enrollment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Student,
            key: 'student_id',
        },
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'course_id',
        },
    },
    enrollment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
  },
  Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
  },
  CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  UpdatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  DeletedBy: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
  },
  DateUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  DateDeleted: {
      type: DataTypes.DATE,
      allowNull: true,
  },
    },
    {
      freezeTableName: true,
    }

);

Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });
Student.hasMany(Enrollment, { foreignKey: 'student_id' });
Enrollment.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = Enrollment;