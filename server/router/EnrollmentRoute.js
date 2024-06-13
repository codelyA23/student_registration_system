const express =require ('express')
const {
    getEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getInActiveEnrollment,
    ActivateEnrollment
} =require ("../Controller/EnrollmentController.js");



const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/enrollment',verifyToken, adminOnly,getEnrollments);
router.get('/enrollmentInactive',verifyToken, adminOnly,getInActiveEnrollment);
router.get('/enrollmentsById/:enrollment_id', verifyToken, adminOnly, getEnrollmentById);
router.post('/enrollmentCreate', createEnrollment);
router.patch('/enrollmentUpdate/:enrollment_id', verifyToken, adminOnly, updateEnrollment);
router.patch('/enrollmentActivate/:enrollment_id', verifyToken, adminOnly,ActivateEnrollment);
router.delete('/enrollmentDelete/:enrollment_id', verifyToken, adminOnly, deleteEnrollment);

module.exports= router;