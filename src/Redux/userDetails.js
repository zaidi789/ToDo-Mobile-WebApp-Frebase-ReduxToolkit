import {createSlice} from '@reduxjs/toolkit';

const initialState = {};
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,

  reducers: {
    addUser(state, action) {
      const res = action.payload;
      const result = {...state, ...res};
      return result;
    },
    removeUser(state, action) {
      const res = action.payload;
      const result = {res};
      return result;
    },
  },
});

export const {addUser, removeUser} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
