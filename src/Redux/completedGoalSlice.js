import {createSlice} from '@reduxjs/toolkit';

const completedGoalSlice = createSlice({
  name: 'completeGoals',
  initialState: [],
  reducers: {
    addCompletedGoals(state, action) {
      state.push(action.payload);
    },
    removeCompletedGoals(state, action) {
      return state.filter(item => item.key !== action.payload);
    },
  },
});

export const {addCompletedGoals, removeCompletedGoals} =
  completedGoalSlice.actions;
export default completedGoalSlice.reducer;
