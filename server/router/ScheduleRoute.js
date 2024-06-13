const express = require('express');
const router = express.Router();
const {  
    createSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule, } = require('../Controller/ScheduleController.js');

router.post('/schedules', createSchedule);
router.get('/allSchedules', getSchedules);
router.get('/schedules/:schedule_id', getScheduleById);
router.put('/scheduleUpdate/:schedule_id', updateSchedule);
router.delete('/scheduleDelete/:schedule_id', deleteSchedule);

module.exports = router;
