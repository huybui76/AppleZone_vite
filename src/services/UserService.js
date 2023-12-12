import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/user/login`, data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/user/signUp`, data)
    return res.data
}

export const getDetailsUser = async (id) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_BASE_URL_API}/user/getDetailsUser/${id}`
        // , 
        // {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
        ,)
    return res.data
}

export const deleteUser = async (id, data) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_BASE_URL_API}/user/deleteUser/${id}`, data
        // , {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
        ,)
    return res.data
}

export const getAllUser = async () => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_BASE_URL_API}/user/getAllUsers`
        // , {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
        ,)
    return res.data
}


export const refreshToken = async (refreshToken) => {

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/user/refreshToken`, {}
        // , {
        //     headers: {
        //         token: `Bearer ${refreshToken}`,
        //     }
        // }
    )
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/user/logout`)
    return res.data
}

export const updateUser = async (id, data) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_BASE_URL_API}/user/updateUser/${id}`, data
        // , {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
    )
    return res.data
}

export const deleteManyUser = async (data) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_BASE_URL_API}/user/deleteMany`, data
        // , {
        //     headers: {
        //         token: `Bearer ${access_token}`,
        //     }
        // }
    )
    return res.data
}