import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authService from './authService'
// Khởi tạo giá trị ban đầu của user:
// Nếu giá trị tồn tại (khác null hoặc undefined), thì JSON.parse được sử dụng để chuyển đổi chuỗi JSON thành đối tượng JavaScript
const getUserFromsessionStorage = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
// Khởi tạo trạng thái ban đầu cho Redux store:
const initialState = {
    user:getUserFromsessionStorage,
    orders:[],
    isError : false,
    isLoading:false,
    isSeccess:false,
    orders:[],
    message:""
}

//Định nghĩa action login bằng createAsyncThunk:
export const login = createAsyncThunk('auth/admin-login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user) // gọi tới login trong authservice
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrder = createAsyncThunk('order/get-orders',async(thunkAPI)=>{
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrderById = createAsyncThunk('order/get-order',async(id,thunkAPI)=>{
    try {
        return await authService.getOrderById(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAllOrder = createAsyncThunk('auth/all-order',async(thunkAPI)=>{
    try {
        return await authService.getAllOrder() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

/**
 *  Tạo slice của Redux store bằng createSlice:
 *      login.pending: Action được kích hoạt khi thao tác đăng nhập bắt đầu.
        login.fulfilled: Action được kích hoạt khi thao tác đăng nhập thành công.
        login.rejected: Action được kích hoạt khi thao tác đăng nhập bị từ chối hoặc gặp lỗi.
 */
export const authSlice = createSlice({
    name:"auth", 
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSeccess = true
            state.user= action.payload
            state.message = "Login success"
            if(state.isSeccess){
                toast.success("Đăng nhập thành công 😁")
            }
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSeccess = false
            state.user= null
            state.message = "Rejected"
        })
        builder.addCase(getAllOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSeccess = true
            state.orders= action.payload
            state.message = "getAllOrder success"
        })
        .addCase(getAllOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSeccess = false
            state.orders= null
            state.message = "Rejected"
        })
        // order action
        .addCase(getOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSeccess = true
            state.orders= action.payload
            state.message = "get Order success"
        })
        .addCase(getOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSeccess = false
            state.orders= null
            state.message = "Rejected"
        })


        // order action
        .addCase(getOrderById.pending, (state) => {
            state.isLoading = true;
        })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSeccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSeccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
    }
})

export default authSlice.reducer