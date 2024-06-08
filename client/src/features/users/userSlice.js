import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify"
const getTokenFromLocalStorage = sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user'))
    : null


export const register = createAsyncThunk("auth/register", async (userData, thunkApi) => {
    try {
        return await authService.registerUser(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const login = createAsyncThunk("auth/login", async (userData, thunkApi) => {
    try {
        return await authService.loginUser(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const cart = createAsyncThunk("auth/add-cart", async (cartData, thunkApi) => {
    try {
        return await authService.addToCart(cartData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getCart = createAsyncThunk("auth/get-cart", async (thunkApi) => {
    try {
        return await authService.getCart()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const deletePrCart = createAsyncThunk("auth/delete-cart", async (cartItemId, thunkApi) => {
    try {
        return await authService.removeProductCart(cartItemId)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const updateQuantity = createAsyncThunk("auth/update-cart", async (cartDetail, thunkApi) => {
    try {
        return await authService.updateProductCart(cartDetail)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const udCartLocal = createAsyncThunk("auth/update-cart-local", async (cartItems, thunkApi) => {
    try {
        return await authService.updateCart(cartItems)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const emptycart = createAsyncThunk("auth/empth-cart", async (thunkApi) => {
    try {
        return await authService.empty()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const getMyorder = createAsyncThunk("auth/get-order", async (cartData, thunkApi) => {
    try {
        return await authService.getOrder()
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

const initialState = {
    user: getTokenFromLocalStorage,
    loginUser: "",
    ToCart: "",
    myOrder: "",
    cartUser: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload
                if (state.isSuccess === true) {
                    toast.info("Đăng ký thành công")
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Đăng ký thất bại")
                }
            })

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loginUser = action.payload
                if (state.isSuccess === true) {
                    toast.info("Đăng nhập thành công")
                    sessionStorage.setItem('user', JSON.stringify(action.payload))
                    sessionStorage.setItem('token', JSON.stringify(action.payload.token))
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Đăng nhập thất bại")
                }
            })




        builder.addCase(cart.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(cart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ToCart = action.payload
                if (state.isSuccess) {
                    toast.success("Đã thêm vào giỏ hàng")
                }
            })
            .addCase(cart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })

        builder.addCase(getCart.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartUser = action.payload
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
        builder.addCase(deletePrCart.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deletePrCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.delCart = action.payload
            })
            .addCase(deletePrCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Something went wrong !")
                }
            })
        builder.addCase(updateQuantity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.udCart = action.payload
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })


        builder.addCase(udCartLocal.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(udCartLocal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.udCartLocal = action.payload
                if (state.isSuccess) {
                    localStorage.removeItem("carts");
                }
            })
            .addCase(udCartLocal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
        builder.addCase(emptycart.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(emptycart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.empt = action.payload
            })
            .addCase(emptycart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
        builder.addCase(getMyorder.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getMyorder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.myOrder = action.payload
            })
            .addCase(getMyorder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error
            })
            .addCase(resetState, () => initialState);

    }
})

export default authSlice.reducer