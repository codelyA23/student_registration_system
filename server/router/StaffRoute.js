const express =require ('express')
const {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getInActiveStaff,
  ActivateStaff
} =require ("../Controller/StaffController.js");



const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/staff',verifyToken, adminOnly,getStaffs);
router.get('/staffInactive',verifyToken, adminOnly,getInActiveStaff);
router.get('/staffsById/:id', verifyToken, adminOnly, getStaffById);
router.post('/staffCreate', createStaff);
router.patch('/staffUpdate/:id', verifyToken, adminOnly, updateStaff);
router.patch('/staffActivate/:id', verifyToken, adminOnly,ActivateStaff);
router.delete('/staffDelete/:id', verifyToken, adminOnly, deleteStaff);

module.exports= router;