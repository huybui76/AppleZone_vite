import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/getAllProducts?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/getAllProducts?limit=${limit}`)
    }
    return res.data
}
export const getProductsType = async (type, page, limit) =>{
    let res = {}
    if(type){
        res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/getAllProducts?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}
export const getCountProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/getCountProduct`)
    return res.data
}

export const getProductByType = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/getProductByType/${id}`)
    return res.data
}

export const getProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}
export const createProduct = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/product/createProduct`, data)
    return res.data
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/product/getProduct/${id}`)
    return res.data
}

export const updateProduct = async (id, data) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_BASE_URL_API}/product/updateProduct/${id}`, data
        // , {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
    )
    return res.data
}

export const deleteProduct = async (id) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_BASE_URL_API}/product/deleteProduc/${id}`
        // , {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
    )
    return res.data
}

export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_BASE_URL_API}/product/deleteMany`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

