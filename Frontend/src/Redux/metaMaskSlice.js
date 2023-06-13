import { createSlice } from '@reduxjs/toolkit';

const metaMaskSlice = createSlice({
  name: 'metaMask',
  initialState: {
    account: null,
  },
  reducers: {
    setAccount(state, action) {
      state.account = action.payload;
    },
  },
});

export const { setAccount } = metaMaskSlice.actions;

export default metaMaskSlice.reducer;