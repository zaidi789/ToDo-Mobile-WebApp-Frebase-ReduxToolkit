import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'toDos',
  initialState: [],
  reducers: {
    addGoal(state, action) {
      state.push(action.payload);
    },
    removeGoal(state, action) {
      console.log(action.payload);
      const index = action.payload;
      state.splice(index, 1);
    },
    updateTodo(state, action) {
      console.log(action.payload);
      const index = state.findIndex(obj => obj.id == action.payload.id);
      // console.log(index);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          text: action.payload.text,
        };
      }
    },
    fetchToDos(state, action) {
      // console.log(action.payload);
      const res = [...state, ...action.payload];
      return res;
      // state.push(action.payload);
    },
  },
});

export const {addGoal, removeGoal, updateTodo, fetchToDos} = todoSlice.actions;
export default todoSlice.reducer;
