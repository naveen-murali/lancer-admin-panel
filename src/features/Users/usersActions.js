import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosConfig } from '../../utils/axios.util';
import { hideLoading, showLoading } from '../Loading/loadingSlice';
import { showErrorAlert } from '../MainAlert/mainAlertSlice';

export const getAsyncUsers = createAsyncThunk(
    "users/getAsyncUsers",
    async (searchContent, { dispatch, getState }) => {
        try {
            const {
                search = '',
                page = 1,
                pageSize = getState().users.users.pageSize || 10,
                sort = {
                    filed: '_id',
                    order: -1
                }
            } = searchContent;

            const { users } = getState().users.users;
            if (!users.length)
                dispatch(showLoading());

            const { token } = getState().admin.adminInfo;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosConfig.get(`/users?search=${search}&page=${page}&pageSize=${pageSize}&sort[${sort.field}]=${sort.order}`, config);
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

export const blockAsyncUser = createAsyncThunk(
    "users/blockAsyncUsers",
    async (userId, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { token } = getState().admin.adminInfo;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axiosConfig.patch(`/users/${userId}/block`, {}, config);
            dispatch(hideLoading());

            return userId;
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

export const unblockAsyncUser = createAsyncThunk(
    "users/unblockAsyncUsers",
    async (userId, { dispatch, getState }) => {
        try {
            dispatch(showLoading());

            const { token } = getState().admin.adminInfo;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axiosConfig.patch(`/users/${userId}/unblock`, {}, config);
            dispatch(hideLoading());

            return userId;
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