import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from '../../utils/axios.util';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';
import { getAdminInfo } from "../Admin/adminSlice";
import { getServices } from './servicesSlices';

export const getAsyncServices = createAsyncThunk(
    'services/getAsyncServices',
    async (searchContent, { dispatch, getState }) => {
        try {
            const {
                search = '',
                page = 1,
                pageSize = getServices(getState()).pageSize || 10,
                sort = {
                    filed: '_id',
                    order: -1
                }
            } = searchContent;
            const { services } = getServices(getState());
            if (!services.length)
                dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                params: {
                    search, page, pageSize,
                    [`sort[${sort.filed}]`]: sort.order
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/services/admin`, config);
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

export const getAsyncServiceDetails = createAsyncThunk(
    'services/getAsyncServicesDetails',
    async (id, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axiosConfig.get(`/services/${id}/admin`, config);
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

export const getAsyncServiceReviews = createAsyncThunk(
    'services/getAsyncServiceReviews',
    async (id) => {
        try {
            const { data } = await axiosConfig.get(`/services/${id}/reviews`);

            return data.reviews || [];
        } catch (err) {
            const message = err.response && err.response.data.message
                ? err.response.data.message
                : err.message;

            throw new Error(message);
        }
    }
);

export const getAsyncBlockService = createAsyncThunk(
    'services/getAsyncBlockService',
    async (id, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axiosConfig.patch(`/services/${id}/block`, {}, config);
            dispatch(hideLoading());

            return id;
        } catch (err) {
            dispatch(hideLoading());
            const message = err.response && err.response.data.message
                ? err.response.data.message
                : err.message;

            throw new Error(message);
        }
    }
);

export const getAsyncUnblockService = createAsyncThunk(
    'services/getAsyncUnlockService',
    async (id, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { adminInfo: { token } } = getAdminInfo(getState());
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axiosConfig.patch(`/services/${id}/unblock`, {}, config);

            dispatch(hideLoading());
            return id;
        } catch (err) {
            dispatch(hideLoading());
            const message = err.response && err.response.data.message
                ? err.response.data.message
                : err.message;

            throw new Error(message);
        }
    }
);