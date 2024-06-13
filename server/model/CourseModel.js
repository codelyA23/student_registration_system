const { Sequelize, DataTypes } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");

const Course = db.define('Course', {
    course_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    course_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    course_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    credits: {
        type: DataTypes.INTEGER,
    },
    availability: {
        type: DataTypes.STRING(50),
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
});



module.exports = Course;
