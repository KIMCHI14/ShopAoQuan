const express = require('express')
const router = express.Router()
const { loginUser, getAllUsers, getsignUser, deletesignUser, updateUser,
     handleRefreshToken, logout, updatePassword,
     resetPassword, loginAdmin, userCart,
     getUserCart, createOrder, removeProductCart, updateProductQuantityCart, getMyOrder,
     getAllOrder,
     emptyCart,
     addUser,
     updateCartLocal } = require('../controllers/userController.js')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware.js')

router.post('/register', addUser)
router.post('/login', loginUser)
router.post('/admin-login', loginAdmin)
router.post('/cart/create-order', authMiddleware, createOrder)
router.post('/cart', authMiddleware, userCart)
router.post('/updatelocal-cart', authMiddleware, updateCartLocal);
// router.post('/forgot-password-token',forgotPasswordToken)
// create cart


router.put('/update-cart/:cartItemId/:newQuantity', authMiddleware, updateProductQuantityCart)
router.put('/update-user/:_id', authMiddleware, updateUser)
router.put('/reset-password/:token', resetPassword)
router.put('/password', authMiddleware, updatePassword)


router.get('/get-cart', authMiddleware, getUserCart)
router.get('/all-user', getAllUsers)
router.get('/get-user/:_id', authMiddleware, isAdmin, getsignUser)
router.get("/refresh", handleRefreshToken);
router.get('/getmyorders', authMiddleware, getMyOrder)
router.get('/get-all-orders', authMiddleware, isAdmin, getAllOrder)
router.get("/logout", logout);

// router.post('/get-orders-id/:id',authMiddleware,isAdmin,getOrderById)
// router.put('/order/update-order/:id',authMiddleware,isAdmin,updateOrderStatus)

router.delete('/delete-user/:_id', deletesignUser)
router.delete('/empty-cart', authMiddleware, emptyCart)
router.delete('/delete-cart/:cartItemId', authMiddleware, removeProductCart)


module.exports = router
