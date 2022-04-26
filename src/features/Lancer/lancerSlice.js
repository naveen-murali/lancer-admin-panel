import { createSlice } from '@reduxjs/toolkit';
import { getAsyncLancer, updateAsyncLancer } from './lancerAcion';

const initialState = {
    lancer: {
        loading: false,
        commission: 0,
        referralAmount: 0,
        wallet: 0,
        error: "",
        updateSuccess: false
    }
};

const lancerSlice = createSlice({
    name: 'lancer',
    initialState,
    reducers: {
        setLancer: (state, { payload }) => {
            state.lancer = {
                ...state.lancer,
                ...payload,
                updateSuccess: true
            };
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncLancer.pending, (state) => {
                state.lancer.loading = true;
            })
            .addCase(getAsyncLancer.fulfilled, (state, { payload }) => {
                state.lancer = {
                    ...state.lancer,
                    ...payload,
                    loading: false
                };
            })
            .addCase(getAsyncLancer.rejected, (state, { error }) => {
                state.lancer.error = error.message;
            })
            .addCase(updateAsyncLancer.pending, (state) => {
                state.lancer = {
                    ...state.lancer,
                    updateSuccess: false
                };
            })
            .addCase(updateAsyncLancer.fulfilled, (state) => {
                state.lancer = {
                    ...state.lancer,
                    updateSuccess: true
                };
            });
    }
});

export const lancerReducer = lancerSlice.reducer;
export const { setLancer } = lancerSlice.actions;
export const getLancer = (state) => state.lancer.lancer;