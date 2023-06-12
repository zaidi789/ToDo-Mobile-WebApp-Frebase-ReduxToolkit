import {createSlice} from '@reduxjs/toolkit';

const completedGoalSlice = createSlice({
  name: 'completeGoals',
  initialState: [],
  reducers: {
    addCompletedGoals(state, action) {
      state.push(action.payload);
    },
    removeCompletedGoals(state, action) {
      const index = action.payload;
      // return state.filter(item => item.key !== action.payload);
      state.splice(index, 1);
    },
  },
});

export const {addCompletedGoals, removeCompletedGoals} =
  completedGoalSlice.actions;
export default completedGoalSlice.reducer;
