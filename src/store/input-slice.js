import { createSlice } from '@reduxjs/toolkit';

const inputSlice = createSlice({
    name: 'input',
    initialState: {
        entries: [],
        balance: 0,
    },
    reducers: {
        addCashIn(state, action){
            const newEntry = action.payload;
            state.entries.push({id:Math.random(), type:"CashIn", date:newEntry.date, time:newEntry.time, amount: newEntry.amount, comments: newEntry.comments, category: newEntry.category, bal:state.balance+newEntry.amount})
            state.balance += newEntry.amount;
        },
        addCashOut(state, action){
            const newEntry = action.payload;
            state.entries.push({id:Math.random(), type:"CashOut", date:newEntry.date, time:newEntry.time, amount: newEntry.amount, comments: newEntry.comments, category: newEntry.category, bal:state.balance-newEntry.amount})
            state.balance -= newEntry.amount;
        },

    }
});

export const inputActions = inputSlice.actions;

export default inputSlice;