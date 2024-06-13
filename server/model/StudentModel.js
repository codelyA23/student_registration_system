const { Sequelize } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");
const User = require("../model/UserModel.js")
const Course = require("../model/CourseModel.js")

const { DataTypes } = Sequelize;

const Student = db.define('Students', {
    student_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: DataTypes.STRING(20)
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    address: {
        type: DataTypes.STRING(255)
    },
    city: {
        type: DataTypes.STRING(100)
    },
    state: {
        type: DataTypes.STRING(100)
    },
    zip_code: {
        type: DataTypes.STRING(20)
    },
    country: {
        type: DataTypes.STRING(100)
    },
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Course',
            key: 'course_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
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
}, {
   
    freezeTableName: true,
    timestamps: false 
});

User.hasOne(Student, { foreignKey: 'user_id' });
Course.hasMany(Student, { foreignKey: 'course_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
Student.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = Student;




