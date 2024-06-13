const express =require ('express')
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getInActiveCourse,
    ActivateCourse
} =require ("../Controller/CourseController.js");



const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/courses',verifyToken, adminOnly,getCourses);
router.get('/coursesInactive',verifyToken, adminOnly,getInActiveCourse);
router.get('/coursessById/:course_id', verifyToken, adminOnly, getCourseById);
router.post('/coursesCreate', createCourse);
router.patch('/coursesUpdate/:course_id', verifyToken, adminOnly, updateCourse);
router.patch('/coursesActivate/:course_id', verifyToken, adminOnly,ActivateCourse);
router.delete('/coursesDelete/:course_id', verifyToken, adminOnly, deleteCourse);

module.exports= router;