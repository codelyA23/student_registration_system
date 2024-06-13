const { Sequelize, DataTypes } = require("sequelize");
const db = require("../DatabaseConfig/Database.js");
const Course = require("../model/CourseModel.js");

const Module = db.define('Module', {
    module_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Course',
            key: 'course_id',
        },
    },
    module_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(20), 
        allowNull: false,
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

Course.hasMany(Module, { foreignKey: 'course_id' });
Module.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = Module;
