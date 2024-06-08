import axios from 'axios'
import {base_url} from '../../utils/base_url'
const getTokenFromLocalStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null

const config = {
    headers: {
        Authorization : `Bearer ${getTokenFromLocalStorage?.token}`,
        Accept : "application/json",
    }
}
// Định nghĩa hàm login trong authService:
const login = async(userData)=>{
    // nhan url ben backend
    const res = await axios.post(`${base_url}auth/admin-login`,userData) // nhận được value từ user data
    const data = res.data
    // login thành công sẽ làm gì ?
    if(data){
        localStorage.setItem('user',JSON.stringify(data))
    }
    return data
}

const getOrders = async()=>{
    const res = await axios.get(`${base_url}auth/getmyorders`,config)
    return res.data
}

const getOrderById = async(id)=>{
    const res = await axios.post(`${base_url}auth/get-orders-id/${id}`,"",config)
    return res.data
}

const getAllOrder = async()=>{
    const res = await axios.get(`${base_url}auth/get-all-orders`,config)
    return res.data
}
// Xuất hàm login và tạo đối tượng authService:


const authService ={
    login,
    getOrders,getOrderById,getAllOrder
}

export default authService