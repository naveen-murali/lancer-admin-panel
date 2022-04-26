import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from '../../utils/axios.util';
import { getAdminInfo } from '../Admin/adminSlice';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';


export const getAsyncMonthlyBarChartData = createAsyncThunk(
    'barChart/getAsyncBarChartData',
    async (_, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/orders/monthly`, config);
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


export const getAsyncWeeklyBarChartData = createAsyncThunk(
    'barChart/getAsyncWeeklyBarChartData',
    async (_, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/orders/weekly`, config);
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