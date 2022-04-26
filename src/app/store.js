import { configureStore } from '@reduxjs/toolkit';
import { adminReducer } from '../features/Admin/adminSlice';
import { barChartSliceReducer } from '../features/BarChart/barChartSlice';
import { categoriesReducers } from '../features/Category/categorySlice';
import { doughnutChartReducer } from '../features/DoughnutChart/doughnutChartSlice';
import { lancerReducer } from '../features/Lancer/lancerSlice';
import { loadingReducer } from '../features/Loading/loadingSlice';
import { mainAlertReducer } from '../features/MainAlert/mainAlertSlice';
import { ordersReducers } from '../features/Orders/ordersSlice';
import { servicesReducers } from '../features/Services/servicesSlices';
import { sideNavReducers } from '../features/SideNav/sideNav';
import { totalCountReducer } from '../features/TotalCounts/totalCountsSlice';
import { transactionsReducers } from '../features/Transaction/transactionSlice';
import { usersReducer } from '../features/Users/usersSlice';

export const store = configureStore({
    reducer: {
        mainAlert: mainAlertReducer,
        loading: loadingReducer,
        sideNav: sideNavReducers,
        admin: adminReducer,
        lancer: lancerReducer,
        users: usersReducer,
        categories: categoriesReducers,
        services: servicesReducers,
        transactions: transactionsReducers,
        orders: ordersReducers,
        totalCount: totalCountReducer,
        doughnutChart: doughnutChartReducer,
        barChart: barChartSliceReducer,
    },
});
