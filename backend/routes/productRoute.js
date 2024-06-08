const express = require('express')
const { createProduct, getaProduct, getAllProduct, updateProduct,
    deleteProduct, addToWishlist, rating,
    getSlugProduct,
    searchProductController } =
    require('../controllers/productController')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { uploadPhoto, productImgResize, } = require('../middlewares/uploadImg')
const { saveAddress } = require('../controllers/userController')
const route = express.Router()

route.post('/add-product', authMiddleware, createProduct)
route.get('/get-product/:id', getaProduct)
route.get('/search/:keyword', searchProductController)
route.get('/get-slug-product/:slug', getSlugProduct)
route.get('/getall-product', getAllProduct)
route.post('/rating', authMiddleware, rating)

// upload ảnh 
route.put('/wishlist', authMiddleware, addToWishlist)

route.put('/update-product/:_id', authMiddleware, updateProduct)
route.delete('/delete-product/:_id', authMiddleware, deleteProduct)

module.exports = route