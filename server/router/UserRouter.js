const express =require ('express')
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateTokenUser,
    deleteUser,
    getInActive,
    ActivateUser
} =require ("../Controller/UserController.js");
const{forgotPassword,resetPasswordToken} = require("../Controller/UserRestPass.js")


const { adminOnly, bothOnly, verifyToken} =require ('../middleware/AuthUser.js');

const router = express.Router()

router.post('/forgotPassword', verifyToken, adminOnly, forgotPassword)
router.post('/reset-password/:token', verifyToken,  resetPasswordToken)

router.get('/users',verifyToken,bothOnly, getUsers);
router.get('/userInActive',verifyToken, adminOnly,getInActive);
router.get('/users/:user_id', verifyToken, adminOnly, getUserById);
router.post('/users', createUser);
router.patch('/users/:user_id', verifyToken, adminOnly, updateUser);
router.patch('/update/:user_id', verifyToken, adminOnly,updateTokenUser);
router.patch('/activateUser/:user_id', verifyToken, adminOnly,ActivateUser);
router.delete('/users/:user_id', verifyToken, adminOnly, deleteUser);

module.exports= router;