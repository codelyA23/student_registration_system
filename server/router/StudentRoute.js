const express =require ('express')
const {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getInActiveStudent,
    ActivateStudent
} =require ("../Controller/StudentController.js");



const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/student',verifyToken,getStudents);
router.get('/studentInactive',verifyToken, adminOnly,getInActiveStudent);
router.get('/studentsById/:student_id', verifyToken, adminOnly, getStudentById);
router.post('/studentCreate', createStudent);
router.patch('/studentUpdate/:student_id', verifyToken, adminOnly, updateStudent);
router.patch('/studentActivate/:student_id', verifyToken, adminOnly,ActivateStudent);
router.delete('/studentDelete/:student_id', verifyToken, adminOnly, deleteStudent);

module.exports= router;