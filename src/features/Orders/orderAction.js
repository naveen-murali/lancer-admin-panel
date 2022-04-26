import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../utils/axios.util';
import { getAdminInfo } from '../Admin/adminSlice';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';
import { getOrders } from './ordersSlice';

export const getAsyncOrders = createAsyncThunk(
    'orders/getAsyncOrders',
    async (searchContent, { dispatch, getState }) => {
        try {
            const {
                page = 1,
                status = getOrders(getState()).status || '',
                pageSize = getOrders(getState()).pageSize || 10,
                sort = {
                    filed: '_id',
                    order: -1
                }
            } = searchContent;

            const { orders } = getOrders(getState());

            if (!orders.length)
                dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                params: {
                    status, page, pageSize,
                    [`sort[${sort.filed}]`]: sort.order
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/orders/admin`, config);
            dispatch(hideLoading());

            return data;
        } catch (err) {
            dispatch(hideLoading());
            const message = err.response && err.response.data.message
                ? err.response.data.message
                : err.message;

            dispatch(showErrorAlert(message));
            throw new Error(message);
        }
    }
);