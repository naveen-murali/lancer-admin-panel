import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hide: false,
    width: 0,
    small: false,
};

const sideNavSlice = createSlice({
    name: "sideNav",
    initialState,
    reducers: {
        toggleNav: (state) => ({ ...state, hide: !state.hide }),
        setSideNaveWidth: (state, { payload }) => ({ ...state, width: payload }),
        hideSideNav: (state) => ({ ...state, hide: true }),
        showSideNav: (state) => ({ ...state, hide: false }),
        setSmall: (state) => ({ ...state, small: true, hide: true }),
        clearSmall: (state) => ({ ...state, small: false }),
    }
});


export const {
    toggleNav,
    setSideNaveWidth,
    hideSideNav,
    showSideNav,
    setSmall,
    clearSmall,
} = sideNavSlice.actions;
export const sideNavReducers = sideNavSlice.reducer;
export const getSideNav = (state) => state.sideNav;
