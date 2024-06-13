const express = require('express');
const router = express.Router();
const {
    createModule,
    getModules,
    updateModule,
    deleteModule,
    getModuleById
} = require('../Controller/ModuleController');

router.post('/modules', createModule);
router.get('/allModules', getModules);
router.get('/moduleById/:module_id', getModuleById);
router.put('/modulesUpdate/:module_id', updateModule);
router.delete('/modulesDelete/:module_id', deleteModule);

module.exports = router;
