import { configureStore } from '@reduxjs/toolkit';
import metaMaskReducer from './metaMaskSlice';

const store = configureStore({
  reducer: {
    metaMask: metaMaskReducer,
  },
});

export default store;