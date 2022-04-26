import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../utils/axios.util';
import { getAdminInfo } from '../Admin/adminSlice';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';
import { getTransactions } from './transactionSlice';

export const getAsyncTransactions = createAsyncThunk(
    'transactions/getAsyncTransactions',
    async (searchContent, { dispatch, getState }) => {
        try {
            const {
                page = 1,
                type = getTransactions(getState()).type || '',
                status = getTransactions(getState()).status || '',
                pageSize = getTransactions(getState()).pageSize || 10,
                sort = {
                    filed: '_id',
                    order: -1
                }
            } = searchContent;

            const { transactions } = getTransactions(getState());

            if (!transactions.length)
                dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                params: {
                    type, status, page, pageSize,
                    [`sort[${sort.filed}]`]: sort.order
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/transactions/admin`, config);
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

export const rejectAsyncTransaction = createAsyncThunk(
    'transactions/rejectAsyncTransaction',
    async (id, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { token } = getState().admin.adminInfo;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosConfig.patch(`/transactions/${id}/cancel`, {}, config);
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

export const approveWithdrawAsyncTransaction = createAsyncThunk(
    'transactions/approveWithdrawAsyncTransaction',
    async (id, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { token } = getState().admin.adminInfo;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosConfig.patch(`/transactions/${id}/withdraw`, {}, config);
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

export const approveRefundAsyncTransaction = createAsyncThunk(
    'transactions/approveRefundAsyncTransaction',
    async (id, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { token } = getState().admin.adminInfo;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosConfig.patch(`/transactions/${id}/refund`, {}, config);
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