import { createSlice } from "@reduxjs/toolkit";
import { getAsyncDoughnutChartData } from './doughnutChartAction';

const initialState = {
    doughnutChart: {
        data: {},
    }
};


const doughnutChartSlice = createSlice({
    name: "doughnutChart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncDoughnutChartData.fulfilled, (state, { payload }) => {
                state.doughnutChart.data = payload;
            });
    }
});

export const doughnutChartReducer = doughnutChartSlice.reducer;
export const getDoughnutChart = (state) => state.doughnutChart.doughnutChart.data;