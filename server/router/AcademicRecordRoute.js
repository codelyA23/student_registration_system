const express =require ('express')
const {
  getAcademicRecords,
  getAcademicRecordById,
  createAcademicRecord,
  updateAcademicRecord,
  deleteAcademicRecord,
  getInActiveAcademicRecord,
  ActivateAcademicRecord
} =require ("../Controller/AcademicRecordController.js");



const { adminOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.get('/academicRecords',verifyToken, adminOnly,getAcademicRecords);
router.get('/academicRecordInactive',verifyToken, adminOnly,getInActiveAcademicRecord);
router.get('/academicRecordsById/:record_id', verifyToken, adminOnly, getAcademicRecordById);
router.post('/academicRecordCreate', createAcademicRecord);
router.patch('/academicRecordUpdate/:record_id', verifyToken, adminOnly, updateAcademicRecord);
router.patch('/academicRecordActivate/:record_id', verifyToken, adminOnly,ActivateAcademicRecord);
router.delete('/academicRecordDelete/:record_id', verifyToken, adminOnly, deleteAcademicRecord);

module.exports= router;