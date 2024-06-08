const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { CreateBrand, getBrand, getAllBrand, updateBrand, deleteBrand } = require('../controllers/brandController')
const { addCategory, deleteCategory, getAllCategory, getCategory, updateCategory } = require('../controllers/categoryController')
const route = express.Router()
route.post('/add-brand', authMiddleware, CreateBrand)
route.get('/get-brand/:_id', getBrand)
route.get('/get-all-brand', getAllBrand)
route.put('/update-brand/:_id', authMiddleware, updateBrand)
route.delete('/delete-brand/:_id', authMiddleware, deleteBrand)





module.exports = route