import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    discount: 0,
    shippingAddress: {},
    shippingMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    phone: "",
    isSuccessOrder: false,
};

export const orderSlide = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const existingItemIndex = state.orderItems.findIndex(item => item.product === orderItem.product);

            if (existingItemIndex !== -1) {
                const existingItem = state.orderItems[existingItemIndex];

                if (existingItem.amount + orderItem.amount <= existingItem.countInStock) {
                    existingItem.amount += orderItem.amount;
                    state.isSuccessOrder = true;
                    state.isErrorOrder = false;
                } else {
                    state.isSuccessOrder = false;
                    state.isErrorOrder = true;
                    // Thực hiện xử lý khi số lượng vượt quá hàng tồn kho (optional)
                }
            } else {
                state.orderItems.push(orderItem);
                state.isSuccessOrder = true;
                state.isErrorOrder = false;
            }
        },

        resetOrder: (state) => {
            state.isSuccessOrder = false;
        },

        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find(item => item.product === idProduct);

            if (itemOrder) {
                itemOrder.amount++;
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find(item => item.product === idProduct);

            if (itemOrder && itemOrder.amount > 0) {
                itemOrder.amount--;
            }
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter(item => item.product !== idProduct);
        },
        removeAllOrderProduct: (state, action) => {
            const listChecked = action.payload;
            const updatedOrderItems = state.orderItems.filter((item) => !listChecked.includes(item.product));
            state.orderItems = updatedOrderItems;

        },



    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    resetOrder,
    removeAllOrderProduct,
} = orderSlide.actions;

export default orderSlide.reducer;
