// model/FacultyModel.js
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../DatabaseConfig/Database.js');
const User = require('../model/UserModel.js'); 

const Faculty = db.define('Faculty', {
    faculty_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    department: {
        type: DataTypes.STRING(100)
    },
    office_number: {
        type: DataTypes.STRING(10)
    },
    phone_number: {
        type: DataTypes.STRING(15)
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    UpdatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    DeletedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    DateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    DateUpdated: {
        type: DataTypes.DATE,
        allowNull: true
    },
    DateDeleted: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true
});

User.hasOne(Faculty, { foreignKey: 'user_id' });
Faculty.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Faculty;
