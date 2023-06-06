import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'toDos',
  initialState: [],
  reducers: {
    addGoal(state, action) {
      state.push(action.payload);
    },
    removeGoal(state, action) {
      const index = state.findIndex(obj => obj.key == action.payload);
      state.splice(index, 1);
    },
    updateTodo(state, action) {
      console.log(action.payload);
      const index = state.findIndex(obj => obj.key == action.payload.key);
      console.log(index);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          text: action.payload.text,
        };
      }
    },
  },
});

export const {addGoal, removeGoal, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;
