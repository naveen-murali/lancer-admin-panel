import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAsyncMonthlyBarChartData, getAsyncWeeklyBarChartData } from './barChartAction';

const initialState = {
    barChart: {
        data: null,
    }
};

const barChartSlice = createSlice({
    name: "barChart",
    initialState,
    reducers: {
        resetBarChart: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(
                    getAsyncMonthlyBarChartData.fulfilled,
                    getAsyncWeeklyBarChartData.fulfilled,
                ), (state, { payload }) => {
                    state.barChart.data = payload;
                });
    }
});

export const barChartSliceReducer = barChartSlice.reducer;
export const getBarChartSlice = (state) => state.barChart.barChart.data;
export const { resetBarChart } = barChartSlice.actions;