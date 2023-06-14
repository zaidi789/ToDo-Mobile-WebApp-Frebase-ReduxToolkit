import {createSlice} from '@reduxjs/toolkit';

const initialState = {};
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,

  reducers: {
    addUser(state, action) {
      // console.log('------reducer---', action.payload);
      const res = action.payload;
      const result = {...state, ...res};

      // initialState={}
      // console.log('------------redux', result);
      // let data = action.payload;
      // state(action.payload);
      // const res = {...state, data};
      // state(action.payload);
      // const data = [];
      // data.push(action.payload);
      // // data.flat(4);
      // return state.push(action.payload);
      // const res = [...state, action.payload];
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
