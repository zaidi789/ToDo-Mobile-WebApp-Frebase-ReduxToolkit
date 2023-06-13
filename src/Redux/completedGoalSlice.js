// import {createSlice} from '@reduxjs/toolkit';

// const completedGoalSlice = createSlice({
//   name: 'completeGoals',
//   initialState: [],
//   reducers: {
//     addCompletedGoals(state, action) {
//       state.push(action.payload);
//     },
//     removeCompletedGoals(state, action) {
//       const index = action.payload;
//       // return state.filter(item => item.key !== action.payload);
//       state.splice(index, 1);
//     },
//     fetchcompletedGoals(state, action) {
//       const result = action.payload.filter(obj => obj.isCompleted === true);
//       console.log(result);
//       // const res = [...state, ...action.payload];
//       return result;
//     },
//   },
// });

// export const {addCompletedGoals, removeCompletedGoals, fetchcompletedGoals} =
//   completedGoalSlice.actions;
// export default completedGoalSlice.reducer;
