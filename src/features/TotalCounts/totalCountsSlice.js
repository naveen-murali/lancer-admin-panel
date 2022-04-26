import { createSlice } from "@reduxjs/toolkit";
import { getAsyncCounts } from './totalCountAction';

const initialState = {
    totalCount: {
        loading: true,
        totalUsers: 0,
        totalOrders: 0,
        totalService: 0,
        totalChat: 0,
        error: ""
    }
};

const totalCountSlice = createSlice({
    name: "totalCount",
    initialState,
    reducers: {
        setTotalCount: (state, { payload }) => ({
            ...state,
            totalCount: {
                ...state.totalCount,
                ...payload
            }
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncCounts.pending, (state) => {
                state.totalCount.loading = true;
            })
            .addCase(getAsyncCounts.fulfilled, (state, { payload }) => {
                state.totalCount = {
                    ...state.counts,
                    loading: false,
                    ...payload
                };
            })
            .addCase(getAsyncCounts.rejected, (state, { error }) => {
                state.totalCount = {
                    ...state.counts,
                    loading: false,
                    error: error.message
                };
            });
    }
});

export const totalCountReducer = totalCountSlice.reducer;
export const { setTotalCount } = totalCountSlice.actions;
export const getTotalCount = (state) => state.totalCount.totalCount;