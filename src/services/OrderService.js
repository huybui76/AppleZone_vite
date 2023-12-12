import { axiosJWT } from "./UserService";

export const createOrder = async (data) => {
    const res = await axiosJWT.post(
        `${import.meta.env.VITE_BASE_URL_API}/order/create-order`,
        data,
        {}
    );
    return res.data;
};


export const getOrderByPhone = async (id) => {
    const res = await axiosJWT.get(
        `${import.meta.env.VITE_BASE_URL_API}/order/get-order-by-phone/${id}`,
        {}
    );
    return res.data;
};

export const getDetailsOrder = async (id) => {
    const res = await axiosJWT.get(
        `${import.meta.env.VITE_BASE_URL_API}/order/get-details-order/${id}`,
        {}
    );
    return res.data;
};

export const cancelOrder = async (id, orderItems, userId) => {
    const data = { orderItems };
    const res = await axiosJWT.delete(
        `${import.meta.env.VITE_BASE_URL_API}/order/cancel-order/${id}`,
        { data },
        {}
    );
    return res.data;
};

export const getAllOrder = async () => {
    const res = await axiosJWT.get(
        `${import.meta.env.VITE_BASE_URL_API}/order/get-all-order`,
        {}
    );
    return res.data;
};
