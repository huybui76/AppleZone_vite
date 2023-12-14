import axios from 'axios'
import { axiosJWT } from './UserService'

export const getAllProductType = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/productType`)
  return res.data
}

export const createProductType = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/productType`, data)
  return res.data
}

export const getDetailsProductType = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/productType/${id}`)
  return res.data
}


export const updateProductType = async (id, data) => {
  const res = await axiosJWT.put(`${import.meta.env.VITE_BASE_URL_API}/productType/${id}`, data, {

  })
  return res.data
}

export const deleteProductType = async (id) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_BASE_URL_API}/productType/${id}`, {

  })
  return res.data
}

