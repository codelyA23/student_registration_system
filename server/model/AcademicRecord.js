const { Sequelize } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");
const Student = require("../model/StudentModel.js")
const Course = require("../model/CourseModel.js")
const { DataTypes } = Sequelize;

const AcademicRecord = db.define('academicrecord', {
    record_id: {
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
    grade: {
        type: DataTypes.STRING(2),
    },
    term: {
        type: DataTypes.STRING(20),
    },
    year: {
        type: DataTypes.INTEGER,
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

Course.hasMany(AcademicRecord, { foreignKey: 'course_id' });
AcademicRecord.belongsTo(Course, { foreignKey: 'course_id' });
Student.hasMany(AcademicRecord, { foreignKey: 'student_id' });
AcademicRecord.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = AcademicRecord;