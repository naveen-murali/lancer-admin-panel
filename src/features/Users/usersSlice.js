import { createSlice } from '@reduxjs/toolkit';
import { blockAsyncUser, getAsyncUserDetails, getAsyncUserOrders, getAsyncUsers, unblockAsyncUser } from './usersActions';

const initialState = {
    users: {
        users: [],
        loading: false,
        error: ''
    },
    blockUser: {
        loading: false,
        success: false,
        error: ''
    },
    userDetails: {
        loading: false,
        user: null,
        error: ""
    },
    userOrders: {
        loading: false,
        orders: [],
        error: ""
    }
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetUserDetailsAndOrders: (state) => ({
            ...state,
            userDetails: initialState.userDetails,
            userOrders: initialState.userOrders
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncUsers.pending, (state) => {
                state.users = {
                    ...state.users,
                    loading: true
                };
            })
            .addCase(getAsyncUsers.fulfilled, (state, { payload }) => {
                state.users = {
                    ...state.users,
                    loading: false,
                    ...payload
                };
            })
            .addCase(getAsyncUsers.rejected, (state, { error }) => {
                state.users = {
                    ...state.users,
                    loading: false,
                    error: error.message
                };
            })

            .addCase(blockAsyncUser.pending, (state) => {
                state.blockUser = { loading: true, success: false };
            })
            .addCase(blockAsyncUser.fulfilled, (state, { payload }) => {
                const users = state.users.users;

                state.users = {
                    ...state.users,
                    users: users.map(user => ({
                        ...user, isBlocked: user._id === payload ? true : user.isBlocked
                    }))
                };
                state.blockUser = {
                    ...state.blockUser,
                    loading: false,
                    success: true
                };
            })
            .addCase(blockAsyncUser.rejected, (state, { error }) => {
                state.unblockUser = {
                    ...state.unblockUser,
                    loading: false,
                    error: error.message
                };
            })

            .addCase(unblockAsyncUser.pending, (state) => {
                state.unblockUser = {
                    loading: true,
                    success: false
                };
            })
            .addCase(unblockAsyncUser.fulfilled, (state, { payload }) => {
                const users = state.users.users;

                state.users = {
                    ...state.users,
                    users: users.map(user => ({
                        ...user, isBlocked: user._id === payload ? false : user.isBlocked
                    }))
                };
                state.unblockUser = {
                    ...state.unblockUser,
                    loading: false,
                    success: true
                };
            })
            .addCase(unblockAsyncUser.rejected, (state, { error }) => {
                state.unblockUser = {
                    ...state.unblockUser,
                    loading: false,
                    error: error.message
                };
            })

            .addCase(getAsyncUserDetails.pending, (state) => {
                state.userDetails.loading = true;
            })
            .addCase(getAsyncUserDetails.fulfilled, (state, { payload }) => {
                state.userDetails = {
                    ...state.userDetails,
                    loading: false,
                    user: payload
                };
            })
            .addCase(getAsyncUserDetails.rejected, (state, { error }) => {
                state.userDetails = {
                    ...state.userDetails,
                    loading: false,
                    error: error.message
                };
            })

            .addCase(getAsyncUserOrders.pending, (state) => {
                state.userOrders.loading = true;
            })
            .addCase(getAsyncUserOrders.fulfilled, (state, { payload }) => {
                state.userOrders = {
                    ...state.userOrders,
                    loading: false,
                    ...payload
                };
            })
            .addCase(getAsyncUserOrders.rejected, (state, { error }) => {
                state.userOrders = {
                    ...state.userOrders,
                    loading: false,
                    error: error.message
                };
            });
    }
});

export const usersReducer = usersSlice.reducer;
export const { resetUserDetailsAndOrders } = usersSlice.actions;
export const getUsers = (state) => state.users.users;
export const getUserDetails = (state) => state.users.userDetails;
export const getUserOrders = (state) => state.users.userOrders;