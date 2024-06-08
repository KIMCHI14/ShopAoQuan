const express = require('express')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { addCategory, deleteCategory, getAllCategory, getCategory, updateCategory } = require('../controllers/categoryController')

const route = express.Router()

route.post('/add-category', authMiddleware, addCategory)
route.get('/get-category/:_id', getCategory)
route.get('/get-all-category', getAllCategory)
route.put('/update-category/:_id', authMiddleware, updateCategory)
route.delete('/delete-category/:_id', authMiddleware, deleteCategory)


module.exports = route