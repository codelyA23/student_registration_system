const Module = require("../model/ModuleModel.js");
const Course = require("../model/CourseModel.js");
const Sequelize = require('sequelize');

const createModule = async (req, res) => {
    const { course_id, module_name, description, start_date, end_date, status } = req.body;

    try {
        const newModule = await Module.create({
            course_id,
            module_name,
            description,
            start_date,
            end_date,
            status,
        });
        res.status(201).json({ msg: "Module created successfully", module: newModule });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getModules = async (req, res) => {
    try {
        const modules = await Module.findAll({
            where:{
                Active: true,
                Deleted: false,
              },
            order: [["start_date", "ASC"]],
            include: [
                {
                  model: Course,
                  where:{
                    Active: true,
                    Deleted: false,
                  }
                },
              ],
        });
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const getModuleById = async (req, res) => {
    try {
      const response = await Module.findOne({
        where: {
          module_id: req.params.module_id,
          Active: true,
          Deleted: false,
        },
      });
  
      if (!response) {
          return res.status(404).json({ msg: "Module not found" });
        }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

const updateModule = async (req, res) => {
    const { course_id,module_name, description, start_date, end_date, status } = req.body;

    try {
        const module = await Module.findOne({
            where: { module_id: req.params.id },
        });

        if (!module) {
            return res.status(404).json({ msg: "Module not found" });
        }

        await Module.update(
            {
                course_id,
                module_name,
                description,
                start_date,
                end_date,
                status,
            },
            {
                where: { module_id: req.params.module_id },
            }
        );

        res.status(200).json({ msg: "Module updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteModule = async (req, res) => {
    try {
        const module = await Module.findOne({
            where: { module_id: req.params.module_id },
        });

        if (!module) {
            return res.status(404).json({ msg: "Module not found" });
        }

        await Module.destroy({
            where: { module_id: req.params.module_id },
        });

        res.status(200).json({ msg: "Module deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = {
    createModule,
    getModules,
    updateModule,
    deleteModule,
    getModuleById
};
