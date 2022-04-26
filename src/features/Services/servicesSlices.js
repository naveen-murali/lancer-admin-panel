import { createSlice } from "@reduxjs/toolkit";
import { getAsyncServices, getAsyncServiceDetails, getAsyncServiceReviews, getAsyncBlockService, getAsyncUnblockService } from './servicesAction';

const initialState = {
    services: {
        loading: false,
        services: [],
        error: ""
    },
    serviceDetails: {
        loading: false,
        service: null,
        error: ""
    },
    serviceReviews: {
        loading: false,
        reviews: [],
        error: ""
    },
};

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        removeServiceDetails: (state) =>
        ({
            ...state,
            serviceDetails: initialState.serviceDetails,
            serviceReviews: initialState.serviceReviews
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncServices.pending, (state, _) => {
                state.services = {
                    ...state.services,
                    loading: true
                };
            })
            .addCase(getAsyncServices.fulfilled, (state, { payload }) => {
                state.services = {
                    ...state.services,
                    loading: false,
                    ...payload
                };
            })
            .addCase(getAsyncServices.rejected, (state, { error }) => {
                state.services = {
                    ...state.services,
                    loading: false,
                    error: error.message
                };
            })
            .addCase(getAsyncServiceDetails.pending, (state, _) => {
                state.serviceDetails = {
                    ...state.serviceDetails,
                    loading: true
                };
            })
            .addCase(getAsyncServiceDetails.fulfilled, (state, { payload }) => {
                state.serviceDetails = {
                    ...state.serviceDetails,
                    loading: false,
                    service: payload
                };
            })
            .addCase(getAsyncServiceDetails.rejected, (state, { error }) => {
                state.serviceDetails = {
                    ...state.serviceDetails,
                    loading: false,
                    error: error.message
                };
            })
            .addCase(getAsyncServiceReviews.pending, (state, _) => {
                state.serviceReviews = {
                    ...state.serviceReviews,
                    loading: true
                };
            })
            .addCase(getAsyncServiceReviews.fulfilled, (state, { payload }) => {
                state.serviceReviews = {
                    ...state.serviceReviews,
                    loading: false,
                    reviews: payload
                };
            })
            .addCase(getAsyncServiceReviews.rejected, (state, { error }) => {
                state.serviceReviews = {
                    ...state.serviceReviews,
                    loading: false,
                    error: error.message
                };
            })
            .addCase(getAsyncBlockService.fulfilled, (state, { payload }) => {
                const services = state.services.services;
                state.services.services = services.map(service => {
                    if (service._id === payload)
                        service.isBlocked = true;

                    return service;
                });
            })
            .addCase(getAsyncUnblockService.fulfilled, (state, { payload }) => {
                const services = state.services.services;
                state.services.services = services.map(service => {
                    if (service._id === payload)
                        service.isBlocked = false;

                    return service;
                });
            });
    }
});

export const servicesReducers = servicesSlice.reducer;
export const { removeServiceDetails } = servicesSlice.actions;
export const getServices = (state) => state.services.services;
export const getServiceDetails = (state) => state.services.serviceDetails;
export const getServiceReviews = (state) => state.services.serviceReviews;