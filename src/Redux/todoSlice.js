import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'toDos',
  initialState: [],
  reducers: {
    addGoal(state, action) {
      state.push(action.payload);
    },
    removeGoal(state, action) {
      const index = action.payload;
      state.splice(index, 1);
    },
    updateTodo(state, action) {
      const index = state.findIndex(obj => obj.id == action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          text: action.payload.text,
          isCompleted: action.payload.isCompleted,
        };
      }
    },
    fetchToDos(state, action) {
      const res = [...state, ...action.payload];
      return res;
    },
  },
});

export const {addGoal, removeGoal, updateTodo, fetchToDos} = todoSlice.actions;
export default todoSlice.reducer;
