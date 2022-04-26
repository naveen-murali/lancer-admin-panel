import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { approveRefundAsyncTransaction, approveWithdrawAsyncTransaction, getAsyncTransactions, rejectAsyncTransaction } from './transactionAction';

const initialState = {
    transactions: {
        loading: false,
        transactions: [],
        error: ''
    }
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        resetTransaction: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncTransactions.pending, (state) => {
                const transactions = state.transactions;
                state.transactions = { ...transactions, loading: true };
            })
            .addCase(getAsyncTransactions.fulfilled, (state, { payload }) => {
                const transactions = state.transactions;
                state.transactions = {
                    ...transactions,
                    loading: false,
                    ...payload
                };
            })
            .addCase(getAsyncTransactions.rejected, (state, { error }) => {
                const transactions = state.transactions;
                state.transactions = {
                    ...transactions,
                    loading: false,
                    error: error.message
                };
            })
            .addCase(rejectAsyncTransaction.fulfilled, (state, { payload }) => {
                const transactions = state.transactions.transactions;

                state.transactions.transactions = transactions.map(transaction =>
                    transaction._id === payload._id ? payload : transaction);
            })
            .addMatcher(
                isAnyOf(
                    approveWithdrawAsyncTransaction.fulfilled,
                    approveRefundAsyncTransaction.fulfilled
                ),
                (state, { payload }) => {
                    const transactions = state.transactions.transactions;

                    state.transactions.transactions = transactions
                        .map(transaction => transaction._id === payload._id ? payload : transaction);
                });
    }
});

export const transactionsReducers = transactionsSlice.reducer;
export const { resetTransaction } = transactionsSlice.actions;
export const getTransactions = (state) => state.transactions.transactions;
