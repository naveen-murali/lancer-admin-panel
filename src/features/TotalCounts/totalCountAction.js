import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminInfo } from '../Admin/adminSlice';
import { axiosConfig } from '../../utils/axios.util';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';

export const getAsyncCounts = createAsyncThunk(
    'totalCount/getAsyncCounts',
    async (_, { dispatch, getState }) => {
        try {
            dispatch(showLoading());
            const { adminInfo: { token } } = getAdminInfo(getState());

            const config = {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axiosConfig.get('/lancer/counts', config);
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