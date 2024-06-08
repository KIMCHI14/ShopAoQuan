const { genarateToken } = require('../config/jwtToken.js')
const { genarateRefreshToken } = require('../config/refreshToken.js')
const userModel = require('../models/userModel.js')
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cartModel = require('../models/cartModel.js');
const productModel = require('../models/productModel.js');
const orderModel = require('../models/orderModel.js');
const bcrypt = require('bcrypt')
// create user
const addUser = async (req, res) => {
    const { email } = req.body
    const exisitingUser = await userModel.findOne({ email }) // kiểm tra có email nào chưa 
    if (exisitingUser) {
        return res.status(500).send({
            success: true,
            message: 'Email này đã tồn tại' // nếu tìm thấy có tồn tại 
        })
    }
    try {
        const newUser = new userModel(req.body).save()
        res.status(201).send({
            newUser: req.body,
            success: true,
            message: "Create new user successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Create new User False",
            success: false,
            error: error
        })
    }
}

// login user
const loginUser = asyncHandle(async (req, res) => {
    const { email, password } = req.body

    const findUser = await userModel.findOne({ email })
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await genarateRefreshToken(findUser?._id) // tạo taoken trong 3 ngày
        const updateUser = await userModel.findByIdAndUpdate(findUser?._id, {
            refreshToken: refreshToken
        }, {
            new: true
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000 // thơi gian sống của cookie và có tên là refreshtoken (72 giờ)
        })
        res.status(201).send({
            success: true,
            message: "Login successfully",
            _id: findUser?._id,
            email: findUser?.email,
            name: findUser?.name,
            // mobile: findUser?.mobile,
            address: findUser?.address,
            role: findUser?.role,
            token: genarateToken(findUser?._id), // hiển thị ra token
        })
    } else {
        return res.status(500).send({
            success: true,
            message: 'please create new user, Invalid' // nếu tìm thấy có tồn tại 
        })
    }
})

// login admin
const loginAdmin = asyncHandle(async (req, res) => {
    const { email, password } = req.body
    const findAdmin = await userModel.findOne({ email })
    if (findAdmin.role !== 'admin') {
        return res.status(500).send({
            success: false,
            message: 'not authorised' // nếu tìm thấy có tồn tại 
        })
    }
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await genarateRefreshToken(findAdmin?._id)
        const updateUser = await userModel.findByIdAndUpdate(findAdmin?._id, {
            refreshToken: refreshToken
        }, {
            new: true
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.status(201).send({
            success: true,
            message: "Login successfully",
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            role: findAdmin?.role,
            token: genarateToken(findAdmin?._id), // hiển thị ra token
        })
    } else {
        return res.status(500).send({
            success: true,
            message: 'please create new user, Invalid' // nếu tìm thấy có tồn tại 
        })
    }
})

// handle refresh token 
const handleRefreshToken = asyncHandle(async (req, res) => {
    const cookie = req.cookies
    console.log(cookie)
    if (!cookie?.refreshToken) {
        res.send({
            success: false,
            message: "No refresh token in cookies"
        })
    }
    const refreshToken = cookie?.refreshToken
    console.log(refreshToken)
    const user = await userModel.findOne({ refreshToken })
    if (!user) {
        res.status(401).send({
            success: false,
            message: "No refresh token present in db or not matched",
            user
        })
    }
    jwt.verify(refreshToken, "SECRET", (err, decoded) => {
        if (err || user.id !== decoded.id) {
            res.status(401).send({
                success: false,
                message: "there is something wrong with refresh token"
            })
        }
        const accessToken = genarateToken(user.id)
        res.status(200).send({
            success: true,
            message: "refresh token success",
            accessToken
        })
    })
})

// logout func
const logout = asyncHandle(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.status(200).send({
            success: true,
            message: "clear cookies success"
        }); // forbidden
    }
    await userModel.findOneAndUpdate({ refreshToken }, {
        $set: { refreshToken: "" },
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.status(200).send({
        success: true,
        message: "clear cookies success"
    }); // forbidden
});

// get all users
const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find({})
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Get all users error !"
        })
    }
}

// get a user
const getsignUser = async (req, res) => {
    const { _id } = req.params
    try {
        const getUser = await userModel.findById(_id)
        res.status(200).json({
            success: true,
            message: "Get user successfully !",
            getUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Get user error !"
        })
    }
}

// update user
const updateUser = asyncHandle(async (req, res) => {
    const { _id } = req.params
    try {
        // Hash lại mật khẩu mới nếu có
        if (req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const user = await userModel.findByIdAndUpdate(_id, {
            name: req?.body?.name,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
            password: req?.body?.password,
        }, {
            new: true
        })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Update user error !"
        })
    }
})

// delete a user
const deletesignUser = async (req, res) => {
    const { _id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(_id)
        res.status(200).json({
            success: true,
            message: "delete user successfully !"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "delete user error !"
        })
    }
}
const updatePassword = asyncHandle(async (req, res) => {
    const { _id } = req.user
    const password = req.body.password
    validateMongooseDbId(_id)
    const user = await userModel.findById(_id)
    console.log(password)
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.status(200).send({
            success: true,
            message: "Update password success",
            updatedPassword
        });
    } else {
        res.status(200).send({
            success: true,
            message: "Update password ...",
            user
        });
    }
})

const resetPassword = asyncHandle(async (req, res) => {
    const { password } = req.body // được gửi ở request
    const { token } = req.params // lây token ở phía trên forgot pass
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })
    if (!user) {
        res.status(500).send({
            success: true,
            message: "Token expired, please try again later ",
        });
    }
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.status(200).send({
        success: true,
        message: "Token success",
        user
    });
})
// cart 
const userCart = asyncHandle(async (req, res) => {
    const { productId, size, quantity, price } = req.body;
    const { _id } = req.user;

    try {
        // Kiểm tra nếu sản phẩm cùng productId, userId và size có tồn tại hay không
        const existingCartItem = await cartModel.findOne({
            userId: _id,
            productId: productId,
            size: size
        });

        if (existingCartItem) {
            // Nếu tồn tại, cộng thêm số lượng và cập nhật giá (nếu cần)
            existingCartItem.quantity += quantity;
            existingCartItem.price = price; // Bạn có thể cập nhật hoặc giữ nguyên giá, tùy vào logic kinh doanh
            await existingCartItem.save();

            res.json({
                success: true,
                message: "Cart updated successfully",
                updatedCart: existingCartItem
            });
        } else {
            // Nếu không tồn tại, tạo mới mục trong giỏ hàng
            let newCart = await new cartModel({
                userId: _id,
                productId,
                quantity,
                price,
                size,
            }).save();

            res.json({
                success: true,
                message: "Cart created successfully",
                newCart
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Cart user error!"
        });
    }
});


// get user cart 
const getUserCart = asyncHandle(async (req, res) => {
    const { _id } = req.user
    try {
        const cart = await cartModel.find({ userId: _id })
            .populate("productId")
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "get cart user error !"
        })
    }
})

const updateCartLocal = async (req, res) => {
    const { _id } = req.user;
    const { cartItems } = req.body; // Nhận mảng các mục giỏ hàng từ req.body
    try {
        // Xóa tất cả các mục giỏ hàng hiện có của người dùng
        await cartModel.deleteMany({ userId: _id });
        // console.log(cartItems)
        // Thêm mới các mục giỏ hàng từ dữ liệu nhận được
        const newCartItems = await cartModel.create(cartItems.map(item => ({
            userId: _id,
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.price,
            size: item.size
        })));

        res.json({ success: true, message: "Successfully updated cart", newCartItems });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating product cart for user",
        });
    }
};

const removeProductCart = asyncHandle(async (req, res) => {
    const { _id } = req.user
    const { cartItemId } = req.params
    try {
        const deleteProductCart = await cartModel.deleteOne({ userId: _id, _id: cartItemId })
        res.json(deleteProductCart)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "delete product cart user error !"
        })
    }
})


const updateProductQuantityCart = asyncHandle(async (req, res) => {
    const { _id } = req.user
    const { cartItemId, newQuantity } = req.params
    try {
        const cartItem = await cartModel.findOne({ userId: _id, _id: cartItemId })
        cartItem.quantity = newQuantity
        cartItem.save()
        res.json(cartItem)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "delete product cart user error !"
        })
    }
})


const createOrder = asyncHandle(async (req, res) => {
    const { shippingInfo, orderItems, totalPrice } = req.body
    const { _id } = req.user
    console.log(shippingInfo, orderItems, totalPrice, _id)
    try {
        const order = await orderModel.create({
            shippingInfo, orderItems, totalPrice, orderStatus: "COMPLETED", user: _id
        })
        res.json({
            order,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "create order user error !"
        })
    }
})

const getMyOrder = asyncHandle(async (req, res) => {
    const { _id } = req.user
    try {
        const orders = await orderModel.find({ user: _id }).populate("orderItems.productId")
        res.json({
            orders
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "create order user error !"
        })
    }
})
const getAllOrder = async (req, res) => {
    try {
        //tìm kiếm id mà người dùng login 
        const orderUser = await orderModel.find().populate("user").populate("orderItems.productId")
        res.json(orderUser)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "get all order user error !"
        })
    }
}
const emptyCart = async (req, res) => {
    const { _id } = req.user
    try {
        //tìm kiếm id mà người dùng login 
        const user = await userModel.findOne({ _id })
        const cart = await cartModel.deleteMany({ userId: user._id })
        res.json(cart)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "emptyCart user error !"
        })
    }
}



module.exports = {
    addUser, loginUser, getAllUsers, getsignUser, deletesignUser
    , updateUser, handleRefreshToken, logout, updatePassword
    , resetPassword, loginAdmin, userCart,
    getUserCart, removeProductCart, updateProductQuantityCart, createOrder, getMyOrder,
    getAllOrder, emptyCart, updateCartLocal
}