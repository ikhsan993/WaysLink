const express = require('express');
const router = express.Router()

const {auth} = require('../middlewares/auth');
const {uploadFile}  = require('../middlewares/uploadFile')

const {register,login,checkAuth} = require('../controllers/auth')
const {addLink,getLink,deleteLink,updateLink} = require ('../controllers/link');
const {getBrand,deleteBrand} = require ('../controllers/brand');
const {getProfile,updateProfile,deleteUser} = require ('../controllers/profile');

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

router.get('/profile', auth, getProfile)
router.patch('/profile', auth, updateProfile)
router.delete('/profile/:id', auth, deleteUser)

router.post('/link',auth,uploadFile('thumbnail'), addLink)
router.patch('/link/:id',auth,uploadFile('thumbnail'), updateLink)
router.delete('/link',auth, deleteLink)
router.get('/link/:id',auth, getLink)

router.get('/brands', auth, getBrand)
router.delete('/brand/:id', auth, deleteBrand)

module.exports = router;