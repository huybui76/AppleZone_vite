import { axiosJWT } from './UserService'

export const createOrder = async (data) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_BASE_URL_API}/order`,
    data,
    {}
  )
  return res.data
}


export const getOrderByPhone = async (id) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_BASE_URL_API}/order/phone/${id}`,
    {}
  )
  return res.data
}

export const getDetailsOrder = async (id) => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_BASE_URL_API}/order/${id}`,
    {}
  )
  return res.data
}

export const cancelOrder = async (id, orderItems) => {
  const data = { orderItems }
  const res = await axiosJWT.delete(
    `${import.meta.env.VITE_BASE_URL_API}/order/${id}`,
    { data },
    {}
  )
  return res.data
}

export const getAllOrder = async () => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_BASE_URL_API}/order`,
    {}
  )
  return res.data
}
