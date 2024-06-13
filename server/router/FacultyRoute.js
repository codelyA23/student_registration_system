const express =require ('express')
const {
    getFacultys,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getInActiveFaculty,
    ActivateFaculty,
    getFacultyByUserId
} =require ("../Controller/FacultyController.js");



const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/faculty',verifyToken, adminOnly,getFacultys);
router.get('/faculty/:userId',verifyToken,getFacultyByUserId);
router.get('/facultyInactive',verifyToken, adminOnly,getInActiveFaculty);
router.get('/facultysById/:faculty_id', verifyToken, adminOnly, getFacultyById);
router.post('/facultyCreate', createFaculty);
router.patch('/facultyUpdate/:faculty_id', verifyToken, adminOnly, updateFaculty);
router.patch('/facultyActivate/:faculty_id', verifyToken, adminOnly,ActivateFaculty);
router.delete('/facultyDelete/:faculty_id', verifyToken, adminOnly, deleteFaculty);

module.exports= router;