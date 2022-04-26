import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../utils/axios.util';
import { getAdminInfo } from '../Admin/adminSlice';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';

export const getAsyncLancer = createAsyncThunk(
    'lancer/getAsyncLancer',
    async (_, { dispatch, getState }) => {
        try {
            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/lancer`, config);

            return data;
        } catch (err) {
            const message = err.response && err.response.data.message
                ? err.response.data.message
                : err.message;

            dispatch(showErrorAlert(message));
            throw new Error(message);
        }
    }
);

export const updateAsyncLancer = createAsyncThunk(
    'lancer/updateAsyncLancer',
    async (data, { dispatch, getState }) => {
        try {
            dispatch(showLoading());
            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axiosConfig.put(`/lancer`, data, config);
            dispatch(hideLoading());

            return true;
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
