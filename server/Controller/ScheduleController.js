const Schedule = require("../model/ScheduleModel.js");
const Course = require("../model/CourseModel.js")
const Module = require("../model/ModuleModel.js")

const createSchedule = async (req, res) => {
    const { course_id, module_id, day_of_week, start_time, end_time, location,CreatedBy } = req.body;

    try {
        const newSchedule = await Schedule.create({
            course_id,
            module_id,
            day_of_week,
            start_time,
            end_time,
            location,
            CreatedBy
        });
        res.status(201).json({ msg: "Schedule created successfully", schedule: newSchedule });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll({
            where: {
                Active: true,
                Deleted: false,
              },
            order: [["day_of_week", "ASC"], ["start_time", "ASC"]],
            include: [
                {
                  model: Course,
                  where:{
                    Active: true,
                    Deleted: false,
                  }
                },
              ],
              include: [
                {
                  model: Module,
                  where:{
                    Active: true,
                    Deleted: false,
                  }
                },
              ],
        });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getScheduleById = async (req, res) => {
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

const updateSchedule = async (req, res) => {
    const { day_of_week, start_time, end_time, location, course_id, module_id, } = req.body;

    try {
        const schedule = await Schedule.findOne({
            where: { schedule_id: req.params.id },
        });

        if (!schedule) {
            return res.status(404).json({ msg: "Schedule not found" });
        }

        await Schedule.update(
            {
                course_id,
                module_id,
                day_of_week,
                start_time,
                end_time,
                location,
            },
            {
                where: { schedule_id: req.params.schedule_id },
            }
        );

        res.status(200).json({ msg: "Schedule updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findOne({
            where: { schedule_id: req.params.schedule_id },
        });

        if (!schedule) {
            return res.status(404).json({ msg: "Schedule not found" });
        }

        await Schedule.destroy({
            where: { schedule_id: req.params.id },
        });

        res.status(200).json({ msg: "Schedule deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = {
    createSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
};
