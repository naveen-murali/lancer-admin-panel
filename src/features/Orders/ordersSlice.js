import { createSlice } from '@reduxjs/toolkit';
import { getAsyncOrders } from './orderAction';

const initialState = {
    orders: {
        loading: false,
        orders: [],
        error: ""
    }
};

const orderslice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncOrders.pending, (state) => {
                state.orders.loading = true;
            })
            .addCase(getAsyncOrders.fulfilled, (state, { payload }) => {
                state.orders = {
                    ...state.orders,
                    loading: false,
                    ...payload
                };
            })
            .addCase(getAsyncOrders.rejected, (state, { error }) => {
                state.orders.error = error.message;
                state.orders.loading = false;
            });
    }
});

export const ordersReducers = orderslice.reducer;
export const getOrders = (state) => state.orders.orders;